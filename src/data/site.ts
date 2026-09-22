// Language-neutral facts about the attraction. Used by JSON-LD builders and page content.
// Translations of prose live in src/i18n.ts; this file holds only the structured NAP/entity data.
export const SITE_FACTS = {
  name: 'Mercado Central de San José',
  alternateName: ['Mercado Central', 'San José Central Market'],
  telephone: '+506 2222 5981',
  priceRange: '₡',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Avenida Central y Avenida 1, entre calles 6 y 8',
    addressLocality: 'San José',
    addressRegion: 'San José',
    addressCountry: 'CR'
  },
  geo: { '@type': 'GeoCoordinates', latitude: 9.934543490167613, longitude: -84.08457912302394 },
  hasMap: 'https://maps.app.goo.gl/DFX6n41sMX3djrEA6',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '07:30', closes: '19:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '08:00', closes: '18:00' }
  ],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.4, reviewCount: 31375, bestRating: 5, worstRating: 1 },
  isAccessibleForFree: true,
  sameAs: [
    'https://www.msj.go.cr/servciud/merc/Paginas/mercado_central.aspx',
    'https://www.mcj.go.cr/sala-de-prensa/noticias/mejoras-en-iluminacion-gasificacion-y-seguridad-dan-la-bienvenida-los',
    'https://www.wikidata.org/wiki/Q7414518',
    'https://maps.app.goo.gl/DFX6n41sMX3djrEA6'
  ],
  image: '/images/mercado-central-san-jose-fachada.jpg',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6990.065595381938!2d-84.08457912302394!3d9.934543490167613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0e363898ff73b%3A0xd989d6c79a205b8e!2z5Lit5aSn5biC5Zy6!5e1!3m2!1szh-CN!2s!4v1788188009290!5m2!1szh-CN!2s'
} as const;

// Institutional source links (URLs are language-neutral; labels live in i18n).
export const SOURCE_LINKS = [
  { url: 'https://www.msj.go.cr/servciud/merc/Paginas/mercado_central.aspx', key: 'municipality' },
  { url: 'https://www.mcj.go.cr/sala-de-prensa/noticias/mejoras-en-iluminacion-gasificacion-y-seguridad-dan-la-bienvenida-los', key: 'culture' },
  { url: 'https://www.visitcostarica.com/', key: 'ict' },
  { url: 'https://www.wikidata.org/wiki/Q7414518', key: 'wikidata' }
] as const;
