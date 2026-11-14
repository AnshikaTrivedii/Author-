import { pageMetadata } from "@/lib/seo";
import { AdminPage } from "@/components/platform/AdminPage";
import { LoginPage } from "@/components/platform/LoginPage";
import { readSession } from "@/lib/session";

export const metadata = pageMetadata(
  "Admin desk",
  "Manage works, pricing, uploads, buyers and orders for Echoes of Memories.",
  "/admin",
  false,
);

export default async function Page() {
  const session = await readSession();
  if (!session || session.role !== "admin") {
    return <LoginPage role="admin" />;
  }
  return <AdminPage email={session.email} />;
}
