// Localized JSON-LD builders. `site` is Astro.site (absolute origin); `locale` selects language.
import { SITE_FACTS } from '../data/site';
import { faqItems, type Locale } from '../i18n';

const inLang = (locale: Locale) => (locale === 'en' ? 'en' : 'es-CR');
const siteName = (locale: Locale) =>
  locale === 'en' ? 'Guide to the Central Market of San José' : 'Guía del Mercado Central de San José';

export function webSiteSchema(site: URL, locale: Locale) {
  const name = siteName(locale);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': site.toString() + '#website', url: site.toString(), name, inLanguage: inLang(locale), publisher: { '@id': site.toString() + '#organization' } },
      { '@type': 'Organization', '@id': site.toString() + '#organization', name, url: site.toString(), logo: { '@type': 'ImageObject', url: new URL('/icons/logo.svg', site).toString() } }
    ]
  };
}

export function webPageSchema(site: URL, canonical: string, locale: Locale, title: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': canonical + '#webpage',
    url: canonical,
    name: title,
    description,
    inLanguage: inLang(locale),
    isPartOf: { '@id': site.toString() + '#website' },
    dateModified: '2026-09-02'
  };
}

export function placeSchema(site: URL, locale: Locale) {
  const url = new URL(locale === 'es' ? '/' : '/en/', site).toString();
  const image = new URL(SITE_FACTS.image, site).toString();
  const desc =
    locale === 'en'
      ? 'Historic market of San José founded in 1880, with aisles of food, coffee, traditional meals, herbs, handicrafts and local trade.'
      : 'Mercado histórico de San José fundado en 1880, con pasillos de alimentos, café, comidas tradicionales, hierbas, artesanías y comercio local.';
  return {
    '@context': 'https://schema.org',
    '@type': ['TouristAttraction', 'LocalBusiness'],
    '@id': url + '#mercado-central-san-jose',
    name: SITE_FACTS.name,
    alternateName: SITE_FACTS.alternateName,
    description: desc,
    url,
    image: [image],
    telephone: SITE_FACTS.telephone,
    priceRange: SITE_FACTS.priceRange,
    address: SITE_FACTS.address,
    geo: SITE_FACTS.geo,
    hasMap: SITE_FACTS.hasMap,
    openingHoursSpecification: SITE_FACTS.openingHoursSpecification,
    aggregateRating: SITE_FACTS.aggregateRating,
    isAccessibleForFree: SITE_FACTS.isAccessibleForFree,
    sameAs: SITE_FACTS.sameAs
  };
}

export function faqSchema(locale: Locale) {
  const items = faqItems(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
  };
}
