"use server";

import OpenAI from "openai";
import { prisma } from "../lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { createPrompt } from "../lib/prompt";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export async function createGlossary(
  text: string,
  documentId: string,
  page: number
) {
  console.log("text", text);
  console.log("documentId", documentId);
  console.log("page", page);
  try {
    const glossary = await prisma.glossary.create({
      data: {
        id: uuidv4(),
        text,
        documentId,
        page,
      },
    });
    return glossary;
  } catch (error) {
    console.error("Error adding to glossary", error);
    throw error;
  }
}

export async function getDocumentGlossaries(documentId: string) {
  let glossaries = await prisma.glossary.findMany({
    where: { documentId },
    orderBy: { createdAt: "desc" },
  });

  glossaries = glossaries.map((glossary) => ({
    ...glossary,
    createdAt: glossary.createdAt.toLocaleDateString() as unknown as Date,
  }));
  return glossaries;
}

export async function rephraseText(
  text: string,
  level: string,
  targetLanguage: string
) {
  console.log("api key", process.env.ANTHROPIC_API_KEY);
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  });
  console.log("language", targetLanguage, "level", level);

  const completion = await openai.chat.completions.create({
    model: "anthropic/claude-3.5-sonnet:beta",
    messages: createPrompt(
      text,
      level,
      targetLanguage
    ) as ChatCompletionMessageParam[],
  });

  console.log("completion", completion);
  return completion.choices[0].message.content;
}

