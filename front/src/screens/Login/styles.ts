import styled from 'styled-components';
import { theme } from '../../GlobalStyles';

export const { colors } = theme;

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${colors.backgroundLight};
  color: ${colors.textDark};
  padding: 2rem;
`;

export const MainTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
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

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  width: 100%;
  max-width: 900px;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Subheading = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  padding-left: 0.5rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 70%;
    background-color: ${colors.primary};
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 1rem;
  color: ${colors.textMedium};
`;

export const Input = styled.input`
  background-color: ${colors.grayLight};
  border: 1px solid #444;
  color: ${colors.textDark};
  padding: 0.875rem 1rem;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

export const OptionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

export const ForgotPasswordLink = styled.a`
  color: ${colors.textMedium};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: ${colors.primary};
  }
`;

export const ActionButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  border: none;
  padding: 0.875rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: ${colors.primaryDark};
  }
`;

export const DescriptionText = styled.p`
  color: ${colors.textMedium};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;
