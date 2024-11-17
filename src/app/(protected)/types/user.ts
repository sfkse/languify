export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  clerkId: string;
}

export type SourceLanguage = "en" | "fr" | "swedish";
// export type TargetLanguage = "en" | "fr" | "swedish";
export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

interface LanguageSettings {
  sourceLanguage: SourceLanguage;
  // targetLanguage: TargetLanguage;
}

export interface UserSettings {
  language: LanguageSettings;
  level: Level;
}

// For database storage
export type UserSettingsJson = string;

// Helper to parse settings from JSON
export function parseUserSettings(json: string | null): UserSettings | null {
  if (!json) return null;
  try {
    return JSON.parse(json) as UserSettings;
  } catch {
    return null;
  }
}

// Helper to stringify settings to JSON
export function stringifyUserSettings(
  settings: UserSettings
): UserSettingsJson {
  return JSON.stringify(settings);
}

export type UserWithoutSettings = Omit<User, "settings">;

