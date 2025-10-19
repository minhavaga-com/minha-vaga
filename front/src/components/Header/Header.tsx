import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, userData, logout, firebaseConfigured } = useAuth();

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  const getRoleDisplayName = (role: string): string => {
    const roleNames: Record<string, string> = {
      'recruiter': 'Recrutador',
      'annual_plan': 'Plano Anual',
      'monthly_plan': 'Plano Mensal',
      'basic_plan': 'Plano Básico',
    };
    return roleNames[role] || 'Usuário';
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo>MinhaVaga.com</Logo>
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
          {isAuthenticated && userData ? (
            <>
              <NavLink
                as={Link}
                to="/linkedin-search"
                $isActive={location.pathname === '/linkedin-search'}
              >
                Filtrar Vagas no LinkedIn
              </NavLink>
              <NavLink
                as={Link}
                to="/home"
                $isActive={location.pathname === '/home'}
              >
                Vagas
              </NavLink>
              <NavLink
                as={Link}
                to="/dashboard"
                $isActive={location.pathname === '/dashboard'}
              >
                Dashboard
              </NavLink>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.9rem', color: '#666' }}>
                  {userData.displayName || userData.email} ({getRoleDisplayName(userData.role)})
                </span>
                <LoginButton onClick={handleLogout}>Sair</LoginButton>
              </div>
            </>
          ) : (
            <LoginButton
              as={Link}
              to="/login"
              title={!firebaseConfigured ? 'Configure o Firebase para fazer login' : 'Fazer login'}
            >
              Login {!firebaseConfigured && '⚠️'}
            </LoginButton>
          )}
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
        >
          Planos
        </NavLink>
        <NavLink
          as={Link}
          to="/contato"
          onClick={handleNavLinkClick}
        >
          Contato
        </NavLink>
        {isAuthenticated && userData ? (
          <>
            <NavLink
              as={Link}
              to="/linkedin-search"
              onClick={handleNavLinkClick}
            >
              Filtrar Vagas no LinkedIn
            </NavLink>
            <NavLink
              as={Link}
              to="/home"
              onClick={handleNavLinkClick}
            >
              Vagas
            </NavLink>
            <NavLink
              as={Link}
              to="/dashboard"
              onClick={handleNavLinkClick}
            >
              Dashboard
            </NavLink>
            <div style={{ padding: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
              {userData.displayName || userData.email} ({getRoleDisplayName(userData.role)})
            </div>
            <LoginButton onClick={handleLogout}>Sair</LoginButton>
          </>
        ) : (
          <LoginButton
            as={Link}
            to="/login"
            title={!firebaseConfigured ? 'Configure o Firebase para fazer login' : 'Fazer login'}
          >
            Login {!firebaseConfigured && '⚠️'}
          </LoginButton>
        )}
      </MobileMenu>
    </HeaderContainer>
  );
};