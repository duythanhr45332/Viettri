'use client';

import React from 'react';
import styles from './MapSection.module.css';
import MapSectionDesktop from './MapSectionDesktop';
import MapSectionMobile from './MapSectionMobile';

export default function MapSection({ dict }: { dict: any }) {
  return (
    <section className={styles.section}>
      <div className={styles.desktopWrapper}>
        <MapSectionDesktop dict={dict} />
      </div>
      <div className={styles.mobileWrapper}>
        <MapSectionMobile dict={dict} />
      </div>
    </section>
  );
}
