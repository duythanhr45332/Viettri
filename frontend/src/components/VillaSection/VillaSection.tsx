import React from 'react';
import Image from 'next/image';
import styles from './VillaSection.module.css';
import VillaSectionDesktop from './VillaSectionDesktop';
import VillaSectionMobile from './VillaSectionMobile';

export default function VillaSection({ dict }: { dict: any }) {
  return (
    <section className={styles.section} id="living-space">
      <div className={styles.bgWrapper}>
        <Image
          src="/images/Rectangle26.png"
          alt="Villa Compound Background"
          fill
          className={styles.img}
          priority
        />
        <div className={styles.gradientOverlay}></div>

        {/* Foreground Content */}
        <div className={styles.content}>
          <div className={styles.desktopWrapper}>
            <VillaSectionDesktop dict={dict} />
          </div>
          <div className={styles.mobileWrapper}>
            <VillaSectionMobile dict={dict} />
          </div>
        </div>
      </div>
    </section>
  );
}
