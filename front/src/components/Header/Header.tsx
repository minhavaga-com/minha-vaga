import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo as={Link} to="/">MinhaVaga.com</Logo>
        <NavLinks>
          <NavLink 
            as={Link} 
            to="/planos" 
            $isActive={location.pathname === '/planos'}
          >
            Planos
          </NavLink>
          <NavLink
            as={Link}
            to="/contato"
            $isActive={location.pathname === '/contato'}
          >
            Contato
          </NavLink>
          <LoginButton
            as={Link}
            to="/login"
            $isActive={location.pathname === '/login'}
            >
              Login
            </LoginButton>
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
        <NavLink 
          as={Link} 
          to="/planos" 
          onClick={handleNavLinkClick}
          $isActive={location.pathname === '/planos'}
        >
          Planos
        </NavLink>
        <NavLink
            as={Link}
            to="/contato"
            $isActive={location.pathname === '/contato'}
          >
            Contato
          </NavLink>
          <LoginButton
            as={Link}
            to="/login"
            $isActive={location.pathname === '/login'}
            >
              Login
            </LoginButton>
      </MobileMenu>
    </HeaderContainer>
  );
};