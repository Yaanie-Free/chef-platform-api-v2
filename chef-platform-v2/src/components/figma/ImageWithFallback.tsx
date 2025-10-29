"use client";
import React from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

export function ImageWithFallback({ fallbackSrc = "/placeholder-chef.svg", alt, src, ...props }: ImageWithFallbackProps) {
  const [error, setError] = React.useState(false);

  return (
    <Image
      alt={alt}
      src={error ? fallbackSrc : src}
      onError={() => setError(true)}
      {...props}
    />
  );
}
