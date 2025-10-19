import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #EF4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #DC2626;
  }
`;

export const Section = styled.div`
  background-color: #F9FAFB;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

export const InfoGrid = styled.div`
  display: grid;
  gap: 0.5rem;
`;

interface RoleBadgeProps {
  $color: string;
}

export const RoleBadge = styled.span<RoleBadgeProps>`
  margin-left: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: ${props => props.$color};
  color: white;
  border-radius: 4px;
  font-size: 0.8rem;
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const FeatureItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid #E5E7EB;
`;

export const PermissionGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

interface PermissionBoxProps {
  $hasPermission: boolean;
}

export const PermissionBox = styled.div<PermissionBoxProps>`
  padding: 1rem;
  background-color: ${props => props.$hasPermission ? '#D1FAE5' : '#FEE2E2'};
  border-radius: 4px;
`;

