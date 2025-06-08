import styled from 'styled-components';

export const HeroSection = styled.section`
  background-color: #E8E8E3;
  padding: 5rem 1.5rem;
  text-align: center;

  @media (min-width: 768px) {
    padding: 8rem 1.5rem;
  }
`;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333333;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #4F4F4F;
  margin-bottom: 2rem;
  max-width: 42rem;
  margin: 0 auto;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const PricingSection = styled.section`
  padding: 4rem 1.5rem;
  background-color: #F8F7F4;
`;

export const PlansGrid = styled.div`
  display: grid;
  gap: 2rem;
  align-items: start;
  justify-items: center;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(280px, 400px));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(280px, 350px));
  }
`;

export const Card = styled.div<{ isPopular?: boolean }>`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
  border: 2px solid ${({ isPopular }) => (isPopular ? '#4A90E2' : 'transparent')};
  transform: ${({ isPopular }) => (isPopular ? 'scale(1.05)' : 'scale(1)')};
  transition: transform 0.3s ease;

  @media (max-width: 1023px) {
    transform: none;
  }
`;

export const PlanName = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333;
  margin-bottom: 0.5rem;
`;

export const PopularBadge = styled.span`
  display: inline-block;
  background-color: #4A90E2;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  margin-bottom: 1rem;
`;

export const Price = styled.p`
  font-size: 2.5rem;
  font-weight: 800;
  color: #4A90E2;
  margin-bottom: 1rem;
`;

export const PriceFree = styled.span`
  font-size: 1.875rem;
`;

export const PriceFrequency = styled.span`
  font-size: 1.25rem;
  color: #6b7280;
`;

export const FeatureList = styled.ul`
  list-style: none;
  color: #4F4F4F;
  margin-bottom: 1.5rem;
  margin-bottom: 0.5rem;
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  span {
    color: #50C878;
    margin-right: 0.5rem;
  }
`;

export const SubscribeButton = styled.button<{ isPopular?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.125rem;
  transition: background-color 0.3s;
  border: none;
  cursor: pointer;

  background-color: ${({ isPopular }) => (isPopular ? '#4A90E2' : '#E8E8E3')};
  color: ${({ isPopular }) => (isPopular ? '#FFFFFF' : '#333333')};

  &:hover {
    background-color: ${({ isPopular }) => (isPopular ? '#357ABD' : '#D1D1C6')};
  }
`;

export const SavingsText = styled.p`
  text-align: center;
  color: #50C878;
  font-weight: 600;
  font-size: 1.2rem;
  margin-top: 0.5rem;
  margin-bottom: 0;
`;

export const InstallmentText = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin-top: 0.5rem;
`;

export const ContactSection = styled(HeroSection)`
  background-color: #E5E7EB;
`;
export const ContactContainer = styled(Container)``;
export const ContactTitle = styled(Title)``;
export const ContactSubtitle = styled(Subtitle)``;

export const ContactButton = styled.a`
  display: inline-block;
  background-color: #4A90E2;
  color: #FFFFFF;
  font-weight: 600;
  padding: 0.75rem 2rem;
  margin-top: 1.5rem;
  border-radius: 8px;
  font-size: 1.125rem;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357ABD;
  }
`;

export const FooterContainer = styled.footer`
  padding: 2rem;
  text-align: center;
  background-color: #1F2937;
  color: #9CA3AF;
`;
