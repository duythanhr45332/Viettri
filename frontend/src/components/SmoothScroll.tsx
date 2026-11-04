'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ReactLenis, useLenis } from 'lenis/react';

function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    // When route changes, reset scroll to top immediately (both for Lenis and native window)
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      lenis.resize();
    }
    window.scrollTo(0, 0);
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}
