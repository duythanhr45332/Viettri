'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './FeaturesSection.module.css';
import FeaturesSectionDesktop from './FeaturesSectionDesktop';
import FeaturesSectionMobile from './FeaturesSectionMobile';

export default function FeaturesSection({ dict }: { dict: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setIsScrolled(rect.top <= window.innerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      {/* Top Curve Area */}
      <div className={`${styles.curveWrapper} ${!isScrolled ? styles.curveWrapperBg : ''}`}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className={styles.curveSvg}>
          <path d="M0,80 L100,80 Q720,-80 1340,80 L1440,80 Z" fill="#283312" />
        </svg>
      </div>

      <div className={styles.mainArea}>
        {/* Background Layer */}
        <div className={styles.bgWrapper}>
          <Image src="/images/section5-bg.png" alt="Features Background" fill className={styles.bgImage} />
          <div className={styles.bgGradientTop} />
          <div className={styles.bgGradientBottom} />
        </div>

        {/* Desktop and Mobile Components */}
        <div className={styles.desktopWrapper}>
          <FeaturesSectionDesktop dict={dict} />
        </div>
        <div className={styles.mobileWrapper}>
          <FeaturesSectionMobile dict={dict} />
        </div>
      </div>
    </section>
  );
}
