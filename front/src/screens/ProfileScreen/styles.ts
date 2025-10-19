import styled from 'styled-components';
import { theme } from '../../GlobalStyles';

const { colors } = theme;

export const PageWrapper = styled.main`
  background-color: ${colors.background || '#F8F7F4'};
  min-height: 100vh;
  padding: 3rem 2rem;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ProfileCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid #e1e4e8;
  object-fit: cover;
`;

export const UserName = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.textDark};
  margin: 0;
  text-align: center;
`;

export const UserEmail = styled.p`
  font-size: 0.875rem;
  color: ${colors.textMedium};
  margin: 0;
  text-align: center;
`;

export const MainContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${colors.textDark};
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e1e4e8;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${colors.textDark};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

export const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

export const FileUploadArea = styled.div`
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
  background-color: #f9fafb;
  
  &:hover {
    border-color: ${colors.primary};
    background-color: #f3f4f6;
  }
  
  &.dragging {
    border-color: ${colors.primary};
    background-color: rgba(99, 102, 241, 0.05);
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileUploadIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: ${colors.textMedium};
`;

export const FileUploadText = styled.p`
  font-size: 0.875rem;
  color: ${colors.textMedium};
  margin: 0.5rem 0;
`;

export const CurrentFile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f3f4f6;
  border-radius: 8px;
  margin-top: 0.5rem;
`;

export const FileName = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${colors.textDark};
`;

export const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  transition: color 0.2s;
  
  &:hover {
    color: #dc2626;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  ${({ variant }) =>
    variant === 'primary'
      ? `
        background: ${colors.primary};
        color: white;
        border: none;
        
        &:hover:not(:disabled) {
          background: ${colors.primaryDark};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }
      `
      : `
        background: white;
        color: ${colors.textMedium};
        border: 1px solid #d1d5db;
        
        &:hover:not(:disabled) {
          background: #f9fafb;
        }
      `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const Alert = styled.div<{ type?: 'success' | 'error' }>`
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  ${({ type }) =>
    type === 'success'
      ? `
        background-color: #d1fae5;
        border: 1px solid #6ee7b7;
        color: #065f46;
      `
      : `
        background-color: #fee2e2;
        border: 1px solid #fca5a5;
        color: #991b1b;
      `}
`;

export const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e1e4e8;
`;

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${colors.textMedium};
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;
  
  &:hover {
    color: ${colors.primary};
  }
`;

export const HelpText = styled.span`
  font-size: 0.75rem;
  color: ${colors.textMedium};
  font-style: italic;
`;

export const CenteredMessage = styled.div`
  text-align: center;
  padding: 4rem;
`;

export const CloseButton = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: ${colors.textMedium};

  &:hover {
    color: ${colors.textDark};
  }
`;

export const SmallFileText = styled(FileUploadText)`
  font-size: 0.75rem;
`;

export const NewBadge = styled.span`
  color: #10b981;
  margin-left: 0.5rem;
`;

export const ResumeActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ResumeLink = styled.a`
  color: #6366f1;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
