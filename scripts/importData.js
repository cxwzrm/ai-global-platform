/**
 * Sanity Data Importer - Direct API Version
 * Run: node scripts/importData.js
 */

const https = require('https')

const PROJECT_ID = 't8o1zoqj'
const TOKEN = 'sklEXEOrg6NEHJAxlkGjTraa9zGXD8fZAukkFMMCTfgOZen4MP22vfe0J02tTy2j7D7WBA4VTk1YXvHIdazdtehkt36xJ8gY6cssqD9DhoWxOSamiVwjB4dEkXjMrRp8hWXTWxcAGNEljU9RcRmu30UhXYentAYhpays7cvat1rOEfY9VlHi'

function request(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : null
    const options = {
      hostname: `${PROJECT_ID}.api.sanity.io`,
      port: 443,
      path: `/v2024-01-01${path}`,
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      }
    }
    
    if (postData) {
      options.headers['Content-Length'] = Buffer.byteLength(postData)
    }

    const req = https.request(options, (res) => {
      let body = ''
      res.on('data', chunk => body += chunk)
      res.on('end', () => {
        try {
          resolve(JSON.parse(body))
        } catch {
          resolve(body)
        }
      })
    })
    
    req.on('error', reject)
    req.on('timeout', () => reject(new Error('Request timeout')))
    
    if (postData) {
      req.write(postData)
    }
    req.end()
  })
}

// All data to import
const categories = [
  {
    _id: 'category-laser-cutting',
    _type: 'category',
    title: { en: 'Laser Cutting Machines', de: 'Laser-Schneidemaschinen', es: 'Máquinas de Corte Láser', fr: 'Machines de Découpe Laser', it: 'Macchine per Taglio Laser', nl: 'Laser snijmachines' },
    slug: { current: 'laser-cutting-machines' },
    description: { en: 'High-power fiber laser cutting machines for metal processing', de: 'Hochleistungs-Faserlaser-Schneidemaschinen', es: 'Máquinas de corte láser de alta potencia', fr: 'Machines de découpe laser haute puissance', it: 'Macchine per taglio laser ad alta potenza', nl: 'High-power fiber laser snijmachines' },
    order: 1
  },
  {
    _id: 'category-laser-welding',
    _type: 'category',
    title: { en: 'Laser Welding Machines', de: 'Laser-Schweißmaschinen', es: 'Máquinas de Soldadura Láser', fr: 'Machines de Soudage Laser', it: 'Macchine per Saldatura Laser', nl: 'Laser lasmachines' },
    slug: { current: 'laser-welding-machines' },
    description: { en: 'Precision laser welding machines for various materials', de: 'Präzisions-Laserschweißmaschinen', es: 'Máquinas de soldadura láser de precisión', fr: 'Machines de soudage laser de précision', it: 'Macchine per saldatura laser di precisione', nl: 'Precisie laser lasmachines' },
    order: 2
  },
  {
    _id: 'category-accessories',
    _type: 'category',
    title: { en: 'Accessories & Parts', de: 'Zubehör & Teile', es: 'Accesorios y Piezas', fr: 'Accessoires et Pièces', it: 'Accessori e Ricambi', nl: 'Accessoires & Onderdelen' },
    slug: { current: 'accessories' },
    description: { en: 'Premium optics and accessories for laser systems', de: 'Premium-Optiken und Zubehör', es: 'Ópticas y accesorios premium', fr: 'Optiques et accessoires premium', it: 'Ottiche premium e accessori', nl: 'Premium optiek en accessoires' },
    order: 3
  }
]

