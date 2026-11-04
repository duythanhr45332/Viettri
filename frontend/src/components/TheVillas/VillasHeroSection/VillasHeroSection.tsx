import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './VillasHeroSection.module.css';

interface VillasHeroSectionProps {
  dict?: {
    breadcrumbHome?: string;
    breadcrumbCurrent?: string;
    breadcrumbAria?: string;
    sectionAria?: string;
    title?: string;
    title1?: string;
    title2?: string;
    desc?: string;
  };
  currentLang?: string;
}

const VISUAL_ICON = '/images/villas/5118f47ed60a4a39ada53617fc81e6103f8191e0.svg';

export default function VillasHeroSection({ dict, currentLang = 'vi' }: VillasHeroSectionProps) {
  const homeUrl = currentLang === 'en' ? '/en' : '/';

  const line1 = dict?.title1 || 'Tuyệt tác';
  const line2 = dict?.title2 || 'nơi giao hòa';

  return (
    <section className={styles.section} data-node-id="112:1654" aria-label={dict?.sectionAria || "Giới thiệu dòng sản phẩm The Villas"}>
      <div className={styles.container}>
        <div className={styles.leftContent}>
          {/* Breadcrumb - Node 112:1657 */}
          <nav className={styles.breadcrumb} aria-label={dict?.breadcrumbAria || "Breadcrumb"} data-node-id="112:1657">
            <Link href={homeUrl} className={styles.breadcrumbLink}>
              {dict?.breadcrumbHome || 'Trang chủ'}
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbActive} aria-current="page">
              {dict?.breadcrumbCurrent || 'Dòng sản phẩm'}
            </span>
          </nav>

          {/* Title Heading */}
          <div className={styles.titleWrapper} data-node-id="112:1661">
            <h1 className={styles.title}>
              <span>{line1}</span>
              <span>{line2}</span>
            </h1>
          </div>
        </div>

        {/* Narrative Intro & Visual Icon - Node 112:1669 */}
        <div className={styles.narrativeRow} data-node-id="112:1669">
          <div className={styles.visualIconWrapper} data-node-id="112:1670" aria-hidden>
            <Image
              src={VISUAL_ICON}
              alt=""
              width={44}
              height={26}
              className={styles.visualIcon}
            />
          </div>
          <p className={styles.description} data-node-id="112:1671">
            {dict?.desc ||
              'Bộ sưu tập giới hạn 92 dinh thự đơn lập tại Việt Trì Legacy Lakeside là sự thăng hoa của nghệ thuật kiến trúc. Nơi thời gian lắng đọng trong từng đường nét hào hoa của Đông Dương và thiên nhiên len lỏi vào từng nhịp thở khoáng đạt của nhiệt đới.'}
          </p>
        </div>
      </div>
    </section>
  );
}
