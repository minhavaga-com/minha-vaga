import React from 'react';
import { Header } from '../../components/Header/Header';

import type { Plan } from './types';
import { plans } from './dataPlans';
import {
  HeroSection,
  Title,
  Subtitle,
  PricingSection,
  Container,
  PlansGrid,
  Card,
  PlanName,
  PopularBadge,
  Price,
  PriceFree,
  PriceFrequency,
  InstallmentText,
  FeatureList,
  FeatureItem,
  SubscribeButton,
  SavingsText,
  ContactSection,
  ContactContainer,
  ContactTitle,
  ContactSubtitle,
  ContactButton,
  FooterContainer
} from './styles';

const PricingCard: React.FC<{ plan: Plan }> = ({ plan }) => {
  const displayPrice = plan.id === 'basic' ? 0 : plan.monthlyPrice;
  const frequencyText = plan.id === 'basic' ? '' : '/mês';

  const handleSubscribe = () => {
    window.open('https://em-breve-one.vercel.app/', '_blank');
  };

  return (
    <Card isPopular={plan.isPopular}>
      <div>
        <PlanName>{plan.name}</PlanName>
        {plan.isPopular && <PopularBadge>Mais Popular</PopularBadge>}
        {plan.id === 'annual' && (
          <InstallmentText>à vista R$ 588.00 ou 12x de</InstallmentText>
        )}
        <Price>
          {displayPrice === 0 ? (
            <PriceFree>Grátis</PriceFree>
          ) : (
            <>
              R$ {displayPrice.toFixed(2)}
              <PriceFrequency>{frequencyText}</PriceFrequency>
            </>
          )}
        </Price>
        <FeatureList>
          {plan.features.map((feature, index) => (
            <FeatureItem key={index}>
              <span>✔</span> {feature}
            </FeatureItem>
          ))}
        </FeatureList>
      </div>
      <div>
        <SubscribeButton isPopular={plan.isPopular} onClick={handleSubscribe}>
          Assinar {plan.name}
        </SubscribeButton>
        {plan.id === 'annual' && (
          <SavingsText>economize 67%</SavingsText>
        )}
      </div>
    </Card>
  );
};

export const PaymentPlans: React.FC = () => {
  return (
    <>
      <Header />
      <HeroSection>
        <Container>
          <Title>Escolha o plano ideal para você.</Title>
          <Subtitle>
            Impulsione sua carreira em tecnologia com acesso exclusivo às melhores vagas e ferramentas de otimização de perfil.
          </Subtitle>
        </Container>
      </HeroSection>

      <PricingSection id="plans">
        <Container>
          <PlansGrid>
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </PlansGrid>
        </Container>
      </PricingSection>

      <ContactSection id="contact">
        <ContactContainer>
          <ContactTitle>Tem alguma pergunta?</ContactTitle>
          <ContactSubtitle>
            Entre em contato conosco para saber mais sobre os planos corporativos ou tirar dúvidas.
          </ContactSubtitle>
          <ContactButton href="https://em-breve-one.vercel.app/">Fale Conosco</ContactButton>
        </ContactContainer>
      </ContactSection>

      <FooterContainer>
        <p>&copy; {new Date().getFullYear()} MinhaVaga. Todos os direitos reservados.</p>
        <p>Conectando talentos juniores ao futuro da tecnologia.</p>
      </FooterContainer>
    </>
  );
};