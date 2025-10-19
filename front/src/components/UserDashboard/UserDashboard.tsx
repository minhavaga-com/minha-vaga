import React from 'react';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import {
  Container,
  Header,
  LogoutButton,
  Section,
  InfoGrid,
  RoleBadge,
  FeatureList,
  FeatureItem,
  PermissionGrid,
  PermissionBox
} from './styles';

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
    <Container>
      <Header>
        <h1>Dashboard do Usuário</h1>
        <LogoutButton onClick={logout}>
          Sair
        </LogoutButton>
      </Header>

      <Section>
        <h2>Informações da Conta</h2>
        <InfoGrid>
          <p><strong>Nome:</strong> {userData.displayName || 'Não informado'}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p>
            <strong>Plano:</strong> 
            <RoleBadge $color={getRoleColor(userData.role)}>
              {userData.role.replace('_', ' ').toUpperCase()}
            </RoleBadge>
          </p>
          {userData.planExpirationDate && (
            <p>
              <strong>Expira em:</strong> {userData.planExpirationDate.toLocaleDateString('pt-BR')}
            </p>
          )}
        </InfoGrid>
      </Section>

      <Section>
        <h2>Suas Funcionalidades</h2>
        <FeatureList>
          {getRoleFeatures(userData.role).map((feature, index) => (
            <FeatureItem key={index}>
              ✅ {feature}
            </FeatureItem>
          ))}
        </FeatureList>
      </Section>

      <Section>
        <h2>Verificação de Permissões</h2>
        <PermissionGrid>
          <PermissionBox $hasPermission={hasPermission(UserRole.BASIC_PLAN)}>
            <strong>Acesso Básico:</strong> {hasPermission(UserRole.BASIC_PLAN) ? '✅ Permitido' : '❌ Negado'}
          </PermissionBox>

          <PermissionBox $hasPermission={hasPermission(UserRole.MONTHLY_PLAN)}>
            <strong>Funcionalidades Premium:</strong> {hasPermission(UserRole.MONTHLY_PLAN) ? '✅ Permitido' : '❌ Negado'}
          </PermissionBox>

          <PermissionBox $hasPermission={hasPermission(UserRole.ANNUAL_PLAN)}>
            <strong>Acesso Anual:</strong> {hasPermission(UserRole.ANNUAL_PLAN) ? '✅ Permitido' : '❌ Negado'}
          </PermissionBox>

          <PermissionBox $hasPermission={hasPermission(UserRole.RECRUITER)}>
            <strong>Ferramentas de Recrutamento:</strong> {hasPermission(UserRole.RECRUITER) ? '✅ Permitido' : '❌ Negado'}
          </PermissionBox>
        </PermissionGrid>
      </Section>
    </Container>
  );
}; 