import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import Header from "@/components/Header/Header";
import { getDictionary } from '@/dictionaries';
import SmoothScroll from "@/components/SmoothScroll";

// const zalandoFont = localFont({
//   src: '../../../public/fonts/Zalando_Sans/ZalandoSans-VariableFont_wdth,wght.ttf',
//   variable: '--font-zalando',
//   display: 'swap',
// });

// const playfair = Playfair_Display({
//   variable: "--font-playfair",
//   subsets: ["latin", "vietnamese"],
//   display: 'swap',
// });

const newZalandoFont = localFont({
  src: [
    {
      path: '../../../public/fonts/NewZalando/ZalandoSansExpanded-VariableFont_wght.ttf',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/NewZalando/ZalandoSansExpanded-Italic-VariableFont_wght.ttf',
      style: 'italic',
    }
  ],
  variable: '--font-zalando',
  display: 'swap',
});

const newPlayfair = localFont({
  src: [
    {
      path: '../../../public/fonts/NewPlayfair/Playfair2-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/NewPlayfair/Playfair2-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/NewPlayfair/Playfair2-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/NewPlayfair/Playfair2-Bold.ttf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-playfair',
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict: any = await getDictionary(lang as 'vi' | 'en');
  const title = dict?.meta?.title || 'Viet Tri Legacy Lakeside';
  const description =
    dict?.meta?.description ||
    'Viet Tri Legacy Lakeside - Nơi dòng thời gian được lắng đọng thành di sản.';

  return {
    metadataBase: new URL('https://viettrilegacylakeside.vn'),
    title,
    description,
    openGraph: {
      title,
      description,
      url: 'https://viettrilegacylakeside.vn',
      siteName: 'Viet Tri Legacy Lakeside',
      locale: lang === 'en' ? 'en_US' : 'vi_VN',
      type: 'website',
      images: [
        {
          url: 'https://viettrilegacylakeside.vn/images/thumbnail.jpg',
          width: 1200,
          height: 630,
          alt: 'Viet Tri Legacy Lakeside',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['https://viettrilegacylakeside.vn/images/thumbnail.jpg'],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'vi' | 'en');
  return (
    <html lang={lang} className={`${newZalandoFont.variable} ${newPlayfair.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PSN5WCTH');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PSN5WCTH"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <SmoothScroll>
          <Header dict={dict.header} modalDict={dict.modal} />
          <main style={{ minHeight: '100vh' }}>
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
