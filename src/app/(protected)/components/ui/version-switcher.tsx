"use client";
import { ChevronsUpDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/(protected)/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/(protected)/components/ui/sidebar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

export function VersionSwitcher({
  title,
  subtitle,
  type,
  menuItems,
}: {
  title: string;
  subtitle?: string;
  type: "logo" | "menu";
  menuItems?: {
    title: string;
    onClick: () => void;
  }[];
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {type === "logo" && <Globe className="size-6" />}
                {type === "menu" && (
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                )}
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="truncate font-semibold">{title}</span>
                <span className="truncate text-xs">{subtitle}</span>
              </div>
              {type === "menu" && <ChevronsUpDown className="ml-auto" />}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          {type === "menu" && menuItems && (
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width]"
              align="start"
            >
              {/* TODO: Fix whole component */}
              {menuItems.map((item) => (
                <DropdownMenuItem key={item.title} onClick={item.onClick}>
                  {item.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

