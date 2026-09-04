import { useEffect } from "react";

/**
 * Per-route <head> tags, set directly.
 *
 * WHY NOT react-helmet-async
 * The site used it until Sep 2026, when it was found to be emitting nothing at
 * all — no title, no canonical, and no schema.org block — in both dev and the
 * production build, silently and with no console error. Neither 2.0.5 nor the
 * older 1.3.0 worked in this tree. Since the head tags on /privacy and /terms
 * are part of what a Meta verification reviewer reads, a dependency that can
 * fail silently is the wrong thing to rely on. This hook does the same job in
 * one file, and `scripts/verify-live.ps1` checks the result on the live site.
 *
 * Note the split with index.html (see CLAUDE.md §3): the static tags there are
 * what a crawler sees before React mounts, and they describe the home page.
 * This hook overwrites them once the app is running, so the values below and
 * the ones in index.html must stay in agreement for `/`.
 *
 * og:image, og:site_name, twitter:card and twitter:image are deliberately left
 * alone — they are site-wide and correct as set in index.html.
 */

export type HeadTags = {
  title: string;
  description: string;
  /** Absolute URL. Also used for og:url. */
  canonical: string;
  keywords?: string;
  ogType?: string;
  /** schema.org payload, serialised into a ld+json script. */
  jsonLd?: Record<string, unknown>;
};

/** Marks the ld+json script as ours, so a route change replaces it. */
const MANAGED = "data-head";

function upsertMeta(selector: string, attrs: Record<string, string>, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useHead({ title, description, canonical, keywords, ogType, jsonLd }: HeadTags) {
  // Serialised so a caller passing an object literal does not re-run this on
  // every render.
  const key = JSON.stringify({ title, description, canonical, keywords, ogType, jsonLd });

  useEffect(() => {
    document.title = title;

    upsertMeta('meta[name="description"]', { name: "description" }, description);
    if (keywords) upsertMeta('meta[name="keywords"]', { name: "keywords" }, keywords);

    upsertMeta('meta[property="og:title"]', { property: "og:title" }, title);
    upsertMeta('meta[property="og:description"]', { property: "og:description" }, description);
    upsertMeta('meta[property="og:url"]', { property: "og:url" }, canonical);
    upsertMeta('meta[property="og:type"]', { property: "og:type" }, ogType ?? "website");

    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, title);
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, description);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);

    document.head.querySelectorAll(`script[${MANAGED}]`).forEach((el) => el.remove());
    if (jsonLd) {
      const script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute(MANAGED, "");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}
