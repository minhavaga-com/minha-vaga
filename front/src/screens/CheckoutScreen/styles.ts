import styled from 'styled-components';
import { theme } from '../../GlobalStyles';

const { colors } = theme;

export const PageWrapper = styled.div`
  background-color: ${colors.backgroundLight};
  color: ${colors.textDark};
  padding: 3rem 2rem;
  min-height: 100vh;
`;

export const MainContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

export const MainTitle = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 3rem;
  position: relative;
  padding-bottom: 0.75rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: ${colors.primary};
  }
`;

export const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 3rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const FormColumn = styled.div`
  background-color: ${colors.lightGray};
  color: ${colors.textDark};
  padding: 2rem;
  border-radius: 8px;
`;

export const SummaryColumn = styled.div``;

export const FormSection = styled.div`
  margin-bottom: 2.5rem;
`;

export const SectionHeader = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  background-color: ${colors.backgroundLight};
  border: 1px solid #ccc;
  padding: 0.875rem;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  &:focus { outline-color: ${colors.primary}; }
`;

export const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
`;

export const Select = styled.select`
  background-color: ${colors.backgroundLight};
  border: 1px solid #ccc;
  padding: 0.875rem;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  &:focus { outline-color: ${colors.primary}; }
`;

export const PaymentOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const RadioWrapper = styled.label`
  display: flex;
  align-items: center;
  background-color: ${colors.backgroundLight};
  padding: 1rem;
  border-radius: 6px;
  border: 2px solid #eee;
  cursor: pointer;
  transition: border-color 0.2s;

  &.selected {
    border-color: ${colors.primary};
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #f5f5f5;
    
    input[type="radio"] {
      cursor: not-allowed;
    }
    
    span, .details, .icon {
      color: #999 !important;
    }
  }

  input[type="radio"] {
    margin-right: 1rem;
  }

  span:first-of-type {
    flex: 1;
  }

  .details {
    margin-left: 1rem;
    margin-right: 1rem;
    font-size: 0.875rem;
    color: ${colors.textMedium};
  }

  .icon {
    margin-left: .3rem;
    margin-right: .3rem;
    font-size: 1.2rem;
    color: #888;
  }
`;

export const SummaryCard = styled.div`
  background-color: ${colors.lightGray};
  padding: 2rem;
  border-radius: 8px;
`;

export const PlanTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

export const FeatureItem = styled.div`
  border-bottom: 1px solid #444;
  padding: 1rem 0;
  cursor: pointer;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    color: ${colors.primary};
    font-weight: 600;
  }

  .details {
    color: #aaa;
    margin-top: 0.5rem;
    padding-right: 2rem;
    line-height: 1.5;
  }
`;

export const PriceBox = styled.div`
  background-color: ${colors.lightGray};
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  margin-top: 2rem;
  
  .installments {
    font-size: 1.5rem;
    span { font-weight: bold; font-size: 2rem; color: ${colors.primary}; }
  }

  .full-price {
    font-size: 0.875rem;
    color: ${colors.textMedium};
    margin-top: 0.5rem;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  margin-top: 1.5rem;
  background-color: ${colors.primary};
  color: white;
  transition: background-color 0.3s;
  &:hover { background-color: ${colors.primaryDark}; }
`;

export const TermsLink = styled.span`
  color: ${colors.primary};
  text-decoration: underline;
  cursor: pointer;
  
  &:hover {
    color: ${colors.primaryDark};
  }
`;
