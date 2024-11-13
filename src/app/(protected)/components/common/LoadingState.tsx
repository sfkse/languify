import { Loader2 } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
      <p className="mt-4 text-sm text-muted-foreground">
        Setting up your account...
      </p>
    </div>
  );
}