const products = [
  {
    _id: 'product-lc500',
    _type: 'product',
    name: { en: 'AII-LC500 Fiber Laser Cutting Machine', de: 'AII-LC500 Faserlaser-Schneidemaschine', es: 'AII-LC500 Máquina de Corte Láser', fr: 'AII-LC500 Machine de Découpe Laser', it: 'AII-LC500 Macchina per Taglio Laser', nl: 'AII-LC500 Fiber Laser Snijmachine' },
    slug: { current: 'aii-lc500-fiber-laser-cutter' },
    category: { _type: 'reference', _ref: 'category-laser-cutting' },
    description: { en: 'High-performance fiber laser cutting machine with 1000W-3000W power. AI-powered auto-focusing, cloud connectivity for smart factory integration.', de: 'Hochleistungs-Faserlaser-Schneidemaschine mit 1000W-3000W Leistung.', es: 'Máquina de corte láser de fibra de alto rendimiento con 1000W-3000W.', fr: 'Machine de découpe laser à fibre haute performance avec 1000W-3000W.', it: 'Macchina per taglio laser a fibra ad alte prestazioni con 1000W-3000W.', nl: 'High-performance fiber laser snijmachine met 1000W-3000W vermogen.' },
    specifications: { power: '1000W - 3000W', cuttingArea: '1500x3000mm', precision: '±0.03mm', maxSpeed: '140m/min' },
    price: 85000,
    featured: true
  },
  {
    _id: 'product-lc700',
    _type: 'product',
    name: { en: 'AII-LC700 Sheet Metal Laser Cutter', de: 'AII-LC700 Blech-Laser-Schneider', es: 'AII-LC700 Cortadora Láser de Chapa', fr: 'AII-LC700 Découpeur Laser de Tôle', it: 'AII-LC700 Tagliatore Laser per Lamiere', nl: 'AII-LC700 Plaatmetaal Laser Snijder' },
    slug: { current: 'aii-lc700-sheet-metal-laser' },
    category: { _type: 'reference', _ref: 'category-laser-cutting' },
    description: { en: 'Large-format sheet metal processing up to 3000x6000mm. Automatic loading/unloading system. Perfect for automotive and aerospace.', de: 'Großformatige Blechbearbeitung bis 3000x6000mm.', es: 'Procesamiento de chapas metálicas hasta 3000x6000mm.', fr: 'Traitement de tôles jusqu\'à 3000x6000mm.', it: 'Lavorazione di lamiere fino a 3000x6000mm.', nl: 'Grote plaatmetaalbewerking tot 3000x6000mm.' },
    specifications: { power: '2000W - 6000W', cuttingArea: '3000x6000mm', precision: '±0.02mm', maxSpeed: '120m/min' },
    price: 145000,
    featured: true
  },
  {
    _id: 'product-lc900',
    _type: 'product',
    name: { en: 'AII-LC900 Tube Laser Cutting System', de: 'AII-LC900 Rohr-Laser-Schneidesystem', es: 'AII-LC900 Sistema de Corte Láser de Tubos', fr: 'AII-LC900 Système de Découpe Laser de Tubes', it: 'AII-LC900 Sistema di Taglio Laser per Tubi', nl: 'AII-LC900 Buis Laser Snijsysteem' },
    slug: { current: 'aii-lc900-tube-laser' },
    category: { _type: 'reference', _ref: 'category-laser-cutting' },
    description: { en: 'Specialized tube and profile laser cutting with automatic feeding. Handles tubes up to 200mm diameter. Essential for furniture and automotive.', de: 'Spezialisiertes Rohr-Laser-Schneidsystem bis 200mm Durchmesser.', es: 'Sistema de corte láser de tubos hasta 200mm de diámetro.', fr: 'Système de découpe laser de tubes jusqu\'à 200mm.', it: 'Sistema di taglio laser per tubi fino a 200mm.', nl: 'Gespecialiseerd buis laser snijsysteem tot 200mm diameter.' },
    specifications: { power: '1500W - 3000W', cuttingArea: 'Tube diameter 20-200mm', precision: '±0.05mm', maxSpeed: '80m/min' },
    price: 95000,
    featured: false
  },
  {
    _id: 'product-lw300',
    _type: 'product',
    name: { en: 'AII-LW300 Precision Laser Welder', de: 'AII-LW300 Präzisions-Laserschweißgerät', es: 'AII-LW300 Soldadora Láser de Precisión', fr: 'AII-LW300 Soudage Laser de Précision', it: 'AII-LW300 Saldatrice Laser di Precisione', nl: 'AII-LW300 Precisie Laser Lasser' },
    slug: { current: 'aii-lw300-precision-laser-welder' },
    category: { _type: 'reference', _ref: 'category-laser-welding' },
    description: { en: 'Versatile precision laser welding for delicate metal joining. Perfect for jewelry, medical devices, and micro-scale manufacturing.', de: 'Vielseitiges Präzisions-Laserschweißsystem für delikate Metallverbindungen.', es: 'Sistema de soldadura láser de precisión para unión delicada.', fr: 'Système de soudage laser de précision pour assemblages délicats.', it: 'Sistema di saldatura laser di precisione per giunzioni delicate.', nl: 'Veelzijdig precisie laser las systeem voor delicate metaalverbindingen.' },
    specifications: { power: '300W - 500W', cuttingArea: '300x300x150mm', precision: '±0.01mm', maxSpeed: '10mm/s' },
    price: 35000,
    featured: true
  },
  {
    _id: 'product-lw500',
    _type: 'product',
    name: { en: 'AII-LW500 Automated Laser Welding Cell', de: 'AII-LW500 Automatisierte Laserschweißzelle', es: 'AII-LW500 Celda de Soldadura Láser Automatizada', fr: 'AII-LW500 Cellule de Soudage Laser Automatisée', it: 'AII-LW500 Cella di Saldatura Laser Automatizzata', nl: 'AII-LW500 Geautomatiseerde Laser Las Cel' },
    slug: { current: 'aii-lw500-automated-welding-cell' },
    category: { _type: 'reference', _ref: 'category-laser-welding' },
    description: { en: 'Complete automated laser welding cell with 6-axis robotic arm and vision system. Ideal for automotive and battery manufacturing.', de: 'Komplette automatisierte Laserschweißzelle mit 6-Achs-Roboter.', es: 'Celda de soldadura láser automatizada con brazo robótico de 6 ejes.', fr: 'Cellule de soudage laser automatisée avec bras robotisé 6 axes.', it: 'Cella di saldatura laser automatizzata con braccio robotico a 6 assi.', nl: 'Complete geautomatiseerde laser las cel met 6-assige robotarm.' },
    specifications: { power: '1000W - 2000W', cuttingArea: '2000x2000x1000mm', precision: '±0.05mm', maxSpeed: '50mm/s' },
    price: 180000,
    featured: true
  },
  {
    _id: 'product-lw700',
    _type: 'product',
    name: { en: 'AII-LW700 Handheld Laser Welder', de: 'AII-LW700 Handgeführtes Laserschweißgerät', es: 'AII-LW700 Soldadora Láser de Mano', fr: 'AII-LW700 Soudage Laser à Main', it: 'AII-LW700 Saldataore Laser Manuale', nl: 'AII-LW700 Handmatige Laser Lasser' },
    slug: { current: 'aii-lw700-handheld-laser-welder' },
    category: { _type: 'reference', _ref: 'category-laser-welding' },
    description: { en: 'Portable handheld laser welding system weighing only 15kg. Easy to transport for on-site repair work and custom fabrication.', de: 'Tragbares handgeführtes Laserschweißsystem mit nur 15kg.', es: 'Sistema de soldadura láser portátil de solo 15kg.', fr: 'Système de soudage laser portable de seulement 15kg.', it: 'Sistema di saldatura laser portatile di soli 15kg.', nl: 'Draagbaar handheld laser las systeem van slechts 15kg.' },
    specifications: { power: '500W - 1000W', cuttingArea: 'Portable', precision: '±0.1mm', maxSpeed: '20mm/s' },
    price: 15000,
    featured: false
  },
  {
    _id: 'product-acc01',
    _type: 'product',
    name: { en: 'AII-ACC01 Smart Focus Head', de: 'AII-ACC01 Intelligenter Fokuskopf', es: 'AII-ACC01 Cabeza de Enfoque Inteligente', fr: 'AII-ACC01 Tête de Focalisation Intelligente', it: 'AII-ACC01 Testa di Messa a Fuoco Intelligente', nl: 'AII-ACC01 Slimme Focus Kop' },
    slug: { current: 'aii-acc01-focus-head' },
    category: { _type: 'reference', _ref: 'category-accessories' },
    description: { en: 'AI-powered auto-focusing head with real-time gap control. Automatically adjusts focal position based on material type and thickness.', de: 'KI-gesteuerter Auto-Fokuskopf mit Echtzeit-Spaltkontrolle.', es: 'Cabeza de auto-enfoque con IA y control de separación en tiempo real.', fr: 'Tête d\'auto-focalisation alimentée par IA avec contrôle d\'écart.', it: 'Testa di auto-messa a fuoco con IA e controllo gap in tempo reale.', nl: 'AI-aangedreven autofocus kop met real-time gap controle.' },
    specifications: { power: 'Universal', cuttingArea: 'N/A', precision: '±0.01mm', maxSpeed: 'N/A' },
    price: 3500,
    featured: false
  },
  {
    _id: 'product-acc02',
    _type: 'product',
    name: { en: 'AII-ACC02 Industrial Chiller System', de: 'AII-ACC02 Industrielles Kühlsystem', es: 'AII-ACC02 Sistema de Refrigeración Industrial', fr: 'AII-ACC02 Système de Refroidissement Industriel', it: 'AII-ACC02 Sistema di Raffreddamento Industriale', nl: 'AII-ACC02 Industrieel Koelsysteem' },
    slug: { current: 'aii-acc02-chiller' },
    category: { _type: 'reference', _ref: 'category-accessories' },
    description: { en: 'High-capacity industrial chiller for continuous laser operation. Maintains optimal temperature for consistent cutting quality.', de: 'Hochleistungs-Industriekühler für Dauerbetrieb.', es: 'Refrigerador industrial de alta capacidad para operación continua.', fr: 'Refroidisseur industriel haute capacité pour fonctionnement continu.', it: 'Raffreddatore industriale ad alta capacità per funzionamento continuo.', nl: 'High-capacity industriële koeler voor continue bediening.' },
    specifications: { power: '5.5kW - 15kW', cuttingArea: 'N/A', precision: 'N/A', maxSpeed: 'N/A' },
    price: 5000,
    featured: false
  }
]

