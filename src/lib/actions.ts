"use server";
import prisma from "./prisma";
import { authOptions } from "./auth";
import { getServerSession } from "next-auth";

export async function getAllSocials() {
  const session = await getServerSession(authOptions);
  // @ts-expect-error
  const userId = session?.user?.id;

  return await prisma.social.findMany({
    where: {
      userId,
    },
  });
}

export async function createSocial(data: {
  username: string;
  provider: string;
  followers: number;
  posts: number;
}) {
  const session = await getServerSession(authOptions);
  console.error(session);
  // @ts-expect-error
  const userId = session?.user?.id;
  return await prisma.social.create({
    data: {
      ...data,
      userId,
    },
  });
}

export async function getSocial(userId: string) {
  return await prisma.social.findFirst({
    where: {
      userId,
    },
  });
}
