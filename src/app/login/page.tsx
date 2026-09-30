import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { LoginPage } from "@/components/platform/LoginPage";

export const metadata = pageMetadata(
  "Sign in",
  "Sign in to your library, or open the admin desk.",
  "/login",
  false,
);

export default function Page() {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
}
