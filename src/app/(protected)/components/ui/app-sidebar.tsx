"use client";
import Link from "next/link";
import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/(protected)/components/ui/sidebar";
import { VersionSwitcher } from "@/app/(protected)/components/ui/version-switcher";
import { useClerk } from "@clerk/nextjs";

export function AppSidebar() {
  const { signOut, user } = useClerk();
  const profileTitle =
    user && user.firstName && user.lastName
      ? user.firstName + " " + user.lastName
      : "";
  const profileSubtitle =
    user && user.emailAddresses && user.emailAddresses[0]
      ? user.emailAddresses[0].emailAddress
      : "";
  // Menu items.
  const items = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Documents",
      url: "/documents",
    },
    {
      title: "Settings",
      url: "/settings",
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader>
        <VersionSwitcher title="Languify" type="logo" />
      </SidebarHeader>
      <SidebarGroup className="mt-10">
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    {/* <item.icon /> */}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarFooter className="mt-auto pb-4">
        {/* <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu> */}
        <VersionSwitcher
          title={profileTitle}
          subtitle={profileSubtitle}
          type="menu"
          menuItems={[
            {
              title: "Profile",
              onClick: () => console.log("Profile"),
            },
            {
              title: "Sign out",
              onClick: () => signOut(),
            },
          ]}
        />
      </SidebarFooter>
    </Sidebar>
  );
}

