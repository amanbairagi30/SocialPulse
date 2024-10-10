"use server";
import prisma from "./prisma";
import { authOptions } from "./auth";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { Session } from "next-auth";


type SessionUser = {
  id: string;
};


async function getUserIdFromSession(): Promise<string | null> {
  const session = await getServerSession(authOptions) as Session & { user: SessionUser };
  return session?.user?.id || null;
}

export async function getAllSocials() {
  const userId = await getUserIdFromSession();
  if (!userId) return [];

  return await prisma.social.findMany({
    where: { userId },
  });
}

export async function createSocial(data: {
  username: string;
  provider: string;
  followers: number;
  posts: number;
}) {
  const userId = await getUserIdFromSession();
  if (!userId) throw new Error("User not authenticated");

  return await prisma.social.create({
    data: {
      ...data,
      userId,
    },
  });
}

export async function getSocial(userId: string) {
  return await prisma.social.findFirst({
    where: { userId },
  });
}

export async function updateYoutubeChannelId(formData: FormData) {
  const userId = await getUserIdFromSession();
  if (!userId) throw new Error("User not authenticated");

  const channelId = formData.get("channelId");
  if (typeof channelId !== "string") throw new Error("Invalid channel ID");

  await prisma.social.upsert({
    where: {
      userId_provider: {
        userId,
        provider: "youtube",
      },
    },
    update: { username: channelId },
    create: {
      userId,
      provider: "youtube",
      username: channelId,
      followers: 0,
      posts: 0,
    },
  });

  revalidatePath("/dashboard/youtube");
}
