import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
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
        // TODO: Implementar navegação para empresas parceiras
        console.log('Navegando para empresas parceiras');
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
        <Logo as={Link} to="/">MinhaVaga.com</Logo>
        
        <NavLinks>
          <NavLink 
            onClick={() => handleMenuClick('empresas')}
            style={{ cursor: 'pointer' }}
          >
            🏢 Empresas Parceiras
          </NavLink>
          
          <NavLink 
            onClick={() => handleMenuClick('profile')}
            style={{ cursor: 'pointer' }}
          >
            👤 Profile
          </NavLink>

          <LoginButton 
          onClick={() => handleMenuClick('logout')}
          style={{ 
            backgroundColor: '#EF4444',
            margin: '0.5rem',
            textAlign: 'center'
          }}
        >
          🚪 Logout
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
          🏢 Empresas Parceiras
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
          👤 Profile
        </button>
        
        <LoginButton 
          onClick={() => handleMenuClick('logout')}
          style={{ 
            backgroundColor: '#EF4444',
            margin: '0.5rem',
            textAlign: 'center'
          }}
        >
          🚪 Logout
        </LoginButton>
      </MobileMenu>
    </HeaderContainer>
  );
}; 