import React from 'react';
import Image from 'next/image';
import styles from './VillaSectionMobile.module.css';

export default function VillaSectionMobile({ dict }: { dict: any }) {
  return (
    <div className={styles.mobileContainer}>
      
      {/* Top Header Area */}
      <div className={styles.topHeader}>
        <div className={styles.ornamentsRow}>
          <div className={styles.visualOrnament}>
            <Image src="/images/left.png" alt="Ornament Left" fill className={styles.img} />
          </div>
          <div className={styles.visualOrnamentRight}>
            <Image src="/images/right.png" alt="Ornament Right" fill className={styles.img} />
          </div>
        </div>

        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{dict.title}</h2>
          <p className={styles.subtitle}>{dict.subtitle}</p>
        </div>
      </div>

      {/* Bottom Stats Area */}
      <div className={styles.statsContainer}>
        {/* Decorative Grid Lines */}
        <div className={styles.gridLineHorizontal} />
        <div className={styles.gridLineVertical} />
        
        {/* Center Star */}
        <div className={styles.centerStar}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4V28M4 16H28M7.5 7.5L24.5 24.5M7.5 24.5L24.5 7.5" stroke="var(--text-on-green-title)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* 4 Grid Items */}
        <div className={styles.statItem}>
          <div className={styles.statValueWrapper}>
            <span className={styles.statValue}>{dict.statsValues?.areaValue || '17,3'}</span>
            <span className={styles.statUnit}>{dict.statsValues?.areaUnit || 'ha'}</span>
          </div>
          <span className={styles.statLabel}>{dict.stats.area}</span>
        </div>

        <div className={styles.statItem}>
          <div className={styles.statValueWrapper}>
            <span className={styles.statValue}>{dict.statsValues?.unitsValue || '7,5'}</span>
            <span className={styles.statUnit}>{dict.statsValues?.unitsUnit || 'ha'}</span>
          </div>
          <span className={styles.statLabel}>{dict.stats.units}</span>
        </div>

        <div className={styles.statItem}>
          <div className={styles.statValueWrapper}>
            <span className={styles.statValue}>{dict.statsValues?.densityValue || '92'}</span>
            <span className={styles.statUnit}>{dict.statsValues?.densityUnit || 'căn'}</span>
          </div>
          <span className={styles.statLabel}>{dict.stats.density}</span>
        </div>

        <div className={styles.statItem}>
          <div className={styles.statValueWrapper}>
            <span className={styles.statValue}>{dict.statsValues?.avgAreaValueMobile || dict.statsValues?.avgAreaValue || '57,5'}</span>
            <span className={styles.statUnit}>{dict.statsValues?.avgAreaUnit || '%'}</span>
          </div>
          <span className={styles.statLabel}>{dict.stats.avgArea}</span>
        </div>

      </div>

    </div>
  );
}
