"use server";
import prisma from "./prisma";
import { authOptions } from "./auth";
import { getServerSession } from "next-auth";

export async function getAllSocials() {
  const session = await getServerSession(authOptions);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const userId = session?.user?.id;
  return await prisma.social.create({
    data: {
      ...data,
      userId,
    },
  });
}
