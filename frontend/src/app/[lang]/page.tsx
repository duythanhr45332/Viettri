import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import HeroBanner from '@/components/HeroBanner/HeroBanner';
import GalleryBanner from '@/components/GalleryBanner/GalleryBanner';
import IntroSection from '@/components/IntroSection/IntroSection';
import VillaSection from '@/components/VillaSection/VillaSection';
import FeaturesSection from '@/components/FeaturesSection/FeaturesSection';
import MapSection from '@/components/MapSection/MapSection';
import ProductsSection from '@/components/ProductsSection/ProductsSection';
import PartnersSection from '@/components/PartnersSection/PartnersSection';
import FooterSection from '@/components/FooterSection/FooterSection';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict: any = await getDictionary(lang as 'vi' | 'en');
  return {
    title: dict.home?.meta?.title || dict.meta?.title || 'Viet Tri Legacy Lakeside',
    description: dict.home?.meta?.description || dict.meta?.description || 'Viet Tri Legacy Lakeside - Nơi dòng thời gian được lắng đọng thành di sản.',
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict: any = await getDictionary(lang as 'vi' | 'en');

  return (
    <>
      <div style={{ position: 'relative', zIndex: 1 }}>
          <HeroBanner dict={dict.hero} />
          <GalleryBanner dict={dict.gallery} />
          <IntroSection dict={dict.intro} />
        </div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <VillaSection dict={dict.villa} />
          <FeaturesSection dict={dict.features} />
        </div>
        <div style={{ position: 'relative', zIndex: 3 }}>
          <MapSection dict={dict.map} />
          <ProductsSection dict={dict.products} />
        </div>
        <div style={{ position: 'relative', zIndex: 4 }}>
          <PartnersSection dict={dict.partners} />
          <FooterSection dict={dict.footer} modalDict={dict.modal} />
        </div>
    </>
  );
}
