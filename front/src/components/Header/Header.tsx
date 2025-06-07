import React, { useState } from 'react';
import {
  HeaderContainer,
  Nav,
  Logo,
  NavLinks,
  NavLink,
  LoginButton,
  MobileMenuButton,
  MobileMenu
} from './styles';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo href="#">MinhaVaga.com</Logo>
        <NavLinks>
          <NavLink href="#plans">Planos</NavLink>
          <NavLink href="#contact">Contato</NavLink>
          <LoginButton href="#login">Login</LoginButton>
        </NavLinks>
        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg 
            width="24" 
            height="24" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </MobileMenuButton>
      </Nav>
      <MobileMenu isOpen={isMobileMenuOpen}>
        <NavLink href="#plans" onClick={handleNavLinkClick}>Planos</NavLink>
        <NavLink href="#contact" onClick={handleNavLinkClick}>Contato</NavLink>
        <LoginButton href="#login" onClick={handleNavLinkClick}>Login</LoginButton>
      </MobileMenu>
    </HeaderContainer>
  );
};