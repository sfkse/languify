import Breadcrumbs from "@/app/(protected)/components/common/Breadcrumbs";
import PageContentWrapper from "@/app/(protected)/components/common/PageContentWrapper";
import SettingsOptions from "@/app/(protected)/components/common/SettingsOptions";
import { Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/(protected)/components/ui/popover";
import { getUserSettings } from "@/app/(protected)/actions/users";
import { UserSettings } from "../../types/user";
import Popup from "../../components/common/Popup";

type SettingsPageProps = {
  searchParams: Promise<{ register: string }>;
};

const breadcrumbs = [
  { label: "Home", href: "/", isActive: false },
  { label: "Settings", href: "/settings", isActive: true },
];

export default async function SettingsPage({
  searchParams,
}: SettingsPageProps) {
  const { register: showRegisterPopup } = await searchParams;
  const settings = (await getUserSettings()) as UserSettings | null;

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Popup
        show={showRegisterPopup === "true"}
        title="Let´s get you started"
        description={
          <p>
            Set your language and level to get started. This will be used for
            all your documents by default.
          </p>
        }
        buttonText="Continue"
        path="/settings"
      />
      <PageContentWrapper>
        <div className="flex flex-col gap-8 max-w-2xl">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-sm text-muted-foreground flex flex-row items-center gap-2">
              Adjust your settings first to get started.
              <Popover>
                <PopoverTrigger asChild>
                  <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                </PopoverTrigger>
                <PopoverContent>
                  Your settings will be used for all your documents if you don´t
                  specify a different settings for a document.
                </PopoverContent>
              </Popover>
            </p>

            <SettingsOptions settings={settings as UserSettings} type="user" />
          </div>
        </div>
      </PageContentWrapper>
    </>
  );
}

