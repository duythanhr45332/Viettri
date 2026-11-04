'use client';

import React, { useEffect, useRef } from 'react';
import styles from './StackOnScroll.module.css';

interface StackOnScrollProps {
  /** Section nằm dưới (được ghim) */
  base: React.ReactNode;
  /** Section trượt lên chồng lên base */
  overlay: React.ReactNode;
}

/**
 * Hiệu ứng chồng section giống trang Home (HeroBanner/GalleryBanner → IntroSection):
 * base dùng `position: sticky; top: min(0px, 100vh - chiều cao)` → cuộn tới đáy rồi đứng yên,
 * overlay (z-index cao hơn, có vòm cong) trượt lên che base.
 * Home cố định chiều cao (900px) nên viết thẳng trong CSS; ở đây chiều cao base phụ thuộc
 * nội dung nên đo bằng JS và gán vào biến --base-h.
 *
 * overlay nhận `data-stacking="true"` khi base đã được ghim (overlay bắt đầu trượt lên che),
 * để section phía trên có thể đổi giao diện (vd: góc vòm từ kem → trong suốt, giống IntroSection).
 */
export default function StackOnScroll({ base, overlay }: StackOnScrollProps) {
  const baseRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const baseEl = baseRef.current;
    const overlayEl = overlayRef.current;
    if (!baseEl || !overlayEl) return;

    let frame = 0;

    const updateStacking = () => {
      frame = 0;
      const stickyTop = Math.min(0, window.innerHeight - baseEl.offsetHeight);
      const stuck = window.scrollY > 0 && baseEl.getBoundingClientRect().top <= stickyTop + 1;
      overlayEl.dataset.stacking = stuck ? 'true' : 'false';
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateStacking);
    };

    const update = () => {
      baseEl.style.setProperty('--base-h', `${baseEl.offsetHeight}px`);
      onScroll();
    };

    update();
    updateStacking();

    const ro = new ResizeObserver(update);
    ro.observe(baseEl);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={baseRef} className={styles.base}>
        {base}
      </div>
      <div ref={overlayRef} className={styles.overlay} data-stacking="false">
        {overlay}
      </div>
    </>
  );
}
