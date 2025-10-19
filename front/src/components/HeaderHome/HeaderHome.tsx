import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiBriefcase, FiSearch, FiUsers, FiUser, FiLogOut } from 'react-icons/fi';
import {
  HeaderContainer,
  Nav,
  Logo,
  NavLinks,
  NavLink,
  LoginButton,
  MobileMenuButton,
  MobileMenu,
  UserInfo,
  MobileMenuItem
} from './styles';

export const HeaderHome: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { userData, logout } = useAuth();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  const handleMenuClick = (action: string) => {
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
    
    switch (action) {
      case 'empresas':
        navigate('/empresas');
        break;
      case 'profile':
        navigate('/profile');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  return (
    <HeaderContainer>
      <Nav>
        <Logo>MinhaVaga.com</Logo>
        
        <NavLinks>
          <NavLink as={Link} to="/home">
            <FiBriefcase /> Vagas
          </NavLink>

          <NavLink onClick={() => handleMenuClick('empresas')}>
            <FiUsers /> Empresas Parceiras
          </NavLink>

          <NavLink as={Link} to="/linkedin-search">
            <FiSearch /> Filtrar Vagas no LinkedIn
          </NavLink>
          
          <NavLink onClick={() => handleMenuClick('profile')}>
            <FiUser /> Perfil
          </NavLink>

          <LoginButton onClick={() => handleMenuClick('logout')}>
            <FiLogOut /> Sair
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
        <UserInfo>
          <strong>{userData?.displayName || userData?.email}</strong>
        </UserInfo>
        
        <NavLink as={Link} to="/home" onClick={() => setIsMobileMenuOpen(false)}>
          <FiBriefcase /> Vagas
        </NavLink>

        <MobileMenuItem onClick={() => handleMenuClick('empresas')}>
          <FiUsers /> Empresas Parceiras
        </MobileMenuItem>

        <NavLink as={Link} to="/linkedin-search" onClick={() => setIsMobileMenuOpen(false)}>
          <FiSearch /> Filtrar Vagas no LinkedIn
        </NavLink>
        
        <MobileMenuItem onClick={() => handleMenuClick('profile')}>
          <FiUser /> Perfil
        </MobileMenuItem>
        
        <LoginButton onClick={() => handleMenuClick('logout')}>
          <FiLogOut /> Sair
        </LoginButton>
      </MobileMenu>
    </HeaderContainer>
  );
}; 