"use server";
import { User } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { UserSettings } from "../types/user";
import { revalidatePath } from "next/cache";

export async function createUser(
  user: Omit<User, "settings"> & { settings?: any }
) {
  const newUser = await prisma.user.create({
    data: {
      ...user,
      settings: user.settings ? JSON.stringify(user.settings) : undefined,
    },
  });
  return newUser;
}

export async function getUserByClerkId(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
  });
  return user;
}

export async function updateUserSettings(settings: UserSettings) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  const user = await getUserByClerkId(userId);
  if (!user) {
    throw new Error("User not found");
  }
  await prisma.user.update({
    where: { id: user.id },
    data: { settings: JSON.stringify(settings) },
  });
  revalidatePath("/settings");
}

export async function getUserSettings(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user?.settings ? JSON.parse(user.settings as string) : null;
}

