import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import AboutHeroSection from '@/components/AboutHeroSection/AboutHeroSection';
import AboutSliderSection from '@/components/AboutSliderSection/AboutSliderSection';
import MapSection from '@/components/MapSection/MapSection';
import AboutValuesSection from '@/components/AboutValuesSection/AboutValuesSection';
import PartnersSection from '@/components/PartnersSection/PartnersSection';
import FooterSection from '@/components/FooterSection/FooterSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict: any = await getDictionary(lang as 'vi' | 'en');
  return {
    title: dict?.about?.meta?.title || 'Giới thiệu dự án | Viet Tri Legacy Lakeside',
    description:
      dict?.about?.meta?.description ||
      'Nơi dòng thời gian lắng đọng thành di sản - Giới thiệu dự án Việt Trì Legacy Lakeside.',
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict: any = await getDictionary(lang as 'vi' | 'en');

  return (
    <>
      {/* Layer 1: Slider (sticky) ← Map (sticky) ← Values scroll over each other */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <AboutHeroSection dict={dict.about?.hero} currentLang={lang} />
        <AboutSliderSection dict={dict.about?.slider} />
        <MapSection dict={dict.about?.map} />
        <AboutValuesSection dict={dict.about?.values} />
      </div>
      {/* Layer 2: Partners + Footer slide over the Values section */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <PartnersSection dict={dict.partners} />
        <FooterSection dict={dict.footer} modalDict={dict.modal} />
      </div>
    </>
  );
}
