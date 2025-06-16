import React from 'react';
import { useAuth, UserRole } from '../../contexts/AuthContext';

export const UserDashboard: React.FC = () => {
  const { userData, hasPermission, logout } = useAuth();

  if (!userData) {
    return <div>Carregando dados do usuário...</div>;
  }

  const getRoleColor = (role: UserRole): string => {
    const colors = {
      [UserRole.RECRUITER]: '#10B981',
      [UserRole.ANNUAL_PLAN]: '#3B82F6',
      [UserRole.MONTHLY_PLAN]: '#8B5CF6',
      [UserRole.BASIC_PLAN]: '#6B7280',
    };
    return colors[role];
  };

  const getRoleFeatures = (role: UserRole): string[] => {
    const features = {
      [UserRole.RECRUITER]: [
        'Acesso completo a todas as vagas',
        'Gerenciar postagem de vagas',
        'Visualizar candidatos',
        'Relatórios avançados',
        'Suporte prioritário'
      ],
      [UserRole.ANNUAL_PLAN]: [
        'Acesso ilimitado a vagas',
        'Filtros avançados',
        'Alertas personalizados',
        'Histórico de candidaturas',
        'Suporte via chat'
      ],
      [UserRole.MONTHLY_PLAN]: [
        'Acesso a vagas premium',
        'Filtros básicos',
        'Até 10 candidaturas/mês',
        'Suporte via email'
      ],
      [UserRole.BASIC_PLAN]: [
        'Visualizar vagas básicas',
        'Até 3 candidaturas/mês',
        'Suporte via FAQ'
      ],
    };
    return features[role] || [];
  };

  return (
    <div style={{ 
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h1>Dashboard do Usuário</h1>
        <button 
          onClick={logout}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#EF4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Sair
        </button>
      </div>

      <div style={{ 
        backgroundColor: '#F9FAFB',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h2>Informações da Conta</h2>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <p><strong>Nome:</strong> {userData.displayName || 'Não informado'}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p>
            <strong>Plano:</strong> 
            <span style={{ 
              marginLeft: '0.5rem',
              padding: '0.25rem 0.5rem',
              backgroundColor: getRoleColor(userData.role),
              color: 'white',
              borderRadius: '4px',
              fontSize: '0.8rem'
            }}>
              {userData.role.replace('_', ' ').toUpperCase()}
            </span>
          </p>
          {userData.planExpirationDate && (
            <p>
              <strong>Expira em:</strong> {userData.planExpirationDate.toLocaleDateString('pt-BR')}
            </p>
          )}
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#F9FAFB',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h2>Suas Funcionalidades</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {getRoleFeatures(userData.role).map((feature, index) => (
            <li key={index} style={{ 
              padding: '0.5rem 0',
              borderBottom: '1px solid #E5E7EB'
            }}>
              ✅ {feature}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ 
        backgroundColor: '#F9FAFB',
        padding: '1.5rem',
        borderRadius: '8px'
      }}>
        <h2>Verificação de Permissões</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ 
            padding: '1rem',
            backgroundColor: hasPermission(UserRole.BASIC_PLAN) ? '#D1FAE5' : '#FEE2E2',
            borderRadius: '4px'
          }}>
            <strong>Acesso Básico:</strong> {hasPermission(UserRole.BASIC_PLAN) ? '✅ Permitido' : '❌ Negado'}
          </div>

          <div style={{ 
            padding: '1rem',
            backgroundColor: hasPermission(UserRole.MONTHLY_PLAN) ? '#D1FAE5' : '#FEE2E2',
            borderRadius: '4px'
          }}>
            <strong>Funcionalidades Premium:</strong> {hasPermission(UserRole.MONTHLY_PLAN) ? '✅ Permitido' : '❌ Negado'}
          </div>

          <div style={{ 
            padding: '1rem',
            backgroundColor: hasPermission(UserRole.ANNUAL_PLAN) ? '#D1FAE5' : '#FEE2E2',
            borderRadius: '4px'
          }}>
            <strong>Acesso Anual:</strong> {hasPermission(UserRole.ANNUAL_PLAN) ? '✅ Permitido' : '❌ Negado'}
          </div>

          <div style={{ 
            padding: '1rem',
            backgroundColor: hasPermission(UserRole.RECRUITER) ? '#D1FAE5' : '#FEE2E2',
            borderRadius: '4px'
          }}>
            <strong>Ferramentas de Recrutamento:</strong> {hasPermission(UserRole.RECRUITER) ? '✅ Permitido' : '❌ Negado'}
          </div>
        </div>
      </div>
    </div>
  );
}; 