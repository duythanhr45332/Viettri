import React from 'react';
import Image from 'next/image';
import styles from './ArchDivider.module.css';

const ARCH_SVG = '/images/villas/48d9a832a5b914d610c13d0d5f5d69e050ca5ff5.svg';

export default function ArchDivider() {
  return (
    <div className={styles.dividerWrapper} data-node-id="112:1674" aria-hidden>
      <Image
        src={ARCH_SVG}
        alt=""
        fill
        className={styles.archSvg}
        priority
      />
    </div>
  );
}
