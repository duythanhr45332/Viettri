import 'server-only';

const localDictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  vi: () => import('./dictionaries/vi.json').then((module) => module.default),
};

export const getDictionary = async (locale: 'en' | 'vi') => {
  let data: any = null;

  // 1. Try to fetch from WordPress REST API (if available and enabled)
  const wpBaseUrl =
    process.env.WORDPRESS_INTERNAL_URL ||
    process.env.WORDPRESS_URL ||
    (process.env.NEXT_PUBLIC_WORDPRESS_URL
      ? process.env.NEXT_PUBLIC_WORDPRESS_URL.replace(/\/graphql\/?$/, '')
      : 'https://viettrilegacylakeside.vn');

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2-second timeout

    // Support both pretty permalinks (/wp-json/...) and default plain permalinks (/?rest_route=/...)
    let endpoint = `${wpBaseUrl}/wp-json/viettri/v1/dictionary?lang=${locale}`;
    let res = await fetch(endpoint, {
      next: { revalidate: 60, tags: [`dictionary-${locale}`] },
      signal: controller.signal,
    });

    const contentType = res.headers.get('content-type') || '';
    if (!res.ok || !contentType.includes('application/json')) {
      const restRouteEndpoint = `${wpBaseUrl}/index.php?rest_route=/viettri/v1/dictionary&lang=${locale}`;
      res = await fetch(restRouteEndpoint, {
        next: { revalidate: 60, tags: [`dictionary-${locale}`] },
        signal: controller.signal,
      });
    }

    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json && typeof json === 'object' && Object.keys(json).length > 0) {
        data = json;
      }
    }
  } catch {
    // Graceful fallback to local files if WP is offline, building, or unreachable
  }

  // 2. Fallback to bundled static dictionary files
  if (!data) {
    data = await (localDictionaries[locale]?.() ?? localDictionaries.vi());
  }

  const modalData = data.common?.modal ?? data.modal;
  const headerData = data.common?.header ?? data.header;
  const footerData = data.common?.footer ?? data.footer;

  if (headerData?.menu?.villasSub === 'Tuyệt tác nơi giao hòa') {
    headerData.menu.villasSub = 'Tuyệt tác giao hòa';
  }
  if (data.common?.header?.menu?.villasSub === 'Tuyệt tác nơi giao hòa') {
    data.common.header.menu.villasSub = 'Tuyệt tác giao hòa';
  }

  return {
    ...data,
    // Direct aliases for layout and common components
    header: {
      ...headerData,
      modal: modalData,
    },
    footer: {
      ...footerData,
      modal: modalData,
    },
    modal: modalData,
    meta: data.common?.meta ?? data.meta,
    // Direct aliases for home page sections
    hero: data.home?.hero ?? data.hero,
    gallery: data.home?.gallery ?? data.gallery,
    intro: data.home?.intro ?? data.intro,
    villa: data.home?.villa ?? data.villa,
    features: data.home?.features ?? data.features,
    map: data.home?.map ?? data.map,
    products: data.home?.products ?? data.products,
    partners: data.home?.partners ?? data.partners,
  };
};

