"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type AnimatedStatValueProps = {
  value: string;
  className?: string;
  duration?: number;
};

function getStatParts(value: string) {
  const match = value.match(/(\d[\d,]*(?:\.\d+)?)/);

  if (!match || match.index === undefined) {
    return null;
  }

  const numericText = match[1];
  const end = Number(numericText.replace(/,/g, ""));

  if (!Number.isFinite(end)) {
    return null;
  }

  return {
    prefix: value.slice(0, match.index),
    suffix: value.slice(match.index + numericText.length),
    end,
    decimals: numericText.includes(".") ? numericText.split(".")[1].length : 0,
    useGrouping: numericText.includes(","),
  };
}

function formatNumber(value: number, decimals: number, useGrouping: boolean) {
  if (useGrouping) {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    }).format(value);
  }

  return value.toFixed(decimals);
}

export function AnimatedStatValue({ value, className = "", duration = 2200 }: AnimatedStatValueProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const parts = useMemo(() => getStatParts(value), [value]);
  const [current, setCurrent] = useState(() => (parts ? 0 : null));
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (!parts) return;

    setCurrent(0);
    setShouldAnimate(false);
  }, [parts]);

  useEffect(() => {
    if (!parts) return;

    const element = ref.current;

    if (!element || typeof IntersectionObserver === "undefined") {
      setShouldAnimate(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setShouldAnimate(true);
        observer.disconnect();
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [parts]);

  useEffect(() => {
    if (!parts || !shouldAnimate) return;

    let frame = 0;
    const startDelay = 120;
    const start = performance.now() + startDelay;

    const tick = (now: number) => {
      if (now < start) {
        frame = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(parts.end * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [duration, parts, shouldAnimate]);

  if (!parts) {
    return <span className={className}>{value}</span>;
  }

  const displayValue = current === null ? parts.end : current;

  return (
    <span ref={ref} className={`stat-value tabular-nums ${className}`} aria-label={value}>
      {parts.prefix}
      {formatNumber(displayValue, parts.decimals, parts.useGrouping)}
      {parts.suffix}
    </span>
  );
}
