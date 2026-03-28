"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
  buildShopEditHref,
  getShopEdit,
  parseCollectionEditSlugFromPathname,
} from "@/data/shop-edits";

export function ProductShopIntro() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathSlug = parseCollectionEditSlugFromPathname(pathname);
  const querySlug = searchParams.get("edit")?.trim() ?? "";
  const editSlug = pathSlug || querySlug;
  const edit = getShopEdit(editSlug);

  if (edit) {
    return (
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
          See What&apos;s New
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-tight text-stone-900 sm:text-4xl">
          {edit.label}
        </h1>
        <div className="mt-5 flex justify-center">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/collections", label: "Collections" },
              {
                href: buildShopEditHref(editSlug),
                label: edit.label,
                current: true,
              },
            ]}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
        See What&apos;s New
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-tight text-stone-900 sm:text-4xl">
        Shop
      </h1>
      <div className="mt-5 flex justify-center">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/collections", label: "Collections" },
            { href: "/shop", label: "Shop", current: true },
          ]}
        />
      </div>
    </div>
  );
}
