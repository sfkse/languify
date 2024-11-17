import Breadcrumbs from "@/app/(protected)/components/common/Breadcrumbs";
import PageContentWrapper from "@/app/(protected)/components/common/PageContentWrapper";
import SettingsOptions from "@/app/(protected)/components/common/SettingsOptions";
import { Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/(protected)/components/ui/popover";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "../../actions/users";

const breadcrumbs = [
  { label: "Home", href: "/", isActive: false },
  { label: "Settings", href: "/settings", isActive: true },
];

export default async function SettingsPage() {
  const { userId } = await auth();
  const user = await getUserByClerkId(userId!);
  console.log(user);
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
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
                  Your settings will be used for all your documents.
                </PopoverContent>
              </Popover>
            </p>

            <SettingsOptions />
          </div>
        </div>
      </PageContentWrapper>
    </>
  );
}

