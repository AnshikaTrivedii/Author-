"use client";

import { useEffect, useMemo, useState } from "react";
import { AdminLaunchPanel } from "@/components/platform/AdminLaunchPanel";
import { PageIntro } from "@/components/ui/PageIntro";
import { SignOutButton } from "@/components/platform/SignOutButton";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { cn } from "@/lib/utils";
import type { Order, PricingModel, Work, WorkStatus } from "@/data/types";

type Upload = {
  workId: string;
  kind: string;
  fileName: string;
  storedAs: string;
  uploadedAt: string;
};

type Stats = {
  worksTotal: number;
  worksPublished: number;
  worksFree: number;
  worksPaid: number;
  ordersPending: number;
  ordersPaid: number;
  buyers: Array<{ userId: string; orders: number }>;
  uploads: number;
};

type Buyer = {
  userId: string;
  paidOrders: number;
  works: string[];
};

type AdminPayload = {
  works: Work[];
  orders: Array<Order & { workTitle?: { en: string; hi: string } }>;
  uploads: Upload[];
  stats: Stats;
  buyers?: Buyer[];
};

const uploadKinds = [
  { id: "hindi", label: "Hindi PDF" },
  { id: "english", label: "English PDF" },
  { id: "audio", label: "Audio" },
  { id: "film", label: "Film" },
  { id: "cover", label: "Cover image" },
] as const;

