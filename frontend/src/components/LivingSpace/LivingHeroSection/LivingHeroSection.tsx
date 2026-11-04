import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './LivingHeroSection.module.css';

interface LivingHeroSectionProps {
  dict: {
    breadcrumbHome: string;
    breadcrumbCurrent: string;
    title: string;
    intro: string;
    breadcrumbLabel?: string;
    imageAlt?: string;
  };
  currentLang?: string;
}

export default function LivingHeroSection({ dict, currentLang = 'vi' }: LivingHeroSectionProps) {
  const homeHref = currentLang === 'vi' ? '/' : `/${currentLang}`;

  return (
    <section className={styles.section} data-node-id="45:2764">
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label={dict.breadcrumbLabel}>
          <Link href={homeHref} className={styles.breadcrumbLink}>
            {dict.breadcrumbHome}
          </Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{dict.breadcrumbCurrent}</span>
        </nav>

        {/* Title and Intro */}
        <div className={styles.headerRow}>
          <h1 className={styles.title}>{dict.title}</h1>
          <div className={styles.introWrapper}>
            <p className={styles.intro}>{dict.intro}</p>
          </div>
        </div>

        {/* Ornamental Divider */}
        <div className={styles.ornamentRow}>
          <div className={styles.flourishLeft}>
            <img src="/images/khong-gian-song/473523427c5e8603d9258ffd22925be307dcfa5e.svg" alt="" />
          </div>
          <div className={styles.line}></div>
          <div className={styles.flourishRight}>
            <img src="/images/khong-gian-song/eac770662d72b17532e70ee23f5a255ac725d539.svg" alt="" />
          </div>
        </div>
      </div>

      {/* Large Courtyard Visual */}
      <div className={styles.visualContainer} data-node-id="45:2781">
        <Image
          src="/images/khong-gian-song/c1b22bd783885906e3ed642aac23139c6b103d48.png"
          alt={dict.imageAlt || ''}
          fill
          priority
          className={styles.visualImage}
        />
      </div>
    </section>
  );
}
