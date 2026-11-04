'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './VillaSectionDesktop.module.css';

export default function VillaSectionDesktop({ dict }: { dict: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const isEn = pathname?.startsWith('/en');
  const livingSpaceUrl = isEn ? '/en/khong-gian-song' : '/khong-gian-song';

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(livingSpaceUrl);
  };
  return (
    <div className={styles.desktopContainer}>
      {/* Top Header Area */}
      <div className={styles.topHeader}>
        <div className={styles.visualOrnament}>
          <Image src="/images/left.png" alt="Ornament Left" fill className={styles.img} />
        </div>

        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{dict.title}</h2>
          <p className={styles.subtitle}>{dict.subtitle}</p>
        </div>

        <div className={styles.visualOrnamentRight}>
          <Image src="/images/right.png" alt="Ornament Right" fill className={styles.img} />
        </div>
      </div>

      {/* Bottom: Stats + Button */}
      <div className={styles.bottomSection}>
        <div className={styles.statsContainer}>
          <div className={styles.statDividerHorizontal} />

          <div className={styles.statItem}>
            <div className={styles.statStar}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4V28M4 16H28M7.5 7.5L24.5 24.5M7.5 24.5L24.5 7.5" stroke="var(--text-on-green-title)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className={styles.statValueWrapper}>
              <span className={styles.statValue}>{dict.statsValues?.areaValue || '17,3'}</span>
              <span className={styles.statUnit}>{dict.statsValues?.areaUnit || 'ha'}</span>
            </div>
            <span className={styles.statLabel}>{dict.stats.area}</span>
          </div>

          <div className={styles.statDividerVertical} />

          <div className={styles.statItem}>
            <div className={styles.statStar}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4V28M4 16H28M7.5 7.5L24.5 24.5M7.5 24.5L24.5 7.5" stroke="var(--text-on-green-title)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className={styles.statValueWrapper}>
              <span className={styles.statValue}>{dict.statsValues?.unitsValue || '7,5'}</span>
              <span className={styles.statUnit}>{dict.statsValues?.unitsUnit || 'ha'}</span>
            </div>
            <span className={styles.statLabel}>{dict.stats.units}</span>
          </div>

          <div className={styles.statDividerVertical} />

          <div className={styles.statItem}>
            <div className={styles.statStar}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4V28M4 16H28M7.5 7.5L24.5 24.5M7.5 24.5L24.5 7.5" stroke="var(--text-on-green-title)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className={styles.statValueWrapper}>
              <span className={styles.statValue}>{dict.statsValues?.densityValue || '92'}</span>
              <span className={styles.statUnit}>{dict.statsValues?.densityUnit || 'căn'}</span>
            </div>
            <span className={styles.statLabel}>{dict.stats.density}</span>
          </div>

          <div className={styles.statDividerVertical} />

          <div className={styles.statItem}>
            <div className={styles.statStar}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4V28M4 16H28M7.5 7.5L24.5 24.5M7.5 24.5L24.5 7.5" stroke="var(--text-on-green-title)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className={styles.statValueWrapper}>
              <span className={styles.statValue}>{dict.statsValues?.avgAreaValue || '29,12'}</span>
              <span className={styles.statUnit}>{dict.statsValues?.avgAreaUnit || '%'}</span>
            </div>
            <span className={styles.statLabel}>{dict.stats.avgArea}</span>
          </div>
        </div>

        <Link href={livingSpaceUrl} className={styles.ctaButton} onClick={handleClick}>
          {dict.cta || 'Trải nghiệm không gian sống'}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3.33337 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.66671 4L12.6667 8L8.66671 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}
