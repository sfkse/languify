import { User } from "@prisma/client";
import { prisma } from "../lib/prisma";

export async function createUser(user: User) {
  const newUser = await prisma.user.create({
    data: user,
  });
  return newUser;
}

export async function getUserByClerkId(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
  });
  return user;
}

export async function updateUserSettings(id: string, settings: any) {
  const user = await prisma.user.update({
    where: { id },
    data: { settings },
  });
  return user;
}

