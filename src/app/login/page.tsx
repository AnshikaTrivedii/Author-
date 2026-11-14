import { pageMetadata } from "@/lib/seo";
import { LoginPage } from "@/components/platform/LoginPage";

export const metadata = pageMetadata(
  "Sign in",
  "Sign in to your reader library.",
  "/login",
  false,
);

export default function Page() {
  return <LoginPage role="reader" />;
}
