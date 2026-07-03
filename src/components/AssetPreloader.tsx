"use client";

import { useEffect } from "react";

type PreloadPayload = {
  images?: string[];
  pdfs?: string[];
};

const STORAGE_KEY = "jms-assets-preloaded-v1";
const CONCURRENCY = 5;

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function preloadFile(src: string) {
  const isRemote = /^https?:\/\//i.test(src) && !src.startsWith(window.location.origin);

  return fetch(src, {
    cache: "force-cache",
    mode: isRemote ? "no-cors" : "same-origin",
  }).then(
    () => undefined,
    () => undefined,
  );
}

async function preloadWithLimit(urls: string[], onProgress: (done: number) => void) {
  let index = 0;
  let done = 0;

  async function worker() {
    while (index < urls.length) {
      const current = urls[index];
      index += 1;

      if (/\.(avif|gif|jpe?g|jfif|png|svg|webp)(\?.*)?$/i.test(current)) {
        await preloadImage(current);
      } else {
        await preloadFile(current);
      }

      done += 1;
      onProgress(done);
    }
  }

  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, urls.length) }, worker));
}

export default function AssetPreloader() {
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "done") return;

    let cancelled = false;

    async function run() {
      try {
        const response = await fetch("/api/preload-assets", { cache: "no-store" });
        const payload = (await response.json()) as PreloadPayload;
        const urls = Array.from(new Set([...(payload.images ?? []), ...(payload.pdfs ?? [])]));

        if (cancelled || urls.length === 0) {
          localStorage.setItem(STORAGE_KEY, "done");
          return;
        }

        await preloadWithLimit(urls, () => undefined);
      } finally {
        if (!cancelled) {
          localStorage.setItem(STORAGE_KEY, "done");
        }
      }
    }

    window.setTimeout(run, 800);

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
