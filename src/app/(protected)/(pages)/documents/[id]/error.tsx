"use client";
import { Button } from "@/app/(protected)/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-lg">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}

