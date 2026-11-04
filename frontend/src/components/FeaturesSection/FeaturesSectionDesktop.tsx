'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './FeaturesSectionDesktop.module.css';

// Mảng này chỉ dùng để lưu trữ đường dẫn ảnh (không phụ thuộc vào ngôn ngữ)
const slidesImages = [
  {
    image: '/images/Masterot.png',
    subImage: '/images/product1.1.png'
  },
  {
    image: '/images/product2.jpg',
    subImage: '/images/product2.2.jpg'

  },
  {
    image: '/images/Clubhouse.png',
    subImage: '/images/product3.2.jpg'

  },
  {
    image: '/images/WATG.jpg',
    subImage: '/images/product4.2.jpg'

  }
];

export default function FeaturesSectionDesktop({ dict }: { dict: any }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setIsScrolled(rect.top <= window.innerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Autoplay slider
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slidesImages.length);
    }, 10000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slidesImages.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slidesImages.length) % slidesImages.length);
  };

  const currentSlide = dict.slides[currentSlideIndex];
  const nextSlideIndex = (currentSlideIndex + 1) % slidesImages.length;
  const nextSlide = dict.slides[nextSlideIndex];
  const currentSlideImg = slidesImages[currentSlideIndex].image;
  // If the current slide has a specific subImage, use it. Otherwise default to next slide's image.
  const nextSlideImg = slidesImages[currentSlideIndex].subImage || slidesImages[nextSlideIndex].image;

  return (
    <div className={styles.container}>
      {/* Title Area */}
      <div className={styles.titleSection}>
        <h2 className={styles.title}>
          {dict.title1}<br />{dict.title2}
        </h2>
        <div className={styles.titleOrnaments}>
          <div className={styles.lineLeft} />
          <div className={styles.ornamentCenter}>
            <Image src="/images/left.png" alt="Ornament" width={48} height={28} />
            <Image src="/images/right.png" alt="Ornament" width={48} height={28} />
          </div>
          <div className={styles.lineRight} />
        </div>
      </div>

      {/* Slider Area */}
      <div className={styles.sliderArea}>
        {/* Main Active Slide */}
        <div className={styles.mainSlide}>
          <div className={styles.mainImageWrapper}>
            <Image
              key={`main-${currentSlideIndex}`}
              src={currentSlideImg}
              alt={currentSlide.title}
              fill
              unoptimized
              className={styles.mainImage}
            />
          </div>
          <div className={styles.slideInfo}>
            <div className={styles.slideText}>
              <h3 className={styles.slideTitle}>{currentSlide.title}</h3>
              <p className={styles.slideDesc}>{currentSlide.desc}</p>
            </div>
            <div className={styles.sliderControls}>
              <button className={styles.controlButton} onClick={handlePrev} aria-label="Previous slide">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="13" viewBox="0 0 15 13" fill="none">
                  <path d="M0.1833 6.69254L5.8083 12.3175C5.92558 12.4348 6.08464 12.5007 6.25049 12.5007C6.41634 12.5007 6.5754 12.4348 6.69268 12.3175C6.80995 12.2003 6.87584 12.0412 6.87584 11.8753C6.87584 11.7095 6.80995 11.5504 6.69268 11.4332L2.13408 6.87535H14.3755C14.5412 6.87535 14.7002 6.8095 14.8174 6.69229C14.9346 6.57508 15.0005 6.41611 15.0005 6.25035C15.0005 6.08459 14.9346 5.92562 14.8174 5.80841C14.7002 5.6912 14.5412 5.62535 14.3755 5.62535H2.13408L6.69268 1.06753C6.80995 0.95026 6.87584 0.7912 6.87584 0.625347C6.87584 0.459495 6.80995 0.300435 6.69268 0.18316C6.5754 0.0658846 6.41634 0 6.25049 0C6.08464 0 5.92558 0.0658846 5.8083 0.18316L0.1833 5.80816C0.12519 5.86621 0.0790911 5.93514 0.0476379 6.01101C0.0161848 6.08688 -2.86102e-06 6.16821 -2.86102e-06 6.25035C-2.86102e-06 6.33248 0.0161848 6.41381 0.0476379 6.48969C0.0790911 6.56556 0.12519 6.63449 0.1833 6.69254Z" fill="#E1D8C4"/>
                </svg>
              </button>
              <div className={styles.pagination}>
                <span className={styles.currentNumber}>{currentSlideIndex + 1}</span>
                <span className={styles.totalNumber}>/{slidesImages.length}</span>
              </div>
              <button className={styles.controlButton} onClick={handleNext} aria-label="Next slide">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="13" viewBox="0 0 15 13" fill="none">
                  <path d="M14.8172 6.69254L9.19219 12.3175C9.07491 12.4348 8.91585 12.5007 8.75 12.5007C8.58415 12.5007 8.42509 12.4348 8.30781 12.3175C8.19054 12.2003 8.12465 12.0412 8.12465 11.8753C8.12465 11.7095 8.19054 11.5504 8.30781 11.4332L12.8664 6.87535H0.625C0.45924 6.87535 0.300269 6.8095 0.183058 6.69229C0.0658481 6.57508 0 6.41611 0 6.25035C0 6.08459 0.0658481 5.92562 0.183058 5.80841C0.300269 5.6912 0.45924 5.62535 0.625 5.62535H12.8664L8.30781 1.06753C8.19054 0.95026 8.12465 0.7912 8.12465 0.625347C8.12465 0.459495 8.19054 0.300435 8.30781 0.18316C8.42509 0.0658846 8.58415 0 8.75 0C8.91585 0 9.07491 0.0658846 9.19219 0.18316L14.8172 5.80816C14.8753 5.86621 14.9214 5.93514 14.9529 6.01101C14.9843 6.08688 15.0005 6.16821 15.0005 6.25035C15.0005 6.33248 14.9843 6.41381 14.9529 6.48969C14.9214 6.56556 14.8753 6.63449 14.8172 6.69254Z" fill="#E1D8C4"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Next Slide Preview */}
        <div className={styles.nextSlideHint}>
          <div className={styles.nextImageWrapper} onClick={handleNext}>
            <Image
              key={`next-${nextSlideIndex}`}
              src={nextSlideImg}
              alt={nextSlide.title}
              fill
              unoptimized
              className={styles.nextImage}
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Bottom Call to Action */}
      <div className={styles.bottomContent}>
        <div className={styles.bottomLeft}>
          <h3 className={styles.bottomTitle}>{dict.bottomTitle1}<br />{dict.bottomTitle2}<br />{dict.bottomTitle3}</h3>
        </div>
        <div className={styles.bottomRight}>
          <p className={styles.bottomDesc}>
            {dict.bottomDesc}
          </p>
        </div>
      </div>

      {/* Bottom Ornaments */}
      <div className={styles.cornerOrnaments}>
        <div className={styles.cornerIcon}>
          <Image src="/images/left.png" alt="Left ornament" fill />
        </div>
        <div className={styles.cornerIcon}>
          <Image src="/images/right.png" alt="Right ornament" fill />
        </div>
      </div>

    </div>
  );
}
