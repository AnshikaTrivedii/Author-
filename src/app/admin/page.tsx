import { redirect } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { AdminPage } from "@/components/platform/AdminPage";
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
    redirect("/login?role=admin");
  }
  return <AdminPage email={session.email} />;
}
