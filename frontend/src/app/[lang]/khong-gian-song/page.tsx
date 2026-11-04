import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import LivingHeroSection from '@/components/LivingSpace/LivingHeroSection/LivingHeroSection';
import LivingNoorSection from '@/components/LivingSpace/LivingNoorSection/LivingNoorSection';
import LivingLJSection from '@/components/LivingSpace/LivingLJSection/LivingLJSection';
import LivingFamilySection from '@/components/LivingSpace/LivingFamilySection/LivingFamilySection';
import LivingAnaSection from '@/components/LivingSpace/LivingAnaSection/LivingAnaSection';
import FooterSection from '@/components/FooterSection/FooterSection';
import StackOnScroll from '@/components/StackOnScroll/StackOnScroll';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict: any = await getDictionary(lang as 'vi' | 'en');
  return {
    title: dict.livingSpace?.meta?.title,
    description: dict.livingSpace?.meta?.description,
  };
}

export default async function LivingSpacePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict: any = await getDictionary(lang as 'vi' | 'en');

  return (
    <>
      {/* Giống Home: Hero sticky ← Noor (vòm cong) trượt lên chồng */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <StackOnScroll
          base={<LivingHeroSection dict={dict.livingSpace?.hero} currentLang={lang} />}
          overlay={<LivingNoorSection dict={dict.livingSpace?.noor} />}
        />
      </div>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <LivingLJSection dict={dict.livingSpace?.lj} />
        <LivingFamilySection dict={dict.livingSpace?.family} />
        <LivingAnaSection dict={dict.livingSpace?.ana} />
        <FooterSection dict={dict.footer} modalDict={dict.modal} />
      </div>
    </>
  );
}
