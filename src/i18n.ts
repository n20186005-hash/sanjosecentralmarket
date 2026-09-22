// Centralized i18n: locales, URL helpers, and the full es/en string dictionary.
// Chrome strings, homepage prose and legal prose live here; language-neutral NAP lives in src/data/site.ts.
export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const DEFAULT_LOCALE: Locale = 'es';

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

// `base` is the path without locale prefix and without trailing slash ('' = home).
export function localizedPath(base: string, locale: Locale): string {
  const prefix = locale === DEFAULT_LOCALE ? '' : '/' + locale;
  if (!base) return prefix ? prefix + '/' : '/';
  return prefix + '/' + base + '/';
}

// hreflang alternates for <head>: one per locale plus x-default (points to default locale).
export function hreflangAlternates(base: string, site: URL): { hreflang: string; href: string }[] {
  const out: { hreflang: string; href: string }[] = [];
  for (const l of locales) out.push({ hreflang: l, href: new URL(localizedPath(base, l), site).toString() });
  out.push({ hreflang: 'x-default', href: new URL(localizedPath(base, DEFAULT_LOCALE), site).toString() });
  return out;
}

type Dict = (typeof ui)['es'];
export const ui = {
  es: {
    htmlLang: 'es-CR',
    ogLocale: 'es_CR',
    siteName: 'Guía del Mercado Central de San José',
    nav: {
      historia: 'Historia',
      historias: 'Tradiciones',
      visita: 'Planifique',
      comer: 'Dónde comer',
      servicios: 'Servicios',
      llegar: 'Cómo llegar',
      faq: 'FAQ'
    },
    langSwitch: { to: 'EN', label: 'English' },
    footer: {
      disclaimer1:
        'Este sitio es un proyecto independiente y sin fines de lucro de información para visitantes; no mantiene relación de dependencia con la Municipalidad de San José, el Instituto Costarricense de Turismo ni ninguna organización oficial.',
      disclaimer2:
        'La información del sitio se contrasta con fuentes públicas de la Municipalidad de San José, el Ministerio de Cultura y Juventud de Costa Rica y el Instituto Costarricense de Turismo. No contiene recomendaciones comerciales pagadas.',
      imageRightsPrefix:
        'Derechos de imagen: las fotografías pertenecen a sus autores originales y se utilizan conforme a las licencias indicadas en ',
      imageRightsPage: 'créditos fotográficos',
      imageRightsSuffix: '.',
      legalLinks: { privacidad: 'Privacidad', terminos: 'Términos', cookies: 'Configurar cookies' },
      copyright: '© 2026 Guía del Mercado Central de San José. Todos los derechos reservados sobre el diseño y contenido original.',
      nonofficial: 'Guía no oficial. Verifique horarios y condiciones con fuentes oficiales antes de desplazarse.'
    },
    // Cookie toggle labels (chrome-level).
    cookieAlways: 'Siempre activas',
    cookieOn: 'Activadas',
    cookieOff: 'Desactivado',
    home: {
      hero: {
        eyebrow: 'San José · Costa Rica',
        h1a: 'Mercado Central',
        h1b: 'de San José',
        subtitle:
          'Un laberinto vivo de pasillos, sodas, café, hierbas, frutas, pescaderías y oficios tradicionales en el corazón de la capital costarricense.',
        pills: ['Fundado en 1880', 'Patrimonio cultural', '★ 4,4 · 31.375 reseñas']
      },
      marketStrip:
        'CAFÉ · CASADOS · OLLA DE CARNE · ESPECIAS · HIERBAS · CUERO · ARTESANÍA · SORBETERAS · VIDA DE BARRIO',
      facts: [
        { eyebrow: 'Entrada', b: 'Gratuita', muted: 'Las compras se pagan aparte' },
        { eyebrow: 'Horario municipal', b: 'L–S 7:30–19:00', muted: 'Domingo 8:00–18:00' },
        { eyebrow: 'Visita sugerida', b: '1½–2 horas', muted: 'Para recorrer y comer' },
        { eyebrow: 'Ubicación', b: 'Merced', muted: 'Centro de San José' }
      ],
      historia: {
        eyebrow: 'Patrimonio cotidiano',
        h2: 'Un mercado que también cuenta la historia de San José',
        ps: [
          'La Municipalidad de San José identifica al Mercado Central como el mayor mercado de la ciudad y señala que fue fundado en 1880. Su importancia no se limita al comercio: el Ministerio de Cultura y Juventud lo describe como un espacio de transmisión de cocina, herbolaria, artesanía, formas de trato y otras expresiones de la cultura popular costarricense.',
          'El conjunto actual conserva huellas de varias etapas arquitectónicas. Un terremoto afectó el edificio original en 1888 y, décadas después, se reconstruyeron sectores con nuevos materiales y lenguaje modernista.',
          'Su historia se entrelaza con la de la capital: mientras San José se consolidaba como centro político y comercial del país, el mercado se convirtió en el punto donde el campo entrega sus productos a la ciudad. Esa función de «puente» entre lo rural y lo urbano se sigue leyendo en la variedad de puestos, en las recetas de las sodas y en los oficios que los pasillos mantienen vivos.'
        ],
        quote: 'Aquí la visita no consiste en “ver” un monumento: consiste en entrar en una ciudad dentro de la ciudad.',
        sourceLabel: 'Fuente municipal ↗',
        imgAlt: 'Pasillo interior del Mercado Central de San José'
      },
      gallery: {
        eyebrow: 'Galería',
        h2: 'Colores, aromas y pasillos',
        credit: 'Fotografías reales con licencia abierta. Autorías y licencias completas en “Créditos fotográficos”.',
        imgs: [
          { src: '/images/mercado-central-san-jose-especias.jpg', alt: 'Especias a la venta en el Mercado Central de San José' },
          { src: '/images/mercado-central-san-jose-verduleria.jpg', alt: 'Puesto de frutas y verduras en el Mercado Central de San José' },
          { src: '/images/mercado-central-san-jose-entrada-historica.jpg', alt: 'Entrada histórica del Mercado Central de San José' }
        ]
      },
      visita: {
        eyebrow: 'Planifique su visita',
        h2: 'Lo esencial antes de entrar',
        cards: [
          {
            h3: '🎟 Entrada / costos',
            p: 'No hay boleto de entrada. Lleve colones costarricenses para compras pequeñas; algunos locales pueden aceptar otros medios de pago, pero no conviene asumirlo para todos.'
          },
          {
            h3: '🕘 Mejor momento',
            p: 'La mañana entre semana permite apreciar el ritmo comercial. Si quiere comer en una soda tradicional, llegar antes del pico de almuerzo ayuda a tener una experiencia más tranquila.'
          },
          {
            h3: '🚗 Estacionamiento',
            p: 'Está en pleno centro urbano. Hay estacionamientos públicos de pago en el entorno, pero la oferta y disponibilidad cambian. Para una visita turística suele ser más sencillo llegar en transporte público, taxi o aplicación de movilidad.'
          }
        ]
      },
      comer: {
        eyebrow: 'Sabores del mercado',
        h2: 'Qué comer y beber alrededor de los pasillos',
        cards: [
          {
            h3: 'Sodas tradicionales',
            p: 'Busque menús caseros con casados, arroz con pollo, sopas y olla de carne. El mercado es especialmente valioso para probar cocina cotidiana, no sólo “platos turísticos”.'
          },
          {
            h3: 'Café y refrescos',
            p: 'Una taza de café costarricense o un fresco de fruta funciona bien como pausa entre pasillos. Pregunte por preparaciones del día y especialidades de cada puesto.'
          },
          {
            h3: 'Helado de sorbetera',
            p: 'Es uno de los sabores que el propio Ministerio de Cultura menciona al describir la tradición gastronómica vinculada al Mercado Central.'
          }
        ],
        note: 'Esta guía no recibe comisiones de restaurantes ni puestos. Las menciones son categorías de experiencia, no publicidad.'
      },
      historias: {
        eyebrow: 'Cultura viva',
        h2: 'Historias y saberes que habitan los pasillos',
        intro:
          'Más que un sitio para comprar, el Mercado Central es un espacio donde se transmiten oficios, recetas y modos de vida. La Municipalidad de San José y el Ministerio de Cultura y Juventud describen precisamente esa transmisión —de cocina, herbolaria, artesanía y formas de trato— como parte de su valor patrimonial.',
        cards: [
          {
            kind: 'Tradición gastronómica',
            h3: 'La soda y el casado del día',
            p: 'Dentro de los pasillos, las sodas preparan a la vista platos de la cocina cotidiana: casados, arroz con pollo, sopas y olla de carne. Son espacios donde la receta y el precio responden al público que trabaja en el centro, no a un menú pensado solo para turistas.'
          },
          {
            kind: 'Saberes tradicionales',
            h3: 'El pasillo de las hierbas',
            p: 'La venta de hierbas y plantas medicinales que el Ministerio de Cultura menciona al describir el mercado no es un adorno: conecta la ciudad con una herbolaria que llega del campo y de tradiciones familiares. Si no las conoce, pregunte por sus usos; la información no sustituye la consulta médica.'
          },
          {
            kind: 'Tradición',
            h3: 'El helado de sorbetera',
            p: 'El sorbete helado hecho en sorbetera es uno de los sabores que la propia entidad cultural destaca al hablar de la gastronomía ligada al mercado. Refrescos de frutas y helados de métodos tradicionales convierten un simple antojo en una experiencia que pasa de generación en generación.'
          },
          {
            kind: 'Historia',
            h3: 'Ocho años después: el terremoto de 1888',
            p: 'El mercado se fundó en 1880 y, apenas ocho años después, un terremoto dañó el edificio original. La reconstrucción se hizo por etapas y, con el tiempo, llegaron nuevos materiales y un lenguaje modernista; por eso hoy conviven en el conjunto distintas huellas arquitectónicas.'
          },
          {
            kind: 'Vida de barrio',
            h3: 'Del campo a la ciudad, cada mañana',
            p: 'Frutas, verduras, carnes, granos y especias llegan desde distintas regiones para abastecer los puestos del centro. Quien visita temprano entre semana puede asomarse a ese momento de descarga y acomodo, cuando el mercado «despierta» antes que el resto de la ciudad.'
          },
          {
            kind: 'Vida de barrio',
            h3: 'Puestos que atraviesan generaciones',
            p: 'No es raro encontrar comercios que han pasado de padres a hijos y conservan especialidades que apenas cambian: el mismo tipo de cuchillos, especias, dulces o artículos de cuero que ya se ofrecía décadas atrás. Detrás de cada puesto hay una historia familiar y un oficio que el mercado ayuda a preservar.'
          }
        ],
        note: 'Estas historias combinan información de fuentes oficiales (Municipalidad de San José y Ministerio de Cultura y Juventud) con observaciones generales sobre la vida del mercado. Las referencias son de tipo y nunca sustituyen una visita guiada por las propias personas del lugar.'
      },
      llegar: {
        eyebrow: 'Cómo llegar',
        h2: 'En el centro, entre avenidas y calles históricas',
        routes: [
          { h3: 'A pie', p: 'Desde Plaza de la Cultura o el Teatro Nacional, camine hacia el oeste por el centro peatonal. El mercado se encuentra en el distrito Merced, entre calles 6 y 8.' },
          { h3: 'Autobús', p: 'Numerosas rutas urbanas y terminales se concentran en el centro de San José. Como los recorridos cambian, confirme la parada más conveniente según su punto de origen el mismo día del viaje.' },
          { h3: 'Taxi / aplicación', p: 'Use “Mercado Central de San José” como destino y confirme la entrada donde desea bajar. En horas de alta circulación puede ser más rápido terminar el último tramo a pie.' },
          { h3: 'En automóvil', p: 'El centro tiene tráfico, calles de sentido único y estacionamiento limitado. Considere un parqueo público de pago y complete el trayecto caminando.' }
        ],
        address: 'Dirección de referencia: Avenida Central y Avenida 1, entre calles 6 y 8, Merced, San José. Plus Code: WWM9+R59.',
        phone: 'Teléfono de la ficha de Google: +506 2222 5981.',
        sourceIntro: 'Fuente oficial:',
        sourceMunicipality: 'Municipalidad de San José',
        sourceIct: 'Visit Costa Rica',
        mapTitle: 'Mapa del Mercado Central de San José'
      },
      servicios: {
        eyebrow: 'Servicios y comodidades',
        h2: 'Lo que puede necesitar alrededor del mercado',
        intro:
          'La visita se disfruta más sabiendo dónde encontrar lo básico. Esta sección describe los <strong>tipos de servicio</strong> disponibles dentro y en los alrededores del cuadrante, sin recomendar establecimientos concretos.',
        cards: [
          { h3: '🚻 Baños públicos', p: 'El mercado cuenta con servicios sanitarios en su interior, de uso compartido. Conviene llevar papel higiénico propio y dinero en efectivo de baja denominación, ya que algunos servicios pueden cobrar una pequeña tarifa de uso.' },
          { h3: '🅿️ Estacionamiento', p: 'Se encuentran varios parqueos públicos de pago en el cuadrante, con tarifa por hora o fracción, y los espacios libres en vía son escasos. Las calles del centro son estrechas y muchas de sentido único: deje tiempo para maniobrar o combine el automóvil con un corto trayecto a pie.' },
          { h3: '🍽️ Comida cerca del mercado', p: 'Sodas, restaurantes y cafeterías rodean el cuadrante, junto a los puestos de comida del propio edificio. Hay desde opciones rápidas hasta comedores de cocina costarricense; compruebe horarios, porque varios locales reducen su servicio al caer la tarde.' },
          { h3: '🛏️ Alojamiento', p: 'El centro de San José concentra hoteles, hostales y otras opciones de alojamiento a distancias caminables o en trayectos cortos de transporte. Si se hospeda fuera del centro, verifique el horario del transporte público para volver después de la visita.' },
          { h3: '🛒 Compras de conveniencia', p: 'Supermercados, pulperías, farmacias y cajeros automáticos se encuentran en las calles vecinas. El propio mercado sirve además de abastecedor de frutas, verduras, carnes, granos y especias, muy útil si cocina durante su estadía.' },
          { h3: '⛽ Combustible y carga', p: 'Dentro del cuadrante del mercado no hay estación de servicio, así que si viaja en automóvil conviene llegar con el tanque surtido. Para vehículos eléctricos, la oferta pública de carga en el centro es reducida: confirme puntos en su aplicación según la ruta.' }
        ],
        notice:
          'Nota editorial: este proyecto es una guía sin fines de lucro y no recibe comisiones de comercios. Las referencias describen tipos de servicio disponibles en el área; tarifas, horarios y disponibilidad cambian, por lo que conviene confirmarlos en el lugar antes de la visita.'
      },
      cerca: {
        eyebrow: 'A pocos minutos',
        h2: 'Otros lugares para sumar al paseo',
        cards: [
          { h3: 'Teatro Nacional de Costa Rica', p: 'Uno de los edificios culturales emblemáticos de la capital, junto a Plaza de la Cultura.' },
          { h3: 'Museos del Banco Central', p: 'El Museo del Oro Precolombino y otras colecciones están bajo Plaza de la Cultura.' },
          { h3: 'Catedral Metropolitana', p: 'Una parada sencilla para enlazar el mercado con el eje histórico de Parque Central y Avenida Central.' }
        ]
      },
      faq: {
        eyebrow: 'Preguntas frecuentes',
        h2: 'Antes de visitar'
      },
      fuentes: {
        eyebrow: 'Fuentes y asociación de entidad',
        h2: 'La guía se vincula con la entidad real, no con un nombre genérico',
        p: 'Para reforzar la asociación con el lugar físico se emplean el nombre completo, distrito Merced, dirección, coordenadas 9.934543 / -84.084579, enlaces institucionales y el identificador Wikidata Q7414518.',
        note: 'Nota sobre horarios: la ficha de Google facilitada para este proyecto indica 09:00–18:00, mientras que la Municipalidad de San José publica lunes–sábado 07:30–19:00 y domingo 08:00–18:00. Esta guía prioriza la fuente municipal y recomienda volver a comprobar feriados.',
        sourceLabels: { municipality: 'Municipalidad de San José — Mercado Central', culture: 'Ministerio de Cultura y Juventud — patrimonio del Mercado Central', ict: 'Instituto Costarricense de Turismo — Visit Costa Rica', wikidata: 'Wikidata — Q7414518' }
      }
    },
    legal: {
      privacidad: {
        eyebrow: 'Información legal',
        h1: 'Política de privacidad',
        updated: 'Última actualización: septiembre de 2026',
        sections: [
          { h: 'Información que recopilamos', p: 'Recopilamos únicamente los datos mínimos necesarios para operar y mejorar este sitio. Pueden incluir datos técnicos de navegación (como dirección IP, tipo de navegador y páginas visitadas), cookies y tecnologías similares, y cualquier información que usted decida proporcionar voluntariamente por correo electrónico.' },
          { h: 'Cómo utilizamos la información', p: 'La usamos para mejorar el contenido y la experiencia, analizar patrones generales de tráfico, responder solicitudes y cumplir obligaciones legales aplicables.' },
          { h: 'Google Analytics', p: 'Google Analytics 4 sólo se carga si usted activa las cookies analíticas. La medición configurada para este proyecto es G-HXM22WWPKP. Puede retirar su consentimiento desde la página de configuración de cookies.' },
          { h: 'Servicios de terceros', p: 'El sitio puede utilizar Google Maps para mostrar mapas y Google Analytics para medición consentida. Estos proveedores operan bajo sus propias políticas. Las fotografías editoriales se sirven desde este mismo sitio; los enlaces a Wikimedia Commons se conservan únicamente para atribución y licencia.' },
          { h: 'Sus derechos', p: 'Según la normativa aplicable, usted puede solicitar acceso, rectificación o eliminación de datos personales, oponerse a determinados tratamientos y presentar una reclamación ante la autoridad competente.' },
          { h: 'Retención y seguridad', p: 'No mantenemos cuentas de usuario ni una base de datos propia. Las preferencias de cookies se guardan localmente en su navegador. Aplicamos una política de minimización de datos y evitamos recopilar información que no sea necesaria.' },
          { h: 'Contacto', p: 'Cuando el proyecto disponga de un canal público de contacto, se publicará en esta página. No envíe información sensible mediante canales no verificados.' }
        ]
      },
      terminos: {
        eyebrow: 'Información legal',
        h1: 'Términos de servicio',
        updated: 'Última actualización: septiembre de 2026',
        sections: [
          { h: 'Uso del contenido', p: 'El contenido se ofrece únicamente con fines informativos. Somos una guía turística independiente y sin fines de lucro, sin afiliación con el Mercado Central, la Municipalidad de San José, el Gobierno de Costa Rica ni operadores comerciales.' },
          { h: 'Exactitud de la información', p: 'Procuramos contrastar la información con fuentes públicas, pero horarios, servicios, rutas, tarifas y condiciones pueden cambiar sin previo aviso. Verifique la información crítica en fuentes oficiales antes de viajar.' },
          { h: 'Propiedad intelectual', p: 'El diseño y el contenido original del sitio están protegidos por las normas aplicables. Las fotografías pertenecen a sus autores originales y se utilizan bajo licencias abiertas, con atribución en la página de créditos. Los datos y mapas de Google están sujetos a los términos de Google.' },
          { h: 'Limitación de responsabilidad', p: 'El sitio se proporciona “tal cual”, sin garantías. No asumimos responsabilidad por pérdidas derivadas de decisiones de viaje basadas exclusivamente en esta guía.' },
          { h: 'Enlaces externos', p: 'Los enlaces a entidades públicas, mapas y fuentes documentales se proporcionan para facilitar la comprobación. No controlamos sus contenidos ni disponibilidad.' }
        ]
      },
      cookies: {
        eyebrow: 'Privacidad',
        h1: 'Configuración de cookies',
        updated: 'Última actualización: septiembre de 2026',
        intro: 'Utilizamos cookies y almacenamiento local para funciones esenciales y, sólo con su permiso, para analítica.',
        rows: [
          { key: 'necessary', always: true, title: 'Cookies necesarias', desc: 'Son esenciales para guardar las preferencias del sitio. No se pueden desactivar desde este panel.' },
          { key: 'analytics', always: false, title: 'Google Analytics', desc: 'Recopila información de uso para ayudarnos a comprender el tráfico del sitio. No se carga hasta que usted lo permite.' },
          { key: 'preferences', always: false, title: 'Preferencias', desc: 'Guarda opciones locales del sitio en su navegador.' },
          { key: 'marketing', always: true, title: 'Marketing / publicidad personalizada', desc: 'Este proyecto no instala cookies propias de marketing ni activa publicidad personalizada.' }
        ],
        saveLabel: 'Guardar preferencias',
        rejectLabel: 'Rechazar opcionales',
        savedMsg: 'Preferencias guardadas.',
        rejectedMsg: 'Se rechazaron las cookies opcionales.'
      },
      creditos: {
        eyebrow: 'Transparencia',
        h1: 'Créditos fotográficos',
        intro:
          'Las fotografías editoriales son imágenes reales del Mercado Central de San José. Los archivos se sirven localmente desde <code>public/images/</code>; los enlaces siguientes son sólo páginas de procedencia y licencia.',
        items: [
          { strong: 'Fachada, 2024', rest: ' — Pequeño mar — CC BY-SA 4.0 — Wikimedia Commons.' },
          { strong: 'Pasillo interior', rest: ' — Eric T Gunther — CC BY-SA 3.0 — Wikimedia Commons.' },
          { strong: 'Especias', rest: ' — Eric T Gunther — CC BY-SA 3.0 — Wikimedia Commons.' },
          { strong: 'Verdulería', rest: ' — Aleat88 — CC BY-SA 4.0 — Wikimedia Commons.' },
          { strong: 'Entrada histórica', rest: ' — Puroticorico — CC BY 2.0 — Wikimedia Commons.' },
          { strong: 'Condimentos', rest: ' — Aleat88 — CC BY-SA 4.0 — Wikimedia Commons.' }
        ],
        note:
          'Los derechos de autor permanecen con sus respectivos titulares. El uso de las imágenes no implica patrocinio, relación institucional ni aval de los fotógrafos o de Wikimedia Commons.'
      },
      notFound: {
        eyebrow: '404',
        h1: 'Página no encontrada',
        p: 'La dirección solicitada no existe o cambió.',
        backLabel: 'Volver a la guía'
      }
    }
  },
  en: {
    htmlLang: 'en-CR',
    ogLocale: 'en_US',
    siteName: 'Guide to the Central Market of San José',
    nav: {
      historia: 'History',
      historias: 'Traditions',
      visita: 'Plan',
      comer: 'Where to eat',
      servicios: 'Services',
      llegar: 'Getting here',
      faq: 'FAQ'
    },
    langSwitch: { to: 'ES', label: 'Español' },
    footer: {
      disclaimer1:
        'This site is an independent, non-profit visitor information project; it has no affiliation with the Municipality of San José, the Costa Rican Tourism Institute, or any official organization.',
      disclaimer2:
        'Site information is cross-checked against public sources from the Municipality of San José, the Costa Rican Ministry of Culture and Youth, and the Costa Rican Tourism Institute. It contains no paid commercial recommendations.',
      imageRightsPrefix:
        'Image rights: photographs belong to their original authors and are used under the licenses indicated on the ',
      imageRightsPage: 'photo credits',
      imageRightsSuffix: ' page.',
      legalLinks: { privacidad: 'Privacy', terminos: 'Terms', cookies: 'Cookie settings' },
      copyright: '© 2026 Guide to the Central Market of San José. All rights reserved on the original design and content.',
      nonofficial: 'Unofficial guide. Verify schedules and conditions with official sources before traveling.'
    },
    cookieAlways: 'Always on',
    cookieOn: 'Enabled',
    cookieOff: 'Disabled',
    home: {
      hero: {
        eyebrow: 'San José · Costa Rica',
        h1a: 'Central Market',
        h1b: 'of San José',
        subtitle:
          'A living labyrinth of aisles, sodas, coffee, herbs, fruit, fish stalls and traditional trades in the heart of the Costa Rican capital.',
        pills: ['Founded in 1880', 'Cultural heritage', '★ 4.4 · 31,375 reviews']
      },
      marketStrip:
        'COFFEE · CASADOS · OLLA DE CARNE · SPICES · HERBS · LEATHER · HANDICRAFTS · SORBET · NEIGHBORHOOD LIFE',
      facts: [
        { eyebrow: 'Entry', b: 'Free', muted: 'Purchases are paid separately' },
        { eyebrow: 'Municipal hours', b: 'Mon–Sat 7:30–19:00', muted: 'Sunday 8:00–18:00' },
        { eyebrow: 'Suggested visit', b: '1½–2 hours', muted: 'To walk around and eat' },
        { eyebrow: 'Location', b: 'Merced', muted: 'Downtown San José' }
      ],
      historia: {
        eyebrow: 'Everyday heritage',
        h2: 'A market that also tells the story of San José',
        ps: [
          'The Municipality of San José identifies the Central Market as the city’s largest market and notes that it was founded in 1880. Its importance goes beyond commerce: the Ministry of Culture and Youth describes it as a space for passing on cooking, herbalism, handicrafts, ways of relating and other expressions of Costa Rican popular culture.',
          'The current complex preserves traces of several architectural stages. An earthquake damaged the original building in 1888 and, decades later, sections were rebuilt with new materials and a modernist language.',
          'Its history is intertwined with that of the capital: as San José consolidated as the country’s political and commercial center, the market became the point where the countryside delivers its products to the city. That “bridge” function between rural and urban life is still read in the variety of stalls, in the sodas’ recipes and in the trades kept alive along the aisles.'
        ],
        quote: 'Here the visit is not about “seeing” a monument: it is about entering a city within the city.',
        sourceLabel: 'Municipal source ↗',
        imgAlt: 'Interior aisle of the Central Market of San José'
      },
      gallery: {
        eyebrow: 'Gallery',
        h2: 'Colors, aromas and aisles',
        credit: 'Real photographs under open licenses. Full authorship and licenses on the “Photo credits” page.',
        imgs: [
          { src: '/images/mercado-central-san-jose-especias.jpg', alt: 'Spices for sale at the Central Market of San José' },
          { src: '/images/mercado-central-san-jose-verduleria.jpg', alt: 'Fruit and vegetable stall at the Central Market of San José' },
          { src: '/images/mercado-central-san-jose-entrada-historica.jpg', alt: 'Historic entrance of the Central Market of San José' }
        ]
      },
      visita: {
        eyebrow: 'Plan your visit',
        h2: 'The essentials before you go in',
        cards: [
          {
            h3: '🎟 Entry / costs',
            p: 'There is no admission ticket. Bring Costa Rican colones for small purchases; some stalls may accept other payment methods, but it is best not to assume this for all of them.'
          },
          {
            h3: '🕘 Best time',
            p: 'A weekday morning lets you appreciate the commercial rhythm. If you want to eat at a traditional soda, arriving before the lunch peak helps keep the experience calmer.'
          },
          {
            h3: '🚗 Parking',
            p: 'It sits in the heart of the urban center. There are paid public lots nearby, but supply and availability vary. For a tourist visit it is usually simpler to arrive by public transport, taxi or a ride app.'
          }
        ]
      },
      comer: {
        eyebrow: 'Market flavors',
        h2: 'What to eat and drink around the aisles',
        cards: [
          {
            h3: 'Traditional sodas',
            p: 'Look for home-style menus with casados, arroz con pollo, soups and olla de carne. The market is especially valuable for tasting everyday cooking, not only “tourist dishes”.'
          },
          {
            h3: 'Coffee and refrescos',
            p: 'A cup of Costa Rican coffee or a fruit fresco works well as a pause between aisles. Ask about the day’s preparations and each stall’s specialties.'
          },
          {
            h3: 'Sorbet ice cream',
            p: 'It is one of the flavors the Ministry of Culture itself mentions when describing the food tradition linked to the Central Market.'
          }
        ],
        note: 'This guide receives no commissions from restaurants or stalls. The mentions are categories of experience, not advertising.'
      },
      historias: {
        eyebrow: 'Living culture',
        h2: 'Stories and know-how that live in the aisles',
        intro:
          'More than a place to shop, the Central Market is a space where trades, recipes and ways of life are passed on. The Municipality of San José and the Ministry of Culture and Youth describe precisely that transmission — of cooking, herbalism, handicrafts and forms of relating — as part of its heritage value.',
        cards: [
          {
            kind: 'Food tradition',
            h3: 'The soda and the casado of the day',
            p: 'Inside the aisles, the sodas prepare everyday home cooking in plain sight: casados, arroz con pollo, soups and olla de carne. They are spaces where the recipe and price respond to the public that works downtown, not to a menu thought only for tourists.'
          },
          {
            kind: 'Traditional know-how',
            h3: 'The herb aisle',
            p: 'The sale of herbs and medicinal plants that the Ministry of Culture mentions when describing the market is not decoration: it connects the city with a herbal tradition that arrives from the countryside and from family traditions. If you do not know them, ask about their uses; this information does not replace medical advice.'
          },
          {
            kind: 'Tradition',
            h3: 'The sorbet ice cream',
            p: 'Hand-churned sorbet is one of the flavors the cultural entity itself highlights when speaking of the food linked to the market. Fruit refrescos and ice cream made by traditional methods turn a simple craving into an experience passed from generation to generation.'
          },
          {
            kind: 'History',
            h3: 'Eight years later: the 1888 earthquake',
            p: 'The market was founded in 1880 and, just eight years later, an earthquake damaged the original building. Reconstruction happened in stages and, over time, new materials and a modernist language arrived; that is why different architectural traces coexist in the complex today.'
          },
          {
            kind: 'Neighborhood life',
            h3: 'From the countryside to the city, every morning',
            p: 'Fruit, vegetables, meat, grains and spices arrive from different regions to supply the downtown stalls. Whoever visits early on a weekday can peek into that moment of unloading and arranging, when the market “wakes up” before the rest of the city.'
          },
          {
            kind: 'Neighborhood life',
            h3: 'Stalls that span generations',
            p: 'It is not unusual to find businesses passed from parents to children that keep specialties that barely change: the same kind of knives, spices, sweets or leather goods offered decades ago. Behind each stall there is a family story and a trade the market helps preserve.'
          }
        ],
        note: 'These stories combine information from official sources (Municipality of San José and Ministry of Culture and Youth) with general observations about market life. The references are of a type and never replace a guided visit by the people of the place themselves.'
      },
      llegar: {
        eyebrow: 'Getting here',
        h2: 'Downtown, between avenues and historic streets',
        routes: [
          { h3: 'On foot', p: 'From Plaza de la Cultura or the National Theater, walk west through the pedestrian center. The market is in the Merced district, between 6th and 8th streets.' },
          { h3: 'Bus', p: 'Numerous urban routes and terminals concentrate in downtown San José. Since routes change, confirm the most convenient stop according to your starting point on the day of the trip.' },
          { h3: 'Taxi / app', p: 'Use “Mercado Central de San José” as the destination and confirm the entrance where you want to get off. At peak traffic it may be faster to finish the last stretch on foot.' },
          { h3: 'By car', p: 'Downtown has traffic, one-way streets and limited parking. Consider a paid public lot and complete the trip on foot.' }
        ],
        address: 'Reference address: Avenida Central and Avenida 1, between 6th and 8th streets, Merced, San José. Plus Code: WWM9+R59.',
        phone: 'Google listing phone: +506 2222 5981.',
        sourceIntro: 'Official source:',
        sourceMunicipality: 'Municipality of San José',
        sourceIct: 'Visit Costa Rica',
        mapTitle: 'Map of the Central Market of San José'
      },
      servicios: {
        eyebrow: 'Services and amenities',
        h2: 'What you may need around the market',
        intro:
          'The visit is more enjoyable when you know where to find the basics. This section describes the <strong>types of service</strong> available inside and around the block, without recommending specific establishments.',
        cards: [
          { h3: '🚻 Public restrooms', p: 'The market has shared sanitary facilities inside. Bring your own toilet paper and low-denomination cash, as some services may charge a small usage fee.' },
          { h3: '🅿️ Parking', p: 'Several paid public lots are found around the block, with hourly or fractional rates, and free on-street spaces are scarce. Downtown streets are narrow and many are one-way: leave time to maneuver or combine the car with a short walk.' },
          { h3: '🍽️ Food near the market', p: 'Sodas, restaurants and cafeterias surround the block, alongside the food stalls of the building itself. There are quick options and Costa Rican cooking eateries; check hours, as several reduce service in the late afternoon.' },
          { h3: '🛏️ Lodging', p: 'Downtown San José concentrates hotels, hostels and other lodging options at walkable distances or short transit rides. If you stay outside downtown, check the public transport schedule to return after the visit.' },
          { h3: '🛒 Convenience shopping', p: 'Supermarkets, pulperías, pharmacies and ATMs are on the neighboring streets. The market itself also supplies fruit, vegetables, meat, grains and spices, very useful if you cook during your stay.' },
          { h3: '⛽ Fuel and charging', p: 'There is no gas station within the market block, so if you travel by car it is best to arrive with a full tank. For electric vehicles, public charging in downtown is limited: confirm points in your app according to the route.' }
        ],
        notice:
          'Editorial note: this is a non-profit guide and receives no commissions from businesses. The references describe types of service available in the area; rates, hours and availability change, so it is best to confirm them on site before the visit.'
      },
      cerca: {
        eyebrow: 'A few minutes away',
        h2: 'Other places to add to the outing',
        cards: [
          { h3: 'National Theater of Costa Rica', p: 'One of the capital’s emblematic cultural buildings, next to Plaza de la Cultura.' },
          { h3: 'Central Bank Museums', p: 'The Pre-Columbian Gold Museum and other collections are beneath Plaza de la Cultura.' },
          { h3: 'Metropolitan Cathedral', p: 'A simple stop to link the market with the historic axis of Parque Central and Avenida Central.' }
        ]
      },
      faq: {
        eyebrow: 'Frequently asked questions',
        h2: 'Before you visit'
      },
      fuentes: {
        eyebrow: 'Sources and entity association',
        h2: 'The guide links to the real entity, not a generic name',
        p: 'To reinforce the association with the physical place, the full name, Merced district, address, coordinates 9.934543 / -84.084579, institutional links and Wikidata identifier Q7414518 are used.',
        note: 'Note on hours: the Google listing provided for this project indicates 09:00–18:00, while the Municipality of San José publishes Monday–Saturday 07:30–19:00 and Sunday 08:00–18:00. This guide prioritizes the municipal source and recommends re-checking on holidays.',
        sourceLabels: { municipality: 'Municipality of San José — Central Market', culture: 'Ministry of Culture and Youth — Central Market heritage', ict: 'Costa Rican Tourism Institute — Visit Costa Rica', wikidata: 'Wikidata — Q7414518' }
      }
    },
    legal: {
      privacidad: {
        eyebrow: 'Legal information',
        h1: 'Privacy policy',
        updated: 'Last updated: September 2026',
        sections: [
          { h: 'Information we collect', p: 'We collect only the minimum data necessary to operate and improve this site. It may include technical browsing data (such as IP address, browser type and pages visited), cookies and similar technologies, and any information you voluntarily provide by email.' },
          { h: 'How we use the information', p: 'We use it to improve content and experience, analyze general traffic patterns, respond to requests and comply with applicable legal obligations.' },
          { h: 'Google Analytics', p: 'Google Analytics 4 loads only if you enable analytics cookies. The measurement configured for this project is G-HXM22WWPKP. You can withdraw consent from the cookie settings page.' },
          { h: 'Third-party services', p: 'The site may use Google Maps to display maps and Google Analytics for consented measurement. These providers operate under their own policies. Editorial photographs are served from this site; links to Wikimedia Commons are kept only for attribution and licensing.' },
          { h: 'Your rights', p: 'Under applicable law, you may request access, rectification or deletion of personal data, object to certain processing and file a complaint with the competent authority.' },
          { h: 'Retention and security', p: 'We keep no user accounts or own database. Cookie preferences are stored locally in your browser. We apply a data-minimization policy and avoid collecting unnecessary information.' },
          { h: 'Contact', p: 'When the project has a public contact channel, it will be published on this page. Do not send sensitive information through unverified channels.' }
        ]
      },
      terminos: {
        eyebrow: 'Legal information',
        h1: 'Terms of service',
        updated: 'Last updated: September 2026',
        sections: [
          { h: 'Use of content', p: 'The content is offered for informational purposes only. We are an independent, non-profit travel guide, with no affiliation to the Central Market, the Municipality of San José, the Government of Costa Rica or commercial operators.' },
          { h: 'Accuracy of information', p: 'We strive to cross-check information with public sources, but hours, services, routes, rates and conditions may change without notice. Verify critical information with official sources before traveling.' },
          { h: 'Intellectual property', p: 'The design and original content of the site are protected by applicable rules. Photographs belong to their original authors and are used under open licenses, with attribution on the credits page. Google data and maps are subject to Google’s terms.' },
          { h: 'Limitation of liability', p: 'The site is provided “as is”, without warranties. We are not liable for losses arising from travel decisions based solely on this guide.' },
          { h: 'External links', p: 'Links to public entities, maps and documentary sources are provided to facilitate verification. We do not control their content or availability.' }
        ]
      },
      cookies: {
        eyebrow: 'Privacy',
        h1: 'Cookie settings',
        updated: 'Last updated: September 2026',
        intro: 'We use cookies and local storage for essential functions and, only with your permission, for analytics.',
        rows: [
          { key: 'necessary', always: true, title: 'Necessary cookies', desc: 'They are essential to save site preferences. They cannot be disabled from this panel.' },
          { key: 'analytics', always: false, title: 'Google Analytics', desc: 'Collects usage information to help us understand site traffic. It does not load until you allow it.' },
          { key: 'preferences', always: false, title: 'Preferences', desc: 'Saves local site options in your browser.' },
          { key: 'marketing', always: true, title: 'Marketing / personalized advertising', desc: 'This project installs no own marketing cookies nor enables personalized advertising.' }
        ],
        saveLabel: 'Save preferences',
        rejectLabel: 'Reject optional',
        savedMsg: 'Preferences saved.',
        rejectedMsg: 'Optional cookies rejected.'
      },
      creditos: {
        eyebrow: 'Transparency',
        h1: 'Photo credits',
        intro:
          'The editorial photographs are real images of the Central Market of San José. The files are served locally from <code>public/images/</code>; the following links are only source and license pages.',
        items: [
          { strong: 'Facade, 2024', rest: ' — Pequeño mar — CC BY-SA 4.0 — Wikimedia Commons.' },
          { strong: 'Interior aisle', rest: ' — Eric T Gunther — CC BY-SA 3.0 — Wikimedia Commons.' },
          { strong: 'Spices', rest: ' — Eric T Gunther — CC BY-SA 3.0 — Wikimedia Commons.' },
          { strong: 'Produce stall', rest: ' — Aleat88 — CC BY-SA 4.0 — Wikimedia Commons.' },
          { strong: 'Historic entrance', rest: ' — Puroticorico — CC BY 2.0 — Wikimedia Commons.' },
          { strong: 'Condiments', rest: ' — Aleat88 — CC BY-SA 4.0 — Wikimedia Commons.' }
        ],
        note:
          'Copyright remains with their respective holders. The use of the images does not imply sponsorship, institutional relationship or endorsement by the photographers or Wikimedia Commons.'
      },
      notFound: {
        eyebrow: '404',
        h1: 'Page not found',
        p: 'The requested address does not exist or changed.',
        backLabel: 'Back to the guide'
      }
    }
  }
} as const;

