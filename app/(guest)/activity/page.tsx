import ActivityPage from "@/components/page/activity";
import { Suspense } from "react";

export default function Activity() {
  return (
    <main>
      <Suspense>
        <ActivityPage />
      </Suspense>
    </main>
  );
}