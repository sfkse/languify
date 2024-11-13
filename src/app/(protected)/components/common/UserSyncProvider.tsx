"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import LoadingState from "./LoadingState";

type UserSyncContextType = {
  isUserSynced: boolean;
};

const UserSyncContext = createContext<UserSyncContextType | undefined>(
  undefined
);

export function UserSyncProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded, userId } = useAuth();
  const [isUserSynced, setIsUserSynced] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserSync = async () => {
      if (!isLoaded || !userId) {
        setIsChecking(false);
        return;
      }

      try {
        // Poll for user creation in database
        const checkUser = async () => {
          const response = await fetch(`/api/users/${userId}`);
          return response.ok;
        };

        const pollUser = async () => {
          let attempts = 0;
          const maxAttempts = 10;

          while (attempts < maxAttempts) {
            const exists = await checkUser();
            if (exists) {
              setIsUserSynced(true);
              setIsChecking(false);
              return;
            }
            attempts++;
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }

          // If user is not created after max attempts, redirect to error page
          console.log("User not created after max attempts");
        };

        await pollUser();
      } catch (error) {
        console.error("Error checking user sync:", error);
        setIsChecking(false);
      }
    };

    checkUserSync();
  }, [isLoaded, userId, router]);

  if (isChecking) {
    return <LoadingState />;
  }

  return (
    <UserSyncContext.Provider value={{ isUserSynced }}>
      {children}
    </UserSyncContext.Provider>
  );
}

export const useUserSync = () => {
  const context = useContext(UserSyncContext);
  if (context === undefined) {
    throw new Error("useUserSync must be used within a UserSyncProvider");
  }
  return context;
};