export function t(locale: Locale) {
  return ui[locale];
}

// FAQ entries per locale (drive both the visible FAQ and the FAQPage JSON-LD).
export function faqItems(locale: Locale): [string, string][] {
  if (locale === 'en') {
    return [
      ['Is there an entry fee to the Central Market?', 'No. Entry to the market is free; each purchase, meal or service is paid directly at the corresponding stall.'],
      ['How much time is worth spending?', 'For a first visit, between 1½ and 2 hours lets you walk without rush, have coffee and try traditional food.'],
      ['What is the best time to go?', 'A weekday morning is usually a good option to observe the commercial activity. Lunch periods and Saturdays can feel more crowded.'],
      ['Is the market accessible?', 'The Municipality of San José indicates that the Central Market has accessible facilities for people with reduced mobility.'],
      ['What can you buy?', 'There are fresh products, meat and fish, coffee, spices, herbs, leather goods, souvenirs, handicrafts and other traditional products.'],
      ['Can the hours change?', 'Yes. Holidays, celebrations and operational decisions can alter the schedule. It is worth checking the municipal information before an important visit.'],
      ['Are there public restrooms in the market?', 'The market has shared sanitary facilities inside. It is good to bring your own toilet paper and low-denomination cash in case a service charges a small usage fee.'],
      ['Are there food and lodging options nearby?', 'Around the market there are sodas, restaurants, cafeterias and food stalls, as well as hotels, hostels and lodgings of different categories in downtown San José. This guide recommends no specific establishments; check reviews and verify conditions before choosing.'],
      ['Is the Central Market open today?', 'The Central Market of San José opens Monday to Saturday 7:30–19:00 and Sundays 8:00–18:00 (Costa Rica time). If it is within those hours, it is open; exceptions may apply on holidays. The status indicator at the top of this page shows the live state according to Costa Rica local time.'],
      ['What are the hours of the Central Market of San José?', 'According to the Municipality of San José: Monday to Saturday 7:30–19:00, and Sunday 8:00–18:00. Stalls and sodas may close earlier, especially in the late afternoon, so it is best to arrive with margin.'],
      ['Is the Central Market open on Sundays and holidays?', 'Yes, it opens Sundays 8:00–18:00. On holidays the schedule may be reduced or suspended by operational decisions; it is worth confirming with the municipal source before an important visit.'],
      ['Does the Central Market close any day?', 'It has no fixed weekly closure day: it serves both Monday to Saturday and Sundays. It may close on some national holidays, so for marked dates it is recommended to verify the municipal schedule.']
    ];
  }
  return [
    ['¿Se paga entrada al Mercado Central?', 'No. El acceso al mercado es gratuito; cada compra, comida o servicio se paga directamente en el respectivo local.'],
    ['¿Cuánto tiempo conviene dedicarle?', 'Para una primera visita, entre 1½ y 2 horas permite caminar sin prisa, tomar café y probar comida tradicional.'],
    ['¿Cuál es el mejor momento para ir?', 'La mañana entre semana suele ser una buena opción para observar la actividad comercial. Los periodos de almuerzo y los sábados pueden sentirse más concurridos.'],
    ['¿El mercado es accesible?', 'La Municipalidad de San José indica que el Mercado Central cuenta con instalaciones accesibles para personas con movilidad reducida.'],
    ['¿Qué se puede comprar?', 'Hay productos frescos, carnes y pescados, café, especias, hierbas, artículos de cuero, recuerdos, artesanías y otros productos tradicionales.'],
    ['¿Los horarios pueden cambiar?', 'Sí. Feriados, celebraciones y decisiones operativas pueden alterar el horario. Conviene comprobar la información municipal antes de una visita importante.'],
    ['¿Hay baños públicos en el mercado?', 'El mercado cuenta con servicios sanitarios en su interior, de uso compartido. Para la visita conviene llevar papel higiénico propio y dinero en efectivo de baja denominación por si algún servicio cobra una pequeña tarifa de uso.'],
    ['¿Hay opciones de comida y alojamiento cerca?', 'Alrededor del mercado conviven sodas, restaurantes, cafeterías y puestos de comida, así como hoteles, hostales y alojamientos de distintas categorías en el centro de San José. Esta guía no recomienda establecimientos concretos; consulte reseñas y verifique las condiciones antes de elegir.'],
    ['¿El Mercado Central está abierto hoy?', 'El Mercado Central de San José abre lunes a sábado de 7:30 a 19:00 y los domingos de 8:00 a 18:00 (hora de Costa Rica). Si está dentro de ese horario, está abierto; pueden aplicar excepciones en feriados. El indicador superior de esta página muestra el estado en vivo según la hora local de Costa Rica.'],
    ['¿Cuáles son los horarios del Mercado Central de San José?', 'Según la Municipalidad de San José: lunes a sábado de 7:30 a 19:00, y domingo de 8:00 a 18:00. Los puestos y sodas pueden cerrar antes, especialmente al caer la tarde, por lo que conviene llegar con margen.'],
    ['¿El Mercado Central abre los domingos y feriados?', 'Sí, abre los domingos de 8:00 a 18:00. En feriados el horario puede reducirse o suspenderse por decisiones operativas; conviene comprobarlo con la fuente municipal antes de una visita importante.'],
    ['¿El Mercado Central cierra algún día?', 'No tiene un día de cierre semanal fijo: atiende tanto de lunes a sábado como los domingos. Sí puede cerrar en algunos feriados nacionales, por lo que para fechas señaladas se recomienda verificar el horario municipal.']
  ];
}

export type { Dict };
