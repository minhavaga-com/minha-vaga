import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
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
  TermsLink,
  PixDetails,
  FreeNotice,
  TermsLabel
} from "./styles";
import { FiBarChart, FiChevronDown, FiCreditCard, FiUser } from "react-icons/fi";
import { FaPix, FaStripe } from "react-icons/fa6";
import { Header } from "../../components/Header/Header";
import { auth } from "../../lib/firebase";

export const CheckoutScreen: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);
  

  const handleSignIn = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(email, password);
  }

  const plan = plans.find(p => p.id === planId);

  if (!plan) {
    return <Navigate to="/planos" replace />;
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  const isBasicPlan = plan.id === 'basic';
  
  const getPixPrice = () => {
    if (plan.id === 'annual') {
      const yearlyPrice = parseFloat(plan.yearlyPrice.replace(',', '.'));
      const discountedPrice = yearlyPrice * 0.95;
      return discountedPrice.toFixed(2).replace('.', ',');
    }
    if (plan.id === 'monthly') {
      const monthlyPrice = parseFloat(plan.monthlyPrice.replace(',', '.'));
      const discountedPrice = monthlyPrice * 0.95;
      const roundedDown = Math.floor(discountedPrice * 100) / 100;
      return roundedDown.toFixed(2).replace('.', ',');
    }
    return plan.yearlyPrice;
  };

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
                    <Input id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
                  </InputGroup>
                  <InputGroup>
                    <label htmlFor="password">Senha</label>
                    <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
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
                      <PixDetails className="details">R$ {getPixPrice()}</PixDetails>
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
                    <FreeNotice>
                      O plano básico é gratuito - não requer pagamento
                    </FreeNotice>
                  )}
                </FormSection>
                
                <FormSection>
                  <InputGroup>
                    <TermsLabel>
                      <input type="checkbox" required />
                      Li e concordo com os <TermsLink>termos</TermsLink> e <TermsLink>política</TermsLink> da MinhaVaga.com.
                    </TermsLabel>
                  </InputGroup>
                </FormSection>
                
                <SubmitButton onClick={(e) => handleSignIn(e)}>Criar conta</SubmitButton>
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
