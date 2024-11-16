"use server";

import { NextResponse } from "next/server";
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
  try {
    const document = await prisma.document.findMany({
      where: {
        id,
      },
    });
    return NextResponse.json(document);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch document" },
      { status: 500 }
    );
  }
}

export async function getDocuments() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await getUserByClerkId(userId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  try {
    let documents = await prisma.document.findMany({
      where: {
        userId: user.id,
      },
    });
    documents = documents.map((document) => ({
      ...document,
      createdAt: document.createdAt.toLocaleDateString() as unknown as Date,
    }));

    return documents;
  } catch (error) {
    console.error(error);
    return [];
  }
}

