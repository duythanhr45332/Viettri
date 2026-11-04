'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './AboutValuesSection.module.css';

export interface ValueItem {
  id: number;
  title: string;
  desc: string;
  image: string;
}

const valuesBgDecor = '/images/about/values-bg-decor.png';

const defaultValueImages: string[] = [
  '/images/about/value-1.png',
  '/images/about/value-2.png',
  '/images/about/value-3.png',
  '/images/about/value-4.png',
  '/images/about/value-5.png',
  '/images/about/value-6.png',
  '/images/about/slide-2.png',
  '/images/about/slide-3.png',
];

export default function AboutValuesSection({ dict }: { dict?: any }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const rawItems = dict?.items && dict.items.length > 0
    ? dict.items
    : defaultValueImages.map(() => ({ title: '', desc: '' }));

  const items: ValueItem[] = rawItems.map((item: any, idx: number) => ({
    id: idx + 1,
    title: item?.title || '',
    desc: item?.desc || '',
    image: item?.image || defaultValueImages[idx] || defaultValueImages[0],
  }));

  const total = items.length;
  const currentItem = items[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  // Thumbnail list starting from the next items
  const thumbnailItems = [];
  for (let i = 1; i < total; i++) {
    const index = (activeIndex + i) % total;
    thumbnailItems.push({ item: items[index], originalIndex: index });
  }

  /* Keyboard ← / → while the section is on screen */
  const sectionRef = useRef<HTMLElement>(null);
  const visibleRef = useRef(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (visibleRef.current = e.isIntersecting), {
      threshold: 0.4,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!visibleRef.current || e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveIndex((p) => (p + 1) % total);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveIndex((p) => (p - 1 + total) % total);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total]);

  /* Swipe on touch devices */
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (dx < -50) handleNext();
    else if (dx > 50) handlePrev();
  };

  return (
    <section ref={sectionRef} className={styles.section} id="about-values-section" data-node-id="45:1927">
      {/* Frame 110 (45:1925): Ellipse curve transition from Map section */}
      <div className={styles.topCurveWrapper} data-node-id="45:1925" aria-hidden>
        <svg
          preserveAspectRatio="none"
          width="100%"
          height="100%"
          viewBox="0 0 1440 87.8644"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.curveSvg}
        >
          <path
            d="M720 0.135742C525.295 0.135742 337.718 30.7518 161.791 87.4462H0V148.277V1042.31H1440V148.277V87.4462H1278.21C1102.28 30.7518 914.705 0.135742 720 0.135742Z"
            fill="#411514"
          />
        </svg>
      </div>

      {/* Ambient background image and gradients */}
      <div className={styles.bgDecor} aria-hidden>
        <Image
          src={valuesBgDecor}
          alt=""
          fill
          className={styles.bgDecorImage}
        />
        <div className={styles.bgDecorGradient} />
      </div>
      <div className={styles.bgFade} aria-hidden />

      <div className={styles.innerContainer} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {/* Top Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.headerTitle}>
              <span>{dict?.titleLine1}</span>
              <span>{dict?.titleLine2}</span>
              <span>{dict?.titleLine3}</span>
            </h2>
          </div>

          <div className={styles.headerRight}>
            <p className={styles.headerNarrative}>
              {dict?.intro}
            </p>
            <div className={styles.visualIconWrapper} aria-hidden>
              <svg
                width="47"
                height="24"
                viewBox="0 0 47 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.lotusSvg}
              >
                <path
                  d="M18.064 15.4302C21.6549 13.0692 24.6168 10.9184 29.1043 11.7925C34.8646 12.9146 35.1392 19.5405 30.6967 22.3579C29.161 23.3318 27.3021 23.7688 25.5044 23.3581C24.3777 23.0946 23.4008 22.388 22.7894 21.3944C21.8016 19.777 22.2001 17.5798 23.8114 16.5639C24.1657 16.3436 24.5917 16.2745 24.9962 16.3718C25.3933 16.4685 25.9655 16.8413 25.7701 17.3374C25.3963 18.2628 24.2576 18.6585 23.5529 19.2809C23.0377 19.7358 22.9238 20.6475 23.2658 21.2339C24.4039 23.1853 26.9558 23.5458 28.7947 22.5802C30.1554 21.8769 31.1825 20.6529 31.6478 19.1797C32.0558 17.8532 31.9286 16.4173 31.2939 15.1855C30.6871 14.0258 29.6549 13.0705 28.3929 12.726C23.9131 11.503 20.0139 14.6133 16.8271 17.3546C14.2805 19.5021 11.8762 22.0214 8.79175 23.3721C6.61364 24.3259 4.62412 24.0278 2.50645 23.5605C0.376897 23.0906 -1.05097 20.53 0.981512 20.3004C1.5949 20.2311 2.087 23.215 3.17462 23.2742C4.10411 23.5871 5.4017 23.3194 6.26731 22.864C10.6837 20.5407 13.9159 16.0699 15.6073 11.3895C16.8018 8.08381 16.434 3.40677 12.6777 1.98719C9.92204 1.03059 6.43134 1.82879 5.3375 4.84921C4.82411 6.26678 5.16964 8.12749 6.69721 8.65547C8.66408 9.3354 9.3002 6.66414 10.9547 6.77224C11.1062 6.78217 11.3676 7.09896 11.4243 7.25469C12.0767 9.57089 7.97518 9.85999 6.77336 9.32894C4.65314 8.4861 4.44063 5.85028 5.18703 3.95946C5.70751 2.53834 7.14002 1.05368 8.56464 0.502365C11.796 -0.74809 16.3058 0.32096 17.6345 3.87679C19.3256 8.4027 16.6999 12.3169 14.3483 15.93L14.5641 15.9979C15.1453 15.1865 16.2738 14.0497 16.9915 13.2576C20.0874 9.84037 23.2375 6.66963 27.0862 4.09735C30.616 1.73821 35.4507 0.186058 39.6845 0.982154C41.9442 1.44903 43.9837 2.38043 45.2963 4.38775C46.9107 6.85636 47.076 10.5474 44.3918 12.3619C43.5535 12.9286 42.7646 13.0443 41.8004 13.1642C37.7119 13.6722 35.1147 10.1844 31.3667 9.37939C30.9923 9.20195 30.2375 9.41411 29.88 9.16973C32.5067 8.85867 34.4149 9.82552 36.819 10.6289C40.1318 11.7359 45.508 11.2647 44.8677 6.42429C44.3637 2.61383 40.5272 1.06838 37.1875 1.62672C29.7505 2.87007 22.6848 9.86193 18.064 15.4302Z"
                  fill="#FAE6CB"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className={styles.divider} />

        {/* Main Showcase Grid */}
        <div className={styles.showcaseSection}>
          {/* Row 1: Active Large Frame + Upcoming Thumbnails */}
          <div className={styles.visualRow}>
            {/* Active Large Display */}
            <div className={styles.activeFrame}>
              <div className={styles.activeImageWrapper}>
                <Image
                  key={currentItem.id}
                  src={currentItem.image}
                  alt={currentItem.title}
                  fill
                  className={styles.activeImage}
                  priority
                />
              </div>
            </div>

            {/* Thumbnails Strip (bleeds off the right edge like Figma) */}
            <div className={styles.thumbnailsContainer}>
              <div key={activeIndex} className={styles.thumbnailsTrack}>
                {thumbnailItems.map(({ item, originalIndex }, idx) => (
                  <button
                    key={item.id}
                    className={`${styles.thumbnailCard} ${idx === 0 ? styles.firstThumb : ''}`}
                    style={{ animationDelay: `${idx * 60}ms` }}
                    onClick={() => setActiveIndex(originalIndex)}
                    type="button"
                    aria-label={dict?.viewItem ? `${dict.viewItem} ${item.title}` : item.title}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className={styles.thumbImage}
                    />
                    <div className={styles.thumbOverlay} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Title / Description on Left, Slider Controls on Right */}
          <div className={styles.infoRow}>
            {/* Stacked text: all items share one cell, active one slides in vertically */}
            <div className={styles.activeInfo} aria-live="polite">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className={`${styles.infoItem} ${
                    idx === activeIndex ? styles.infoActive : idx < activeIndex ? styles.infoPast : ''
                  }`}
                  aria-hidden={idx !== activeIndex}
                >
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemDesc}>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <div className={styles.controlsGroup}>
              {/* Prev Button */}
              <button
                className={styles.navBtn}
                onClick={handlePrev}
                aria-label={dict?.prev || 'Prev'}
                type="button"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.68281 9.55781L8.30781 3.93281C8.42509 3.81554 8.58415 3.74965 8.75 3.74965C8.91585 3.74965 9.07491 3.81554 9.19219 3.93281C9.30946 4.05009 9.37535 4.20915 9.37535 4.375C9.37535 4.54085 9.30946 4.69991 9.19219 4.81719L4.63359 9.375H16.875C17.0408 9.375 17.1997 9.44085 17.3169 9.55806C17.4342 9.67527 17.5 9.83424 17.5 10C17.5 10.1658 17.4342 10.3247 17.3169 10.4419C17.1997 10.5592 17.0408 10.625 16.875 10.625H4.63359L9.19219 15.1828C9.30946 15.3001 9.37535 15.4591 9.37535 15.625C9.37535 15.7909 9.30946 15.9499 9.19219 16.0672C9.07491 16.1845 8.91585 16.2503 8.75 16.2503C8.58415 16.2503 8.42509 16.1845 8.30781 16.0672L2.68281 10.4422C2.62476 10.3841 2.57864 10.3152 2.54719 10.2393C2.51574 10.1635 2.49951 10.0821 2.49951 10C2.49951 9.91787 2.51574 9.83654 2.54719 9.76066C2.57864 9.68479 2.62476 9.61586 2.68281 9.55781Z"
                    fill="#E1D8C4"
                  />
                </svg>
              </button>

              {/* Counter: Active / Total */}
              <div className={styles.counter}>
                <span className={styles.currentNum}>{activeIndex + 1}</span>
                <span className={styles.totalNum}>/{total}</span>
              </div>

              {/* Next Button */}
              <button
                className={styles.navBtn}
                onClick={handleNext}
                aria-label={dict?.next || 'Next'}
                type="button"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17.3172 10.4422L11.6922 16.0672C11.5749 16.1845 11.4159 16.2503 11.25 16.2503C11.0841 16.2503 10.9251 16.1845 10.8078 16.0672C10.6905 15.9499 10.6247 15.7909 10.6247 15.625C10.6247 15.4591 10.6905 15.3001 10.8078 15.1828L15.3664 10.625H3.125C2.95924 10.625 2.80027 10.5592 2.68306 10.4419C2.56585 10.3247 2.5 10.1658 2.5 10C2.5 9.83424 2.56585 9.67527 2.68306 9.55806C2.80027 9.44085 2.95924 9.375 3.125 9.375H15.3664L10.8078 4.81719C10.6905 4.69991 10.6247 4.54085 10.6247 4.375C10.6247 4.20915 10.6905 4.05009 10.8078 3.93281C10.9251 3.81554 11.0841 3.74965 11.25 3.74965C11.4159 3.74965 11.5749 3.81554 11.6922 3.93281L17.3172 9.55781C17.3753 9.61586 17.4214 9.68479 17.4529 9.76066C17.4843 9.83654 17.5005 9.91787 17.5005 10C17.5005 10.0821 17.4843 10.1635 17.4529 10.2393C17.4214 10.3152 17.3753 10.3841 17.3172 10.4422Z"
                    fill="#E1D8C4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
