import type { Plan } from './types';

export const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Básico',
    monthlyPrice: 0.00,
    yearlyPrice: 0.00,
    features: [
      'Acesso a vagas curadas',
      'Filtros inteligentes',
      'Alertas de novas vagas'
    ],
  },
  {
    id: 'annual',
    name: 'Anual',
    monthlyPrice: 59.00,
    yearlyPrice: 468.00,
    features: [
      'Todas as funcionalidades do Básico',
      'Vagas exclusivas de empresas parceiras',
      'Análise de LinkedIn e currículo',
      'Suporte prioritário',
      'Workshops e webinars mensais'
    ],
    isPopular: true,
  },
  {
    id: 'monthly',
    name: 'Mensal',
    monthlyPrice: 99.90,
    yearlyPrice: 999.00,
    features: [
      'Todas as funcionalidades do Anual',
      'Consultoria de carreira individual',
      'Mentoria personalizada',
      'Acesso a eventos de networking exclusivos',
      'Suporte 24/7 dedicado'
    ],
  },
];