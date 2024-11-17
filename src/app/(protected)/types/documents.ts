export interface IDocument {
  [key: string]: string | number | Date;
  id: string;
  title: string;
  url: string;
  userId: string;
  createdAt: Date;
}

export interface IDocumentSettings {
  level: string;
  language: { sourceLanguage: string };
}

