import { Building, TrendingUp, Users, Heart, DollarSign, Zap } from 'lucide-react';

export const successStoriesData = [
  {
    id: 'techcorp-latam-cto',
    sector: 'Fintech',
    country: 'México',
    role: 'Chief Technology Officer',
    icon: Building,
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7',
    challenge: 'Empresa fintech en rápido crecimiento necesitaba un CTO con experiencia en escalabilidad y liderazgo de equipos distribuidos para liderar su expansión internacional.',
    solution: 'Identificamos y colocamos un ejecutivo con más de 15 años en tecnología financiera y experiencia previa en unicornios latinoamericanos, experto en arquitecturas cloud-native.',
    impact: {
      metrics: [
        { value: '40%', label: 'Mejora en time-to-market' },
        { value: '5', label: 'Nuevos países en 18 meses' },
        { value: '99.9%', label: 'Uptime de la plataforma' },
      ],
      testimonial: {
        text: 'El impacto fue inmediato. Su liderazgo técnico nos permitió escalar de una forma que no creíamos posible.',
        author: 'CEO, TechCorp Latam',
      },
    },
  },
  {
    id: 'retailmax-vp-operaciones',
    sector: 'Retail',
    country: 'Colombia',
    role: 'VP de Operaciones',
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f',
    challenge: 'Cadena de retail tradicional requería una transformación digital completa y la optimización de operaciones en más de 200 tiendas a nivel nacional.',
    solution: 'Colocamos un VP con profundo expertise en transformación digital para retail y gestión de operaciones omnicanal, enfocado en la integración de e-commerce y logística.',
    impact: {
      metrics: [
        { value: '25%', label: 'Reducción en costos operativos' },
        { value: '60%', label: 'Incremento en ventas online' },
        { value: '30%', label: 'Mejora en satisfacción del cliente' },
      ],
      testimonial: {
        text: 'Encontramos al líder que necesitábamos para llevar nuestra operación al siguiente nivel. Un cambio radical.',
        author: 'Presidente, RetailMax',
      },
    },
  },
  {
    id: 'healthtech-solutions-cpo',
    sector: 'HealthTech',
    country: 'Argentina',
    role: 'Chief People Officer',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4',
    challenge: 'Startup de salud digital necesitaba estructurar su área de Recursos Humanos para escalar de 50 a 300 empleados en dos años, manteniendo una cultura fuerte.',
    solution: 'Identificamos un CPO con experiencia probada en scaling de startups y un profundo conocimiento de las regulaciones del sector salud.',
    impact: {
      metrics: [
        { value: '70%', label: 'Reducción del turnover voluntario' },
        { value: '9.1/10', label: 'eNPS Score' },
        { value: '50%', label: 'Reducción tiempo de contratación' },
      ],
      testimonial: {
        text: 'Su llegada fue clave para profesionalizar el área de personas y mantener nuestra esencia mientras crecíamos.',
        author: 'Fundadora, HealthTech Solutions',
      },
    },
  },
  {
    id: 'ecosolutions-director-comercial',
    sector: 'Energías Renovables',
    country: 'Chile',
    role: 'Director Comercial',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5',
    challenge: 'Empresa de soluciones de energía solar necesitaba un líder comercial para abrir nuevos mercados B2B y estructurar el equipo de ventas para un crecimiento exponencial.',
    solution: 'Presentamos un Director Comercial con una red de contactos consolidada en el sector industrial y experiencia en la creación de equipos de venta de alto rendimiento.',
    impact: {
      metrics: [
        { value: '150%', label: 'Aumento en ventas B2B' },
        { value: '3', label: 'Nuevos mercados abiertos' },
        { value: '40%', label: 'Crecimiento del equipo de ventas' },
      ],
      testimonial: {
        text: 'El candidato que nos presentaron no solo trajo resultados, sino que transformó la mentalidad de nuestro equipo comercial.',
        author: 'Gerente General, EcoSolutions',
      },
    },
  }
];