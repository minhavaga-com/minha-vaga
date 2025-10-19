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
  MobileMenu
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
        navigate('/dashboard');
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
        <NavLink 
            as={Link}
            to="/home"
            style={{ cursor: 'pointer' }}
          >
            <FiBriefcase /> Vagas
          </NavLink>

          <NavLink 
            as={Link}
            to="/linkedin-search"
            style={{ cursor: 'pointer' }}
          >
            <FiSearch /> Filtrar Vagas no LinkedIn
          </NavLink>
          
          <NavLink 
            onClick={() => handleMenuClick('empresas')}
            style={{ cursor: 'pointer' }}
          >
            <FiUsers /> Empresas Parceiras
          </NavLink>
          
          <NavLink 
            onClick={() => handleMenuClick('profile')}
            style={{ cursor: 'pointer' }}
          >
            <FiUser /> Perfil
          </NavLink>

          <LoginButton 
          onClick={() => handleMenuClick('logout')}
          style={{ 
            margin: '0.5rem',
            textAlign: 'center'
          }}
        >
          <FiLogOut /> Sair
        </LoginButton>
        </NavLinks>

        {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen}>
        <div style={{ 
          padding: '0.5rem', 
          borderBottom: '1px solid #E5E7EB',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          <strong>{userData?.displayName || userData?.email}</strong>
        </div>
        
        <NavLink
          as={Link}
          to="/linkedin-search"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            width: '100%',
            textAlign: 'left',
            padding: '0.75rem',
            fontSize: '0.9rem',
            display: 'block'
          }}
        >
          <FiSearch /> Filtrar Vagas no LinkedIn
        </NavLink>
        
        <button
          onClick={() => handleMenuClick('empresas')}
          style={{
            width: '100%',
            textAlign: 'left',
            padding: '0.75rem',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          <FiUsers /> Empresas Parceiras
        </button>
        
        <button
          onClick={() => handleMenuClick('profile')}
          style={{
            width: '100%',
            textAlign: 'left',
            padding: '0.75rem',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          <FiUser /> Perfil
        </button>
        
        <LoginButton 
          onClick={() => handleMenuClick('logout')}
          style={{ 
            margin: '0.5rem',
            textAlign: 'center'
          }}
        >
          <FiLogOut /> Sair
        </LoginButton>
      </MobileMenu>
    </HeaderContainer>
  );
}; 