'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './ProductsSection.module.css';

const slides = [
  {
    id: 1,
    img: "/images/section6.jpg",
    gallery: [
      "/images/section6.jpg",
      // "/images/product1.1.png",
      // "/images/product2.jpg",
      // "/images/product2.2.jpg"
    ]
  },
  {
    id: 2,
    img: "/images/section6.1.jpg",
    gallery: [
      "/images/section6.1.jpg",
      // "/images/product3.2.jpg",
      // "/images/product4.2.jpg",
      // "/images/product2.jpg"
    ]
  }
];

export default function ProductsSection({ dict }: { dict: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const isEn = pathname?.startsWith('/en');
  const productsUrl = isEn ? '/en/dong-san-pham' : '/dong-san-pham';

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(productsUrl);
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeGalleryImage, setActiveGalleryImage] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const [prevSlide, setPrevSlide] = useState(currentSlide);

  if (prevSlide !== currentSlide) {
    setPrevSlide(currentSlide);
    setActiveGalleryImage(0);
  }

  const activeSlide = slides[currentSlide];

  return (
    <section className={styles.section} ref={sectionRef}>
      {/* Top Curve Area */}
      <div className={`${styles.curveWrapper} ${!isScrolled ? styles.curveWrapperBg : ''}`}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className={styles.curveSvg}>
          <path d="M0,80 L100,80 Q720,-80 1340,80 L1440,80 Z" fill="var(--bg-cream)" />
        </svg>
      </div>

      <div className={styles.mainArea}>
        {/* Top Divider with Ornaments */}
        <div className={styles.dividerWrapper}>
          <div className={styles.ornamentLeft}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="28" viewBox="0 0 48 28" fill="none">
              <path d="M35.3247 0.0374519C37.3618 -0.142917 39.8537 0.346987 41.7212 1.10318C44.135 2.08031 46.1798 4.2227 47.1049 6.57851C48.5002 10.1301 48.1966 15.0996 46.6635 18.5687C44.8886 22.5837 41.8696 25.591 37.6374 27.2011C36.0812 27.7933 34.603 27.925 32.9485 27.9895C29.2617 28.133 26.4191 26.7945 23.3095 25.0793C22.0134 24.3646 20.8552 23.658 19.4889 23.0674C17.0212 22.0009 15.5715 22.943 13.3532 23.831C12.8655 24.0261 12.0551 24.2833 11.548 24.0423C11.28 23.9149 11.056 23.6788 10.9505 23.4097C10.8734 23.2131 10.9024 22.8953 11.012 22.7378C13.1574 19.6552 20.1325 22.9104 22.8267 23.7251C24.8224 24.3284 26.4499 24.9521 28.2846 25.3379C31.1379 25.9378 34.9451 26.1884 37.6904 25.276C40.2411 24.4282 42.414 22.8038 43.9741 20.7286C44.4386 20.1114 44.9531 19.5197 45.3029 18.8254C45.063 18.9327 43.9866 20.1927 43.7091 20.4557C41.8956 22.1714 39.847 23.2626 37.4187 23.7868C28.7732 25.6535 24.9255 20.4559 19.466 15.1078C18.0777 13.7064 16.7561 12.5957 15.0839 11.4982C11.2697 8.9946 6.19242 9.36691 3.50847 13.2191C2.46758 14.7132 1.88325 17.6527 4.07161 18.6194C6.8338 19.8397 9.65631 18.6154 12.4428 18.2234C14.2632 17.9732 18.7696 18.6017 20.2818 19.4905L20.2761 19.6166C19.5986 19.5317 18.0486 19.0816 17.2365 18.9395C13.434 18.2742 11.5198 19.4372 8.26003 20.8706C7.37255 21.1577 6.47745 21.3841 5.54246 21.4627C4.10582 21.5837 2.60461 21.3804 1.47111 20.4571C0.563489 19.7178 0.10973 18.6806 0.0204997 17.5548C-0.128667 15.6714 0.542872 13.9097 1.81802 12.4873C3.44334 10.6742 5.92646 9.59525 8.38521 9.41839C20.3859 8.55525 24.6528 20.2965 34.1935 19.5952C36.1814 19.4491 37.9361 18.6531 39.2351 17.19C40.3779 15.9018 41.0004 14.2269 40.8482 12.5289C40.772 11.6768 40.4512 10.8395 39.7487 10.2823C39.3931 10.0002 38.8005 9.66626 38.3245 9.71367C37.3705 9.80849 35.9231 10.7691 35.0337 10.4363C34.8352 10.3618 34.7071 10.2274 34.6223 10.042C34.5269 9.8345 34.4816 9.5833 34.5731 9.36738C34.6724 9.13201 34.9027 8.99099 35.1397 8.90182C36.2103 8.49951 37.9053 8.7309 38.9209 9.16886C39.9992 9.63413 40.7826 10.4611 41.197 11.5218C41.911 13.3479 41.7896 15.8418 40.9387 17.6081C40.2305 19.0767 38.8275 20.1703 37.2606 20.7192C32.9764 22.2209 29.3089 20.1268 25.546 18.4433C28.2114 20.7802 31.3065 22.1855 34.9489 22.2488C38.1722 22.3282 41.2905 21.143 43.5858 18.9663C45.8146 16.9157 47.1058 14.0991 47.1752 11.1348C47.2292 8.96682 46.3812 6.86767 44.8173 5.30343C44.2526 4.74565 43.2736 3.96585 42.5566 3.63289C36.4608 0.79939 27.9473 2.6478 27.904 10.3401C27.8876 13.2841 29.1837 14.3515 31.1176 16.2374C25.6944 13.5523 24.2317 8.43933 28.0052 3.57668C29.6896 1.40485 32.5708 0.308005 35.3247 0.0374519Z" fill="black" />
            </svg>
          </div>
          <div className={styles.dividerLine}></div>
          <div className={styles.ornamentRight}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="28" viewBox="0 0 48 28" fill="none">
              <path d="M12.6753 0.0374519C10.6382 -0.142917 8.14629 0.346987 6.27882 1.10318C3.86497 2.08031 1.82019 4.2227 0.89513 6.57851C-0.500175 10.1301 -0.196644 15.0996 1.33646 18.5687C3.11143 22.5837 6.13042 25.591 10.3626 27.2011C11.9188 27.7933 13.397 27.925 15.0515 27.9895C18.7383 28.133 21.5809 26.7945 24.6905 25.0793C25.9866 24.3646 27.1448 23.658 28.5111 23.0674C30.9788 22.0009 32.4285 22.943 34.6468 23.831C35.1345 24.0261 35.9449 24.2833 36.452 24.0423C36.72 23.9149 36.944 23.6788 37.0495 23.4097C37.1266 23.2131 37.0976 22.8953 36.988 22.7378C34.8426 19.6552 27.8675 22.9104 25.1733 23.7251C23.1776 24.3284 21.5501 24.9521 19.7154 25.3379C16.8621 25.9378 13.0549 26.1884 10.3096 25.276C7.75893 24.4282 5.58598 22.8038 4.0259 20.7286C3.56144 20.1114 3.04688 19.5197 2.69709 18.8254C2.93703 18.9327 4.01337 20.1927 4.29089 20.4557C6.1044 22.1714 8.15304 23.2626 10.5813 23.7868C19.2268 25.6535 23.0745 20.4559 28.534 15.1078C29.9223 13.7064 31.2439 12.5957 32.9161 11.4982C36.7303 8.9946 41.8076 9.36691 44.4915 13.2191C45.5324 14.7132 46.1167 17.6527 43.9284 18.6194C41.1662 19.8397 38.3437 18.6154 35.5572 18.2234C33.7368 17.9732 29.2304 18.6017 27.7182 19.4905L27.724 19.6166C28.4014 19.5317 29.9514 19.0816 30.7635 18.9395C34.566 18.2742 36.4802 19.4372 39.74 20.8706C40.6275 21.1577 41.5225 21.3841 42.4575 21.4627C43.8942 21.5837 45.3954 21.3804 46.5289 20.4571C47.4365 19.7178 47.8903 18.6806 47.9795 17.5548C48.1287 15.6714 47.4571 13.9097 46.182 12.4873C44.5567 10.6742 42.0735 9.59525 39.6148 9.41839C27.6141 8.55525 23.3472 20.2965 13.8065 19.5952C11.8186 19.4491 10.0639 18.6531 8.76493 17.19C7.62209 15.9018 6.9996 14.2269 7.15185 12.5289C7.22798 11.6768 7.54885 10.8395 8.25132 10.2823C8.6069 10.0002 9.19952 9.66626 9.67554 9.71367C10.6295 9.80849 12.0769 10.7691 12.9663 10.4363C13.1648 10.3618 13.2929 10.2274 13.3777 10.042C13.4731 9.8345 13.5184 9.5833 13.4269 9.36738C13.3276 9.13201 13.0973 8.99099 12.8603 8.90182C11.7897 8.49951 10.0947 8.7309 9.07907 9.16886C8.00079 9.63413 7.21738 10.4611 6.80303 11.5218C6.08899 13.3479 6.2104 15.8418 7.06127 17.6081C7.76952 19.0767 9.17254 20.1703 10.7394 20.7192C15.0236 22.2209 18.6911 20.1268 22.454 18.4433C19.7886 20.7802 16.6935 22.1855 13.0511 22.2488C9.82779 22.3282 6.70955 21.143 4.41423 18.9663C2.18541 16.9157 0.894169 14.0991 0.824787 11.1348C0.770828 8.96682 1.6188 6.86767 3.18274 5.30343C3.74741 4.74565 4.72645 3.96585 5.44337 3.63289C11.5392 0.79939 20.0527 2.6478 20.096 10.3401C20.1124 13.2841 18.8163 14.3515 16.8824 16.2374C22.3056 13.5523 23.7683 8.43933 19.9948 3.57668C18.3104 1.40485 15.4293 0.308005 12.6753 0.0374519Z" fill="black" />
            </svg>
          </div>
        </div>

        <div className={styles.container}>
          {/* Header */}
          <div className={styles.headerArea}>
            <div className={styles.headerText}>
              {/* <p className={styles.subtitle}>{dict.subtitle}</p> */}
              <h2 className={styles.title}>
                {dict.title1}<br />{dict.title2}
              </h2>
            </div>
            <div className={styles.pagination}>
              <span className={styles.pageCurrent}>{activeSlide.id}</span>
              <span className={styles.pageTotal}>/2</span>
            </div>
          </div>

          {/* Content Body */}
          <div className={styles.contentArea}>
            <div
              className={styles.sliderTrack}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {dict.slides.map((slide: any, i: number) => (
                <div key={i} className={styles.slideFull}>
                  {/* Left Image with Gallery */}
                  <div className={styles.imageWrapper}>
                    <div className={styles.thumbnailColumn}>
                      {slides[i]?.gallery.map((thumb: string, thumbIdx: number) => (
                        <div
                          key={thumbIdx}
                          className={`${styles.thumbnail} ${i === currentSlide && thumbIdx === activeGalleryImage ? styles.thumbnailActive : ''}`}
                          onClick={() => { if (i === currentSlide) setActiveGalleryImage(thumbIdx); }}
                        >
                          <Image
                            src={thumb}
                            alt={`Thumbnail ${thumbIdx + 1}`}
                            fill
                            className={styles.thumbImage}
                          />
                        </div>
                      ))}
                    </div>
                    <div className={styles.mainImage}>
                      <Image
                        src={i === currentSlide ? (slides[i]?.gallery[activeGalleryImage] || slides[i]?.img) : slides[i]?.img}
                        alt={slide.title1}
                        fill
                        className={styles.image}
                      />
                    </div>
                  </div>

                  {/* Right Info */}
                  <div className={styles.infoWrapper}>
                    <div className={styles.slideItem}>
                      <div className={styles.infoText}>
                        <h3 className={styles.infoTitle}>
                          {slide.title1}
                        </h3>
                        {slide.subtitle && (
                          <p className={styles.infoSubtitle}>{slide.subtitle}</p>
                        )}
                        <p className={styles.infoDesc}>{slide.desc}</p>
                      </div>

                      <div className={styles.statsTable}>
                        <div className={styles.statRow}>
                          <span className={styles.statLabel}>{dict.stats?.quantity}</span>
                          <span className={styles.statValue}>{slide.statsValues?.quantity}</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.statRow}>
                          <span className={styles.statLabel}>{dict.stats?.landArea}</span>
                          <span className={styles.statValue}>{slide.statsValues?.landArea}</span>
                        </div>
                      </div>

                      <Link href={productsUrl} className={styles.ctaButton} onClick={handleCtaClick}>
                        {dict.cta || 'Chiêm ngưỡng bộ sưu tập'}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3.33337 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M8.66671 4L12.6667 8L8.66671 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>

                      <div className={styles.sliderControls}>
                        <button className={styles.controlButton} onClick={() => {
                          setCurrentSlide((prev) => (prev - 1 + dict.slides.length) % dict.slides.length);
                        }} aria-label="Previous slide">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="13" viewBox="0 0 15 13" fill="none">
                            <path d="M0.1833 6.69254L5.8083 12.3175C5.92558 12.4348 6.08464 12.5007 6.25049 12.5007C6.41634 12.5007 6.5754 12.4348 6.69268 12.3175C6.80995 12.2003 6.87584 12.0412 6.87584 11.8753C6.87584 11.7095 6.80995 11.5504 6.69268 11.4332L2.13408 6.87535H14.3755C14.5412 6.87535 14.7002 6.8095 14.8174 6.69229C14.9346 6.57508 15.0005 6.41611 15.0005 6.25035C15.0005 6.08459 14.9346 5.92562 14.8174 5.80841C14.7002 5.6912 14.5412 5.62535 14.3755 5.62535H2.13408L6.69268 1.06753C6.80995 0.95026 6.87584 0.7912 6.87584 0.625347C6.87584 0.459495 6.80995 0.300435 6.69268 0.18316C6.5754 0.0658846 6.41634 0 6.25049 0C6.08464 0 5.92558 0.0658846 5.8083 0.18316L0.1833 5.80816C0.12519 5.86621 0.0790911 5.93514 0.0476379 6.01101C0.0161848 6.08688 -2.86102e-06 6.16821 -2.86102e-06 6.25035C-2.86102e-06 6.33248 0.0161848 6.41381 0.0476379 6.48969C0.0790911 6.56556 0.12519 6.63449 0.1833 6.69254Z" fill="#242424" />
                          </svg>
                        </button>
                        <button className={styles.controlButton} onClick={() => {
                          setCurrentSlide((prev) => (prev + 1) % dict.slides.length);
                        }} aria-label="Next slide">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="13" viewBox="0 0 15 13" fill="none">
                            <path d="M14.8172 6.69254L9.19219 12.3175C9.07491 12.4348 8.91585 12.5007 8.75 12.5007C8.58415 12.5007 8.42509 12.4348 8.30781 12.3175C8.19054 12.2003 8.12465 12.0412 8.12465 11.8753C8.12465 11.7095 8.19054 11.5504 8.30781 11.4332L12.8664 6.87535H0.625C0.45924 6.87535 0.300269 6.8095 0.183058 6.69229C0.0658481 6.57508 0 6.41611 0 6.25035C0 6.08459 0.0658481 5.92562 0.183058 5.80841C0.300269 5.6912 0.45924 5.62535 0.625 5.62535H12.8664L8.30781 1.06753C8.19054 0.95026 8.12465 0.7912 8.12465 0.625347C8.12465 0.459495 8.19054 0.300435 8.30781 0.18316C8.42509 0.0658846 8.58415 0 8.75 0C8.91585 0 9.07491 0.0658846 9.19219 0.18316L14.8172 5.80816C14.8753 5.86621 14.9214 5.93514 14.9529 6.01101C14.9843 6.08688 15.0005 6.16821 15.0005 6.25035C15.0005 6.33248 14.9843 6.41381 14.9529 6.48969C14.9214 6.56556 14.8753 6.63449 14.8172 6.69254Z" fill="#242424" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
