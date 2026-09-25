import type { AccessType, Offer, Work } from "@/data/types";

export type CheckoutRequest = {
  workSlug: string;
  offerId: string;
};

export type GatewayResult =
  | { status: "ready"; redirectUrl: string }
  | { status: "unconfigured" };

export function isPriceReady(work: Work, offer: Offer) {
  return (
    work.status === "published" &&
    work.pricingModel === "paid" &&
    offer.price.amount !== null
  );
}

export function accessLabel(type: AccessType) {
  if (type === "DOWNLOAD") return { en: "Download", hi: "डाउनलोड" };
  if (type === "ONLINE_AND_DOWNLOAD") {
    return { en: "Online and download", hi: "ऑनलाइन और डाउनलोड" };
  }
  return { en: "Online access", hi: "ऑनलाइन पहुँच" };
}

export async function startCheckout(
  _request: CheckoutRequest,
): Promise<GatewayResult> {
  return { status: "unconfigured" };
}
