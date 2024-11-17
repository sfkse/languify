"use client";

import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "@/app/(protected)/components/ui/select";
import { Button } from "@/app/(protected)/components/ui/button";
import LevelSlider from "@/app/(protected)/components/common/LevelSlider";
import { SourceLanguage, UserSettings } from "@/app/(protected)/types/user";
import { useState } from "react";
import { toast } from "@/app/(protected)/hooks/use-toast";
import { updateUserSettings } from "@/app/(protected)/actions/users";

const defaultSettings: UserSettings = {
  language: {
    sourceLanguage: "en",
    // targetLanguage: "swedish",
  },
  level: "A1",
};

const SettingsOptions = ({
  settings: initialSettings,
  userId,
}: {
  settings: UserSettings | null;
  userId: string;
}) => {
  const [settings, setSettings] = useState<UserSettings>(
    initialSettings || defaultSettings
  );
  const [isLoading, setIsLoading] = useState(false);
  console.log(typeof settings);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(userId);
    try {
      await updateUserSettings(userId, settings);
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating user settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <LevelSlider
        value={settings.level}
        onChange={(level) => setSettings({ ...settings, level })}
      />
      <div className="flex flex-row justify-between items-center gap-10 mt-10">
        <span className="w-60">Source language</span>
        <Select
          value={settings.language.sourceLanguage}
          onValueChange={(value) =>
            setSettings({
              ...settings,
              language: {
                ...settings.language,
                sourceLanguage: value as SourceLanguage,
              },
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="swedish">Swedish</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* <div className="flex flex-row justify-between items-center gap-10 mt-5">
        <span className="w-40">Target language</span>
        <Select
          value={settings.language.targetLanguage}
          onValueChange={(value) =>
            setSettings({
              ...settings,
              language: {
                ...settings.language,
                targetLanguage: value as TargetLanguage,
              },
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="swedish">Swedish</SelectItem>
          </SelectContent>
        </Select>
      </div> */}
      <Button type="submit" className="w-full mt-10" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};

export default SettingsOptions;

