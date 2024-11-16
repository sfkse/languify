"use server";
import { prisma } from "../lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "./users";

export async function createDocument(
  title: string,
  url: string,
  userId: string
) {
  const response = await prisma.document.create({
    data: {
      id: uuidv4(),
      title,
      url,
      userId,
    },
  });

  return response;
}

export async function getDocument(id: string) {
  const document = await prisma.document.findMany({
    where: {
      id,
    },
  });
  return document[0];
}

export async function getDocuments() {
  const { userId } = await auth();
  console.log("----userId", userId);
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await getUserByClerkId(userId);

  if (!user) {
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

