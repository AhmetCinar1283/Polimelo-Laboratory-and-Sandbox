"use client";

import React, { useState } from "react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  // Add any specific props if needed in the future
}

export default function SafeImage({ src, alt, style, ...props }: SafeImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      style={style}
      onError={() => setError(true)}
      {...props}
    />
  );
}
