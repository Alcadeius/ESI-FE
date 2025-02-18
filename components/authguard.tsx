"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import LoadingScreen from "@/components/loading-screen";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
      } else {
        setIsPageReady(true);
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !isPageReady) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
