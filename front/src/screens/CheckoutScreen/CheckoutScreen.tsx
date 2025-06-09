import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { plans } from "../PaymentPlans/dataPlans";
import {
  CheckoutGrid,
  FeatureItem,
  FormColumn,
  FormSection,
  Input,
  InputGroup,
  InputRow,
  MainContainer,
  MainTitle,
  PageWrapper,
  PaymentOptions,
  PlanTitle,
  PriceBox,
  RadioWrapper,
  SectionHeader,
  Select,
  SubmitButton,
  SummaryCard,
  SummaryColumn,
  TermsLink
} from "./styles";
import { FiBarChart, FiChevronDown, FiCreditCard, FiUser } from "react-icons/fi";
import { FaPix, FaStripe } from "react-icons/fa6";
import { Header } from "../../components/Header/Header";

export const CheckoutScreen: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  const plan = plans.find(p => p.id === planId);

  if (!plan) {
    return <Navigate to="/planos" replace />;
  }

  const isBasicPlan = plan.id === 'basic';

  return (
    <>
      <Header />
      <PageWrapper>
        <MainContainer>
          <MainTitle>Assine o Plano {plan.name}</MainTitle>
          <CheckoutGrid>
            <FormColumn>
              <form onSubmit={(e) => e.preventDefault()}>
                <FormSection>
                  <SectionHeader><FiUser /> Dados</SectionHeader>
                  <InputGroup>
                    <label htmlFor="name">Nome Completo</label>
                    <Input id="name" type="text" />
                  </InputGroup>
                  <InputGroup>
                    <label htmlFor="email">Email</label>
                    <Input id="email" type="email" />
                  </InputGroup>
                  <InputRow>
                    <InputGroup>
                      <label htmlFor="type">Tipo</label>
                      <Select id="type">
                        <option>Pessoa Física</option>
                        <option>Pessoa Jurídica</option>
                      </Select>
                    </InputGroup>
                    <InputGroup>
                      <label htmlFor="document">CPF/CNPJ</label>
                      <Input id="document" type="text" />
                    </InputGroup>
                  </InputRow>
                </FormSection>

                <FormSection>
                  <SectionHeader><FiCreditCard /> Pagamento</SectionHeader>
                  <PaymentOptions>
                    <RadioWrapper 
                      className={`${paymentMethod === 'pix' ? 'selected' : ''} ${isBasicPlan ? 'disabled' : ''}`} 
                      onClick={() => !isBasicPlan && setPaymentMethod('pix')}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        value="pix" 
                        checked={paymentMethod === 'pix'} 
                        disabled={isBasicPlan}
                        readOnly
                      />
                      <span>Pix (5% Desconto)</span>
                      <span className="details" style={{color: '#50C878', fontWeight: 'bold'}}>R$ {plan.yearlyPrice}</span>
                      <span className="icon"><FaPix /></span>
                    </RadioWrapper>
                    <RadioWrapper 
                      className={`${paymentMethod === 'credit_card' ? 'selected' : ''} ${isBasicPlan ? 'disabled' : ''}`} 
                      onClick={() => !isBasicPlan && setPaymentMethod('credit_card')}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        value="credit_card" 
                        checked={paymentMethod === 'credit_card'} 
                        disabled={isBasicPlan}
                        readOnly
                      />
                      <span>Cartão de Crédito</span>
                      <span className="details">
                        {plan.id === 'monthly' ? `R$ ${plan.monthlyPrice}` : `até 12x R$ ${plan.monthlyPrice}`}
                      </span>
                      <span className="icon"><FiCreditCard /></span>
                    </RadioWrapper>
                    <RadioWrapper 
                      className={`${paymentMethod === 'boleto' ? 'selected' : ''} ${isBasicPlan ? 'disabled' : ''}`} 
                      onClick={() => !isBasicPlan && setPaymentMethod('boleto')}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        value="boleto" 
                        checked={paymentMethod === 'boleto'} 
                        disabled={isBasicPlan}
                        readOnly
                      />
                      <span>Boleto Bancário</span>
                      <span className="icon"><FiBarChart /></span>
                    </RadioWrapper>
                    <RadioWrapper 
                      className={`${paymentMethod === 'stripe' ? 'selected' : ''} ${isBasicPlan ? 'disabled' : ''}`} 
                      onClick={() => !isBasicPlan && setPaymentMethod('stripe')}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        value="stripe" 
                        checked={paymentMethod === 'stripe'} 
                        disabled={isBasicPlan}
                        readOnly
                      />
                      <span>Stripe</span>
                      <span className="icon"><FaStripe /></span>
                    </RadioWrapper>
                  </PaymentOptions>
                  {isBasicPlan && (
                    <p style={{ color: '#6b7280', fontStyle: 'italic', marginTop: '1rem', textAlign: 'center' }}>
                      O plano básico é gratuito - não requer pagamento
                    </p>
                  )}
                </FormSection>
                
                <FormSection>
                  <InputGroup>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#4F4F4F' }}>
                      <input type="checkbox" required />
                      Li e concordo com os <TermsLink>termos</TermsLink> e <TermsLink>política</TermsLink> da MinhaVaga.com.
                    </label>
                  </InputGroup>
                </FormSection>
                
                <SubmitButton>Finalizar Assinatura</SubmitButton>
              </form>
            </FormColumn>

            <SummaryColumn>
              <SummaryCard>
                <SectionHeader>Plano Escolhido</SectionHeader>
                <PlanTitle>{plan.name}</PlanTitle>
                {plan.features.map((feature, index) => (
                  <FeatureItem key={index}>
                    <div className="header">
                      <span className="title">{feature}</span>
                      <FiChevronDown />
                    </div>
                    {/* Lógica de acordeão pode ser adicionada aqui com useState */}
                  </FeatureItem>
                ))}
              </SummaryCard>
              <PriceBox>
                <div className="installments">
                  {plan.id === 'monthly' 
                    ? <span>R$ {plan.monthlyPrice}</span>
                    : <>até 12x de <span>R$ {plan.monthlyPrice}</span></>
                  }
                </div>
                <div className="full-price">à vista R$ {plan.yearlyPrice}</div>
              </PriceBox>
            </SummaryColumn>
          </CheckoutGrid>
        </MainContainer>
      </PageWrapper>
    </>
  );
};
