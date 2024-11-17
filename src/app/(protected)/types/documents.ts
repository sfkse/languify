export interface Document {
  id: string;
  title: string;
  url: string;
  userId: string;
  createdAt: Date;
}

export interface DocumentSettings {
  level: string;
  language: { sourceLanguage: string };
}

