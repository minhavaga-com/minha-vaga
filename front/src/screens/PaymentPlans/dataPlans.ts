import type { Plan } from './types';

export const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Básico',
    monthlyPrice: '0,00',
    yearlyPrice: '0,00',
    features: [
      'Acesso a vagas curadas',
      'Filtros inteligentes',
      'Alertas de novas vagas'
    ],
  },
  {
    id: 'annual',
    name: 'Anual',
    monthlyPrice: '57,90',
    yearlyPrice: '588,00',
    features: [
      'Todas as funcionalidades do Básico',
      'Vagas exclusivas de empresas parceiras',
      'Análise de LinkedIn e currículo',
      'Acesso a eventos de networking exclusivos',
      'Mentoria personalizada',
      'Suporte prioritário',
      'Consultoria de carreira individual',
      'Workshops e webinars mensais',
      'Acesso a comunidade exclusiva'
    ],
    isPopular: true,
  },
  {
    id: 'monthly',
    name: 'Mensal',
    monthlyPrice: '99,90',
    yearlyPrice: '99,90',
    features: [
      'Todas as funcionalidades do Básico',
      'Vagas exclusivas de empresas parceiras',
      'Análise de LinkedIn e currículo',
      'Acesso a eventos de networking exclusivos',
      'Workshops e webinars mensais',
      'Acesso a comunidade exclusiva',
      'Suporte'
    ],
  },
];