export function AdminPage({ email }: { email: string }) {
  const { loc, t } = useLanguage();
  const [works, setWorks] = useState<Work[]>([]);
  const [orders, setOrders] = useState<AdminPayload["orders"]>([]);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  const [titleEn, setTitleEn] = useState("");
  const [titleHi, setTitleHi] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [pricingModel, setPricingModel] = useState<PricingModel>("free");
  const [priceAmount, setPriceAmount] = useState("499");
  const [status, setStatus] = useState<WorkStatus>("forthcoming");
  const [uploadKind, setUploadKind] = useState<(typeof uploadKinds)[number]["id"]>("hindi");
  const [editPrice, setEditPrice] = useState("");

  const selected = useMemo(
    () => works.find((work) => work.id === selectedId) ?? works[0] ?? null,
    [works, selectedId],
  );

  async function load() {
    const [worksRes, ordersRes] = await Promise.all([
      fetch("/api/admin/works"),
      fetch("/api/admin/orders"),
    ]);
    if (!worksRes.ok || !ordersRes.ok) {
      setMessage(t("adminLoadFailed"));
      return;
    }
    const worksData = (await worksRes.json()) as AdminPayload;
    const ordersData = (await ordersRes.json()) as {
      orders: AdminPayload["orders"];
      buyers: Buyer[];
      stats: Stats;
    };
    setWorks(worksData.works);
    setUploads(worksData.uploads);
    setOrders(ordersData.orders);
    setBuyers(ordersData.buyers);
    setStats(ordersData.stats);
    if (!selectedId && worksData.works[0]) setSelectedId(worksData.works[0].id);
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selected) return;
    setEditPrice(
      selected.pricingModel === "paid" && selected.offers[0]?.price.amount != null
        ? String(selected.offers[0].price.amount)
        : "",
    );
  }, [selected]);

  async function createWork(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    const response = await fetch("/api/admin/works", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titleEn,
        titleHi: titleHi || titleEn,
        descriptionEn,
        pricingModel,
        priceAmount: pricingModel === "paid" ? Number(priceAmount) || null : 0,
        status,
      }),
    });
    setPending(false);
    if (!response.ok) {
      setMessage(t("adminSaveFailed"));
      return;
    }
    const data = (await response.json()) as { work: Work };
    setTitleEn("");
    setTitleHi("");
    setDescriptionEn("");
    setMessage(t("adminWorkCreated"));
    await load();
    setSelectedId(data.work.id);
  }

  async function patchWork(body: Record<string, unknown>) {
    if (!selected) return;
    setPending(true);
    setMessage("");
    const response = await fetch(`/api/admin/works/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setPending(false);
    if (!response.ok) {
      setMessage(t("adminSaveFailed"));
      return;
    }
    setMessage(t("adminWorkUpdated"));
    await load();
  }

  async function uploadFile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("kind", uploadKind);
    setPending(true);
    setMessage("");
    const response = await fetch(`/api/admin/works/${selected.id}/upload`, {
      method: "POST",
      body: data,
    });
    setPending(false);
    if (!response.ok) {
      setMessage(t("adminUploadFailed"));
      return;
    }
    form.reset();
    setMessage(t("adminUploadOk"));
    await load();
  }

  const selectedUploads = uploads.filter((item) => item.workId === selected?.id);

  return (
    <main id="main" className="bg-ink pb-28">
      <PageIntro
        eyebrow={t("adminAccount")}
        title={t("headingAdmin")}
        kicker={t("adminKicker")}
      />
      <div className="mx-auto flex max-w-[1680px] flex-wrap items-center justify-between gap-6 px-5 pb-10 sm:px-8 lg:px-12">
        <p className="label-meta text-muted">
          {t("signedInAs")} {email}
        </p>
        <SignOutButton />
      </div>

      {message ? (
        <p className="mx-auto mb-8 max-w-[1680px] px-5 text-sm text-gilt sm:px-8 lg:px-12" role="status">
          {message}
        </p>
      ) : null}

      {stats ? (
        <section className="mx-auto grid max-w-[1680px] gap-6 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
          {[
            { label: t("adminStatWorks"), value: stats.worksTotal },
            { label: t("adminStatFree"), value: stats.worksFree },
            { label: t("adminStatPaid"), value: stats.worksPaid },
            { label: t("adminStatPending"), value: stats.ordersPending },
          ].map((item) => (
            <div key={item.label} className="border border-ivory/10 bg-ink-2 px-6 py-8">
              <p className="label-meta text-gilt">{item.label}</p>
              <p className="mt-4 font-serif text-5xl">{item.value}</p>
            </div>
          ))}
        </section>
      ) : null}

      <div className="mx-auto mt-16 grid max-w-[1680px] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <section className="lg:col-span-7">
          <h2 className="font-serif text-4xl">{t("adminAllWorks")}</h2>
          <ul className="mt-8 divide-y divide-ivory/10 border-y border-ivory/10">
            {works.map((work) => {
              const active = work.id === selected?.id;
              return (
                <li key={work.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(work.id)}
                    className={cn(
                      "grid w-full gap-2 py-6 text-left transition-colors lg:grid-cols-12",
                      active ? "text-ivory" : "text-ivory/70 hover:text-ivory",
                    )}
                  >
                    <p className="label-meta text-gilt lg:col-span-2">{work.id}</p>
                    <div className="lg:col-span-7">
                      <p className="font-serif text-2xl">{loc(work.title)}</p>
                      <p className="mt-2 text-sm text-muted">{loc(work.description)}</p>
                    </div>
                    <p className="label-meta lg:col-span-3 lg:text-right">
                      {work.pricingModel.toUpperCase()} · {work.status}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>

          {selected ? (
            <div className="mt-10 border border-ivory/10 bg-ink-2 p-8">
              <p className="label-meta text-gilt">{t("adminManageWork")}</p>
              <h3 className="mt-4 font-serif text-3xl">{loc(selected.title)}</h3>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => patchWork({ pricingModel: "free", priceAmount: 0 })}
                  className={cn(
                    "label-meta min-h-12 border px-5 py-3",
                    selected.pricingModel === "free"
                      ? "border-gilt text-gilt"
                      : "border-ivory/20 text-muted hover:text-ivory",
                  )}
                >
                  {t("badgeFree")}
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() =>
                    patchWork({
                      pricingModel: "paid",
                      priceAmount: Number(editPrice) || null,
                    })
                  }
                  className={cn(
                    "label-meta min-h-12 border px-5 py-3",
                    selected.pricingModel === "paid"
                      ? "border-gilt text-gilt"
                      : "border-ivory/20 text-muted hover:text-ivory",
                  )}
                >
                  {t("badgePaid")}
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => patchWork({ status: "published" })}
                  className="label-meta min-h-12 border border-ivory/20 px-5 py-3 text-muted hover:text-ivory"
                >
                  {t("adminPublish")}
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => patchWork({ status: "forthcoming" })}
                  className="label-meta min-h-12 border border-ivory/20 px-5 py-3 text-muted hover:text-ivory"
                >
                  {t("forthcoming")}
                </button>
              </div>
              <div className="mt-8 flex flex-wrap items-end gap-4">
                <label className="block">
                  <span className="label-meta">{t("price")}</span>
                  <input
                    type="number"
                    min={0}
                    value={editPrice}
                    onChange={(event) => setEditPrice(event.target.value)}
                    className="mt-3 w-40 border border-ivory/15 bg-transparent px-4 py-3 text-ivory outline-none focus:border-gilt"
                  />
                </label>
                <button
                  type="button"
                  disabled={pending || selected.pricingModel !== "paid"}
                  onClick={() =>
                    patchWork({
                      pricingModel: "paid",
                      priceAmount: Number(editPrice) || null,
                    })
                  }
                  className="label-meta min-h-12 border border-gilt bg-gilt px-6 py-3 text-ink disabled:opacity-40"
                >
                  {t("adminSavePrice")}
                </button>
              </div>

              <form onSubmit={uploadFile} className="mt-10 border-t border-ivory/10 pt-8">
                <p className="label-meta text-gilt">{t("adminUpload")}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {uploadKinds.map((kind) => (
                    <button
                      key={kind.id}
                      type="button"
                      onClick={() => setUploadKind(kind.id)}
                      className={cn(
                        "label-meta min-h-10 px-3",
                        uploadKind === kind.id ? "text-gilt" : "text-muted",
                      )}
                    >
                      {kind.label}
                    </button>
                  ))}
                </div>
                <input
                  type="file"
                  name="file"
                  required
                  className="mt-6 block w-full text-sm text-muted file:mr-4 file:border file:border-ivory/20 file:bg-transparent file:px-4 file:py-2 file:text-ivory"
                />
                <button
                  type="submit"
                  disabled={pending}
                  className="label-meta mt-6 min-h-12 border border-gilt px-6 py-3 text-gilt"
                >
                  {t("adminUploadAction")}
                </button>
                {selectedUploads.length ? (
                  <ul className="mt-8 space-y-3 text-sm text-muted">
                    {selectedUploads.map((item) => (
                      <li key={`${item.storedAs}-${item.uploadedAt}`}>
                        {item.kind} · {item.fileName}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </form>
            </div>
          ) : null}
        </section>

        <section className="lg:col-span-5">
          <h2 className="font-serif text-4xl">{t("adminNewWork")}</h2>
          <form
            onSubmit={createWork}
            className="mt-8 border border-ivory/10 bg-ink-2 p-8"
          >
            <label className="block">
              <span className="label-meta">{t("adminTitleEn")}</span>
              <input
                required
                value={titleEn}
                onChange={(event) => setTitleEn(event.target.value)}
                className="mt-3 w-full border border-ivory/15 bg-transparent px-4 py-3 text-ivory outline-none focus:border-gilt"
              />
            </label>
            <label className="mt-6 block">
              <span className="label-meta">{t("adminTitleHi")}</span>
              <input
                value={titleHi}
                onChange={(event) => setTitleHi(event.target.value)}
                className="mt-3 w-full border border-ivory/15 bg-transparent px-4 py-3 text-ivory outline-none focus:border-gilt"
              />
            </label>
            <label className="mt-6 block">
              <span className="label-meta">{t("adminDescription")}</span>
              <textarea
                rows={4}
                value={descriptionEn}
                onChange={(event) => setDescriptionEn(event.target.value)}
                className="mt-3 w-full border border-ivory/15 bg-transparent px-4 py-3 text-ivory outline-none focus:border-gilt"
              />
            </label>
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setPricingModel("free")}
                className={cn(
                  "label-meta min-h-12 border px-5 py-3",
                  pricingModel === "free" ? "border-gilt text-gilt" : "border-ivory/20 text-muted",
                )}
              >
                {t("badgeFree")}
              </button>
              <button
                type="button"
                onClick={() => setPricingModel("paid")}
                className={cn(
                  "label-meta min-h-12 border px-5 py-3",
                  pricingModel === "paid" ? "border-gilt text-gilt" : "border-ivory/20 text-muted",
                )}
              >
                {t("badgePaid")}
              </button>
            </div>
            {pricingModel === "paid" ? (
              <label className="mt-6 block">
                <span className="label-meta">{t("price")}</span>
                <input
                  type="number"
                  min={0}
                  value={priceAmount}
                  onChange={(event) => setPriceAmount(event.target.value)}
                  className="mt-3 w-full border border-ivory/15 bg-transparent px-4 py-3 text-ivory outline-none focus:border-gilt"
                />
              </label>
            ) : null}
            <label className="mt-6 block">
              <span className="label-meta">{t("status")}</span>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value as WorkStatus)}
                className="mt-3 w-full border border-ivory/15 bg-ink px-4 py-3 text-ivory outline-none focus:border-gilt"
              >
                <option value="forthcoming">{t("forthcoming")}</option>
                <option value="published">{t("adminPublished")}</option>
                <option value="unpublished">{t("adminUnpublished")}</option>
              </select>
            </label>
            <button
              type="submit"
              disabled={pending}
              className="label-meta mt-8 min-h-12 border border-gilt bg-gilt px-8 py-4 text-ink disabled:opacity-50"
            >
              {t("adminCreateWork")}
            </button>
          </form>
        </section>
      </div>

      <section className="mx-auto mt-20 max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <h2 className="font-serif text-4xl">{t("adminOrders")}</h2>
        <p className="mt-4 max-w-2xl text-muted">{t("adminOrdersKicker")}</p>
        <ul className="mt-10 divide-y divide-ivory/10 border-y border-ivory/10">
          {orders.map((order) => (
            <li key={order.id} className="grid gap-3 py-6 lg:grid-cols-12">
              <p className="label-meta text-gilt lg:col-span-2">{order.id}</p>
              <div className="lg:col-span-5">
                <p className="font-serif text-2xl">
                  {loc(order.workTitle ?? order.product)}
                </p>
                <p className="mt-2 text-sm text-muted">
                  {order.userId} · {loc(order.format)}
                </p>
              </div>
              <p className="label-meta lg:col-span-2">{loc(order.total.display)}</p>
              <p className="label-meta lg:col-span-3 lg:text-right">
                {order.status.toUpperCase()} · {order.createdAt.slice(0, 10)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-20 max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <h2 className="font-serif text-4xl">{t("adminBuyers")}</h2>
        <ul className="mt-10 divide-y divide-ivory/10 border-y border-ivory/10">
          {buyers.length === 0 ? (
            <li className="py-8 text-muted">{t("adminNoBuyers")}</li>
          ) : (
            buyers.map((buyer) => (
              <li key={buyer.userId} className="grid gap-3 py-6 lg:grid-cols-12">
                <p className="font-serif text-2xl lg:col-span-4">{buyer.userId}</p>
                <p className="text-muted lg:col-span-6">{buyer.works.join(" · ")}</p>
                <p className="label-meta lg:col-span-2 lg:text-right">
                  {buyer.paidOrders} {t("adminPaidOrders")}
                </p>
              </li>
            ))
          )}
        </ul>
      </section>

      <AdminLaunchPanel />
    </main>
  );
}
