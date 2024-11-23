"use server";
import { prisma } from "../lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { getAuthUser, getUserSettings } from "./users";
import { IDocumentSettings } from "../types/documents";
import { revalidatePath } from "next/cache";

export async function createDocument(title: string, url: string) {
  const user = await getAuthUser();
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
  const user = await getAuthUser();
  const document = await prisma.document.findUnique({
    where: {
      id,
      userId: user.id,
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
  const user = await getAuthUser();
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
  // Check if document settings exist, if not return user settings
  let settings = await getSingleDocumentSettings(documentId);
  if (!settings) {
    settings = await getUserSettings();
  }
  revalidatePath(`/documents/${documentId}`);
  return settings;
}

async function getSingleDocumentSettings(id: string) {
  const user = await getAuthUser();
  const document = await prisma.document.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });
  return document?.settings ? JSON.parse(document.settings as string) : null;
}

export async function updateDocumentSettings(
  settings: IDocumentSettings,
  documentId: string
) {
  const user = await getAuthUser();
  await prisma.document.update({
    where: {
      id: documentId,
      userId: user.id,
    },
    data: { settings: JSON.stringify(settings) },
  });
  revalidatePath(`/documents/${documentId}`);
}

