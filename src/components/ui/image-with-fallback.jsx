"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function ImageWithFallback({
  src,
  alt = "",
  sizes,
  priority = false,
  fill = true,
  useNative = false,
  imageClassName = "object-cover",
  fallbackClassName = "flex h-full w-full flex-col items-center justify-center gap-1 bg-stone-200 text-stone-500",
  fallbackLabel = "MAALEEN",
  fallbackLabelClassName = "font-[family-name:var(--font-display)] text-xl tracking-[0.18em]",
  fallbackSubLabel = "",
  fallbackSubLabelClassName = "text-[10px] font-medium uppercase tracking-[0.22em] text-stone-400",
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const showImage = Boolean(src) && !failed;

  if (!showImage) {
    return (
      <div className={fallbackClassName}>
        <span className={fallbackLabelClassName}>{fallbackLabel}</span>
        {fallbackSubLabel ? (
          <span className={fallbackSubLabelClassName}>{fallbackSubLabel}</span>
        ) : null}
      </div>
    );
  }

  if (useNative) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        className={`absolute inset-0 h-full w-full ${imageClassName}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes={sizes}
      onError={() => setFailed(true)}
      className={imageClassName}
    />
  );
}
