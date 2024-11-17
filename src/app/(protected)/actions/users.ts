"use server";
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

export async function updateUserSettings(id: string, settings: object) {
  const user = await prisma.user.update({
    where: { id },
    data: { settings: JSON.stringify(settings) },
  });
  return user;
}

export async function getUserSettings(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user?.settings ? JSON.parse(user.settings as string) : null;
}

