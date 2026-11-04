import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import VillasHeroSection from '@/components/TheVillas/VillasHeroSection/VillasHeroSection';
import ComparisonSliderSection from '@/components/TheVillas/ComparisonSliderSection/ComparisonSliderSection';
import ArchDivider from '@/components/TheVillas/ArchDivider/ArchDivider';
import TropicalVillaSection from '@/components/TheVillas/TropicalVillaSection/TropicalVillaSection';
import IndochineVillaSection from '@/components/TheVillas/IndochineVillaSection/IndochineVillaSection';
import FooterSection from '@/components/FooterSection/FooterSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict: any = await getDictionary(lang as 'vi' | 'en');
  return {
    title: dict?.theVillas?.meta?.title || 'Dòng sản phẩm | Viet Tri Legacy Lakeside',
    description:
      dict?.theVillas?.meta?.description ||
      'Bộ sưu tập giới hạn 92 dinh thự đơn lập tại Việt Trì Legacy Lakeside là sự thăng hoa của nghệ thuật kiến trúc.',
    openGraph: {
      title: dict?.theVillas?.meta?.title || 'Dòng sản phẩm | Viet Tri Legacy Lakeside',
      description:
        dict?.theVillas?.meta?.description ||
        'Bộ sưu tập giới hạn 92 dinh thự đơn lập tại Việt Trì Legacy Lakeside là sự thăng hoa của nghệ thuật kiến trúc.',
      images: [
        {
          url: '/images/villas/c1b22bd783885906e3ed642aac23139c6b103d48.png',
          width: 1200,
          height: 630,
          alt: 'Dòng sản phẩm - Viet Tri Legacy Lakeside',
        },
      ],
    },
  };
}

export default async function DongSanPhamPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict: any = await getDictionary(lang as 'vi' | 'en');

  return (
    <>
      {/* Layer 1: Hero Introduction */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <VillasHeroSection dict={dict?.theVillas?.hero} currentLang={lang} />
      </div>

      {/* Layer 2: Interactive Comparison Split Slider */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <ComparisonSliderSection dict={dict?.theVillas?.comparison} />
      </div>

      {/* Layer 3: Curved Architectural Arch Separator */}
      <div style={{ position: 'relative', zIndex: 3 }}>
        <ArchDivider />
      </div>

      {/* Layer 4: Contemporary Tropical Villa Section */}
      <div style={{ position: 'relative', zIndex: 4 }}>
        <TropicalVillaSection dict={dict?.theVillas?.tropical} />
      </div>

      {/* Layer 5: Modern Indochine Villa Section */}
      <div style={{ position: 'relative', zIndex: 5 }}>
        <IndochineVillaSection dict={dict?.theVillas?.indochine} />
      </div>

      {/* Layer 6: Contact CTA Banner & Full Project Footer */}
      <div style={{ position: 'relative', zIndex: 6 }}>
        <FooterSection dict={dict?.footer} modalDict={dict?.modal} />
      </div>
    </>
  );
}
