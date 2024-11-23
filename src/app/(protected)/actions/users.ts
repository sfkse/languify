"use server";
import { prisma } from "../lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { UserSettings } from "../types/user";
import { revalidatePath } from "next/cache";
import { UserWithoutSettings } from "../types/user";
import { logger } from "../lib/logging/winston";

export async function createUser(user: UserWithoutSettings) {
  const newUser = await prisma.user.create({
    data: {
      ...user,
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
  const user = await getAuthUser();
  await prisma.user.update({
    where: { id: user.id },
    data: { settings: JSON.stringify(settings) },
  });
  revalidatePath("/settings");
}

export async function getUserSettings() {
  const user = await getAuthUser();
  const userSettings = await prisma.user.findUnique({
    where: { id: user.id },
  });
  return userSettings?.settings
    ? JSON.parse(userSettings.settings as string)
    : null;
}

export const getAuthUser = async () => {
  const { userId } = await auth();
  if (!userId) {
    logger.error(`Unauthorized for userId: ${userId}`);
    throw new Error("Unauthorized");
  }
  const user = await getUserByClerkId(userId);
  if (!user) {
    logger.error(`User not found for userId: ${userId}`);
    throw new Error("User not found");
  }
  return user;
};

