"use client";

import { PageIntro } from "@/components/ui/PageIntro";
import {
  adminActions,
  paidAdminFields,
  versionFields,
  workAdminFields,
} from "@/lib/admin-schema";
import { publishedWorks } from "@/data/works";
import { moneyLabel } from "@/lib/utils";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function AdminPage() {
  const { loc, locale } = useLanguage();

  return (
    <main id="main" className="bg-ink pb-28">
      <PageIntro
        eyebrow="Admin"
        title="Content architecture"
        kicker="Public work records only. Internal production files stay off this page."
      />
      <div className="mx-auto max-w-[1680px] space-y-20 px-5 sm:px-8 lg:px-12">
        <section>
          <h2 className="font-serif text-4xl">Work fields</h2>
          <p className="mt-6 max-w-xl text-sm text-muted">
            {workAdminFields.join(" · ")}
          </p>
          <p className="mt-4 max-w-xl text-sm text-muted">
            Paid: {paidAdminFields.join(" · ")}
          </p>
          <p className="mt-4 max-w-xl text-sm text-muted">
            Actions: {adminActions.join(" · ")}
          </p>
          <p className="mt-4 max-w-xl text-sm text-muted">
            Versions: {versionFields.join(" · ")}
          </p>
        </section>

        <section>
          <h2 className="font-serif text-4xl">Works</h2>
          <ul className="mt-10 divide-y divide-ivory/10 border-y border-ivory/10">
            {publishedWorks().map((work) => (
              <li key={work.id} className="grid gap-3 py-8 lg:grid-cols-12">
                <p className="label-meta text-gilt lg:col-span-2">{work.id}</p>
                <div className="lg:col-span-10">
                  <p className="font-serif text-2xl">{loc(work.title)}</p>
                  <p className="mt-2 text-sm text-muted">
                    {work.pricingModel.toUpperCase()} · {work.status} · v{work.version} ·{" "}
                    Hindi {work.hindi.version} · English {work.english.version} ·{" "}
                    {moneyLabel(work.offers[0].price, locale)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
