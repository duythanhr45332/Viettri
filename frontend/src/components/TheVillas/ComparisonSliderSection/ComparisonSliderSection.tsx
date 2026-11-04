'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import styles from './ComparisonSliderSection.module.css';

interface ComparisonSliderProps {
  dict?: {
    titleIndochine?: string;
    subIndochine?: string;
    titleTropical?: string;
    subTropical?: string;
    comparisonAria?: string;
  };
}

const IMG_INDOCHINE = '/images/villas/c1b22bd783885906e3ed642aac23139c6b103d48.png';
const IMG_TROPICAL = '/images/about/aboutslider3.jpg';

export default function ComparisonSliderSection({ dict }: ComparisonSliderProps) {
  // Slider position as percentage (0% to 100%, 50% default)
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<number>(50);

  // Update position based on clientX during active drag
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    posRef.current = clampedPos;
    setSliderPos(clampedPos);
  }, []);

  // Snap logic per requirement:
  // Default is 50/50.
  // Image 1 (left): if dragged right < 75% -> snap to 50%, if > 75% -> snap to 100%.
  // Image 2 (right): similarly, if dragged left revealing < 75% (pos >= 25%) -> snap to 50%, if > 75% (pos < 25%) -> snap to 0% (100% image 2).
  const snapToThreshold = useCallback((currentPos: number) => {
    let target = 50;
    if (currentPos > 75) {
      target = 100;
    } else if (currentPos < 25) {
      target = 0;
    } else {
      target = 50;
    }
    posRef.current = target;
    setSliderPos(target);
    setIsDragging(false);
  }, []);

  const handleStartDrag = (clientX: number) => {
    setIsDragging(true);
    updatePosition(clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      if (e.touches[0]) {
        updatePosition(e.touches[0].clientX);
      }
    };

    const handleEnd = () => {
      if (!isDragging) return;
      snapToThreshold(posRef.current);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleEnd);
      window.addEventListener('touchcancel', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
      window.removeEventListener('touchcancel', handleEnd);
    };
  }, [isDragging, updatePosition, snapToThreshold]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      const nextPos = Math.max(0, sliderPos - 10);
      snapToThreshold(nextPos);
    } else if (e.key === 'ArrowRight') {
      const nextPos = Math.min(100, sliderPos + 10);
      snapToThreshold(nextPos);
    } else if (e.key === 'Home') {
      snapToThreshold(0);
    } else if (e.key === 'End') {
      snapToThreshold(100);
    } else if (e.key === 'Enter' || e.key === ' ') {
      snapToThreshold(50);
    }
  };

  const hideLeft = sliderPos < 48;
  const hideRight = sliderPos > 52;

  return (
    <section
      ref={containerRef}
      className={`${styles.sliderSection} ${isDragging ? styles.dragging : ''}`}
      onMouseDown={(e) => {
        if (e.button !== 0) return;
        handleStartDrag(e.clientX);
      }}
      onTouchStart={(e) => {
        if (e.touches[0]) handleStartDrag(e.touches[0].clientX);
      }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="slider"
      aria-label={dict?.comparisonAria || "So sánh thiết kế Modern Indochine và Contemporary Tropical"}
      aria-valuenow={Math.round(sliderPos)}
      aria-valuemin={0}
      aria-valuemax={100}
      data-node-id="112:1672"
    >
      {/* Background Image: Contemporary Tropical (Full underneath) */}
      <div className={styles.afterLayer} data-name="after-wrapper">
        <Image
          src={IMG_TROPICAL}
          alt="Contemporary Tropical Villa"
          fill
          priority
          className={styles.bgImage}
        />
      </div>

      {/* Clipped Image: Modern Indochine (Left overlay) */}
      <div
        className={styles.beforeLayer}
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        data-name="before-wrapper"
      >
        <Image
          src={IMG_INDOCHINE}
          alt="Modern Indochine Villa"
          fill
          priority
          className={styles.bgImage}
        />
      </div>

      {/* Persistent Top Gradient for Text Readability */}
      <div className={styles.topGradient} />

      {/* Persistent Left Label (Ảnh 1: Modern Indochine) */}
      <div
        className={`${styles.leftLabel} ${hideLeft ? styles.hideLeftOnMobile : ''}`}
        data-node-id="I112:1672;1159:2653"
      >
        <p className={styles.labelTitle}>
          {dict?.titleIndochine || 'Modern Indochine'}
        </p>
        <p className={styles.labelSubtitle}>
          {dict?.subIndochine || 'Dấu ấn hào hoa vượt thời gian'}
        </p>
      </div>

      {/* Persistent Right Label (Ảnh 2: Contemporary Tropical) */}
      <div
        className={`${styles.rightLabel} ${hideRight ? styles.hideRightOnMobile : ''}`}
        data-node-id="I112:1672;1159:2660"
      >
        <p className={styles.labelTitle}>
          {dict?.titleTropical || 'Contemporary Tropical'}
        </p>
        <p className={styles.labelSubtitle}>
          {dict?.subTropical || 'Hơi thở nhiệt đới bên mặt hồ'}
        </p>
      </div>

      {/* Vertical Divider Line */}
      <div
        className={styles.dividerLine}
        style={{ left: `${sliderPos}%` }}
      />

      {/* Interactive Divider Handle */}
      <div
        className={styles.handleWrapper}
        style={{ left: `${sliderPos}%` }}
        onMouseDown={(e) => {
          e.stopPropagation();
          handleStartDrag(e.clientX);
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          if (e.touches[0]) handleStartDrag(e.touches[0].clientX);
        }}
        data-name="handler-wrapper"
      >
        {/* Central Circular Knob */}
        <div className={styles.handleKnob}>
          <svg
            className={styles.chevronIcon}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <svg
            className={styles.chevronIcon}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
