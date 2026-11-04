'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './IntroSection.module.css';
import IntroSectionDesktop from './IntroSectionDesktop';
import IntroSectionMobile from './IntroSectionMobile';

export default function IntroSection({ dict }: { dict: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setIsScrolled(rect.top <= window.innerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      {/* Top Curve Area */}
      <div className={`${styles.curveWrapper} ${!isScrolled ? styles.curveWrapperBg : ''}`}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className={styles.curveSvg}>
          <path d="M0,80 L100,80 Q720,-80 1340,80 L1440,80 Z" fill="var(--bg-cream)" />
        </svg>
      </div>

      <div className={styles.mainArea}>
        <div className={styles.desktopWrapper}>
          <IntroSectionDesktop dict={dict} />
        </div>
        <div className={styles.mobileWrapper}>
          <IntroSectionMobile dict={dict} />
        </div>
      </div>
    </section>
  );
}
