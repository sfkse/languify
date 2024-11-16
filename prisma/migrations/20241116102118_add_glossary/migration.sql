-- CreateTable
CREATE TABLE "Glossary" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Glossary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Glossary" ADD CONSTRAINT "Glossary_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
