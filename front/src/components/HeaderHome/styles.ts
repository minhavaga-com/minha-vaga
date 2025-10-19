import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: #FFFFFF;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 50;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
`;

export const Logo = styled.a`
  font-family: 'Readex Pro', sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: #4A90E2;
  text-decoration: none;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 767px) {
    display: none;
  }
`;

export const NavLink = styled.a<{ $isActive?: boolean }>`
  font-family: 'Readex Pro', sans-serif;
  color: #4F4F4F;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.3s;
  text-decoration: none;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: #DBDBD4;
  }

  ${({ $isActive }) =>
    $isActive &&
    `
    color: #4A90E2;
    &::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #4A90E2;
    }
  `}
`;

export const LoginButton = styled(NavLink)`
  color: #374151;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: #357ABD;
  }

  &::after {
    display: none !important;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: #374151;
  
  @media (max-width: 767px) {
    display: block;
  }
  
  &:hover {
    color: #4A90E2;
  }
`;

export const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 30;
  padding: 0.5rem;

  @media (min-width: 768px) {
    display: none !important;
  }

  ${NavLink} {
    display: block;
    width: 100%;
    padding: 0.75rem;
    margin: 0.25rem 0;
  }

  ${LoginButton} {
    display: block;
    text-align: center;
    width: auto;
    margin: 0.5rem;
  }
`;

export const UserInfo = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid #E5E7EB;
  font-size: 0.9rem;
  color: #666;
`;

export const MobileMenuItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 0.75rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #f3f4f6;
  }
`;