async function importAll() {
  console.log('🚀 AI Industrial Platform - Sanity Data Importer')
  console.log('═══════════════════════════════════════════════════════\n')
  
  try {
    // Test connection
    console.log('📡 Testing Sanity connection...')
    const test = await request('GET', '/data/query/production?query=*[_type == "setting"][0]')
    console.log('✅ Connected successfully!\n')

    // Clear existing data
    console.log('🗑️  Clearing existing products and categories...')
    await request('POST', '/data/mutate/production', {
      mutations: [
        { delete: { query: '*[_type == "product"]' } },
        { delete: { query: '*[_type == "category"]' } }
      ]
    })
    console.log('✅ Data cleared!\n')

    // Import categories
    console.log('📁 Importing Categories...')
    await request('POST', '/data/mutate/production', {
      mutations: categories.map(cat => ({ createOrReplace: cat }))
    })
    categories.forEach(cat => console.log(`   ✅ ${cat.title.en}`))
    console.log('')

    // Import products
    console.log('📦 Importing Products...')
    await request('POST', '/data/mutate/production', {
      mutations: products.map(prod => ({ createOrReplace: prod }))
    })
    products.forEach(prod => console.log(`   ✅ ${prod.name.en}`))
    console.log('')

    // Create settings
    console.log('⚙️  Creating Site Settings...')
    await request('POST', '/data/mutate/production', {
      mutations: [{
        createOrReplace: {
          _id: 'site-settings',
          _type: 'setting',
          siteName: 'AI Industrial Platform',
          contact: {
            email: 'info@aiindustrial.com',
            phone: '+86 512 1234 5678',
            address: 'Industrial Zone, Suzhou, China',
            city: 'Suzhou',
            country: 'China'
          },
          social: {
            linkedin: 'https://linkedin.com/company/aiindustrial',
            twitter: 'https://twitter.com/aiindustrial'
          }
        }
      }]
    })
    console.log('   ✅ Site settings created!')
    console.log('')

    // Verify counts
    console.log('📊 Verifying Import...')
    const counts = await request('GET', '/data/query/production?query={products: count(*[_type == "product"]), categories: count(*[_type == "category"])}')
    console.log(`   📦 Products: ${counts.result?.products || 0}`)
    console.log(`   📁 Categories: ${counts.result?.categories || 0}`)
    console.log('')

    console.log('═══════════════════════════════════════════════════════')
    console.log('🎉 DATA IMPORT COMPLETED SUCCESSFULLY!')
    console.log('═══════════════════════════════════════════════════════\n')
    console.log('Next steps:')
    console.log('1. Run: cd ai-global-platform && npm run dev')
    console.log('2. Visit: http://localhost:3000')
    console.log('3. Products will be fetched from Sanity and displayed!\n')

  } catch (error) {
    console.error('\n❌ IMPORT FAILED:', error.message)
    process.exit(1)
  }
}

importAll()
