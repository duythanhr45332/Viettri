'use client';

import React from 'react';
import Link from 'next/link';
import styles from './AboutHeroSection.module.css';

interface AboutHeroProps {
  dict: {
    breadcrumbHome?: string;
    breadcrumbCurrent?: string;
    title1?: string;
    title2?: string;
    breadcrumbAria?: string;
    sectionAria?: string;
  };
  currentLang?: string;
}

export default function AboutHeroSection({ dict, currentLang = 'vi' }: AboutHeroProps) {
  const homeUrl = currentLang === 'vi' ? '/' : `/${currentLang}`;

  return (
    <section className={styles.section} id="about-hero" data-node-id="24:684" aria-label={dict?.sectionAria || "Giới thiệu dự án"}>
      <div className={styles.container}>
        <div className={styles.leftContent}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label={dict?.breadcrumbAria || "Breadcrumb"}>
            <Link href={homeUrl} className={styles.breadcrumbLink}>
              {dict?.breadcrumbHome || 'Trang chủ'}
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>
              {dict?.breadcrumbCurrent || 'Giới thiệu dự án'}
            </span>
          </nav>

          {/* Heading */}
          <h1 className={styles.title}>
            <span>{dict?.title1 || 'Nơi dòng thời gian'}</span>
            <span>{dict?.title2 || 'lắng đọng thành di sản'}</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
