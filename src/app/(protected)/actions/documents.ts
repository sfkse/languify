"use server";
import { prisma } from "../lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId, getUserSettings } from "./users";
import { IDocumentSettings } from "../types/documents";
import { revalidatePath } from "next/cache";
import { logger } from "../lib/logging/logger";

export async function createDocument(title: string, url: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await getUserByClerkId(userId);
  if (!user) {
    throw new Error("User not found");
  }
  const response = await prisma.document.create({
    data: {
      id: uuidv4(),
      title,
      url,
      userId: user.id,
    },
  });

  return response;
}

export async function getDocument(id: string) {
  const document = await prisma.document.findUnique({
    where: {
      id,
    },
  });

  // Create a new object instead of modifying document directly
  return document
    ? {
        ...document,
        settings: JSON.parse(document.settings as string) as IDocumentSettings,
      }
    : null;
}

export async function getDocuments() {
  const { userId } = await auth();
  if (!userId) {
    logger.error("Unauthorized");
    throw new Error("Unauthorized");
  }
  const user = await getUserByClerkId(userId);

  if (!user) {
    logger.error(`User not found for userId: ${userId}`);
    throw new Error("User not found");
  }
  let documents = await prisma.document.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      title: true,
      url: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  documents = documents.map((document) => ({
    ...document,
    createdAt: document.createdAt.toLocaleDateString() as unknown as Date,
  }));

  return documents;
}

export async function getDocumentSettings(documentId: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await getUserByClerkId(userId);
  if (!user) {
    throw new Error("User not found");
  }
  // Check if document settings exist, if not return user settings
  let settings = await getSingleDocumentSettings(documentId);
  if (!settings) {
    settings = await getUserSettings(user.id);
  }
  revalidatePath(`/documents/${documentId}`);
  return settings;
}

async function getSingleDocumentSettings(id: string) {
  const document = await prisma.document.findUnique({
    where: {
      id,
    },
  });
  return document?.settings ? JSON.parse(document.settings as string) : null;
}

export async function updateDocumentSettings(
  settings: IDocumentSettings,
  documentId: string
) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await getUserByClerkId(userId);
  if (!user) {
    throw new Error("User not found");
  }
  await prisma.document.update({
    where: {
      id: documentId,
    },
    data: { settings: JSON.stringify(settings) },
  });
  revalidatePath(`/documents/${documentId}`);
}

