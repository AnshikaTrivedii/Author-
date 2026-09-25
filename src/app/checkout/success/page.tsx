import { pageMetadata } from "@/lib/seo";
import { CheckoutSuccess } from "@/components/platform/CheckoutSuccess";

export const metadata = pageMetadata(
  "Confirmation",
  "Payment confirmation and library access.",
  "/checkout/success",
  false,
);

export default function Page() {
  return <CheckoutSuccess />;
}
