import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './IntroSectionDesktop.module.css';

export default function IntroSectionDesktop({ dict }: { dict: any }) {
  const pathname = usePathname();
  const isEn = pathname?.startsWith('/en');
  const aboutUrl = isEn ? '/en/gioi-thieu' : '/gioi-thieu';

  return (
    <div className={styles.desktopContainer}>
      <div className={styles.imagePalm}>
        <div className={styles.imageFrame}>
          <Image src="/images/intro1.png" alt="Palm leaf" fill className={styles.img} />
        </div>
      </div>
      <div className={styles.contentMain}>
        {/* <p className={styles.subtitle}>{dict.subtitle}</p> */}
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{dict.title1}</h2>
          <h2 className={styles.title}>{dict.title2}</h2>
        </div>
        <p className={styles.description}>{dict.desc1}</p>
      </div>
      <div className={styles.imagePool}>
        <div className={styles.imageFrame}>
          <Image src="/images/intro3.png" alt="Resort pool" fill className={styles.img} />
        </div>
      </div>
      <div className={styles.imagePark}>
        <div className={styles.imageFrame}>
          <Image src="/images/intro2.png" alt="Park view" fill className={styles.img} />
        </div>
      </div>
      <div className={styles.contentSub}>
        <p className={styles.description}>{dict.desc2}</p>
        <Link href={aboutUrl} className={styles.ctaButton} scroll={true}>
          {dict.cta}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3.33337 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.66671 4L12.6667 8L8.66671 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}

