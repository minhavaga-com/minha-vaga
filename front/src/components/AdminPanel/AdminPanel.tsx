import React, { useState } from 'react';
import { useAuth, UserRole } from '../../contexts/AuthContext';

export const AdminPanel: React.FC = () => {
  const { userData, updateUserRole, firebaseConfigured } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.BASIC_PLAN);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRoleUpdate = async () => {
    if (!userData) return;
    
    setLoading(true);
    setMessage('');
    
    try {
      let expirationDate: Date | undefined;
      
      if (selectedRole === UserRole.MONTHLY_PLAN) {
        expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 1);
      } else if (selectedRole === UserRole.ANNUAL_PLAN) {
        expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      }
      
      await updateUserRole(selectedRole, expirationDate);
      setMessage('Role atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar role:', error);
      setMessage('Erro ao atualizar role. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const getRoleDescription = (role: UserRole): string => {
    const descriptions = {
      [UserRole.RECRUITER]: 'Acesso completo a funcionalidades de recrutamento',
      [UserRole.ANNUAL_PLAN]: 'Acesso premium por 1 ano',
      [UserRole.MONTHLY_PLAN]: 'Acesso premium por 1 mês',
      [UserRole.BASIC_PLAN]: 'Acesso básico limitado',
    };
    return descriptions[role];
  };

  if (!firebaseConfigured) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        border: '1px solid #ddd', 
        borderRadius: '8px',
        maxWidth: '500px',
        margin: '2rem auto'
      }}>
        <h2>⚠️ Firebase não configurado</h2>
        <p>Para usar o painel administrativo, configure as variáveis de ambiente do Firebase.</p>
        <p>Consulte o arquivo <code>FIREBASE_AUTH_SETUP.md</code> para instruções detalhadas.</p>
      </div>
    );
  }

  if (!userData) {
    return <div>Carregando dados do usuário...</div>;
  }

  return (
    <div style={{ 
      padding: '2rem', 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      maxWidth: '500px',
      margin: '2rem auto'
    }}>
      <h2>Painel de Administração - Gerenciar Permissões</h2>
      
      <div style={{ marginBottom: '1rem' }}>
        <strong>Usuário Atual:</strong> {userData.displayName || userData.email}
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <strong>Role Atual:</strong> {userData.role}
        {userData.planExpirationDate && (
          <div style={{ fontSize: '0.9rem', color: '#666' }}>
            Expira em: {userData.planExpirationDate.toLocaleDateString('pt-BR')}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="role-select" style={{ display: 'block', marginBottom: '0.5rem' }}>
          <strong>Alterar para:</strong>
        </label>
        <select
          id="role-select"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value as UserRole)}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '0.5rem',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        >
          <option value={UserRole.BASIC_PLAN}>Plano Básico</option>
          <option value={UserRole.MONTHLY_PLAN}>Plano Mensal</option>
          <option value={UserRole.ANNUAL_PLAN}>Plano Anual</option>
          <option value={UserRole.RECRUITER}>Recrutador/Parceiro</option>
        </select>
        <div style={{ fontSize: '0.9rem', color: '#666' }}>
          {getRoleDescription(selectedRole)}
        </div>
      </div>

      {message && (
        <div style={{ 
          padding: '0.5rem', 
          marginBottom: '1rem',
          backgroundColor: message.includes('sucesso') ? '#d4edda' : '#f8d7da',
          color: message.includes('sucesso') ? '#155724' : '#721c24',
          border: `1px solid ${message.includes('sucesso') ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '4px'
        }}>
          {message}
        </div>
      )}

      <button
        onClick={handleRoleUpdate}
        disabled={loading || selectedRole === userData.role}
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: loading || selectedRole === userData.role ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading || selectedRole === userData.role ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Atualizando...' : 'Atualizar Role'}
      </button>

      <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
        <h4>Hierarquia de Permissões:</h4>
        <ol>
          <li><strong>Recrutador/Parceiro:</strong> Nível máximo de acesso</li>
          <li><strong>Plano Anual:</strong> Acesso premium completo</li>
          <li><strong>Plano Mensal:</strong> Acesso premium limitado</li>
          <li><strong>Plano Básico:</strong> Acesso básico</li>
        </ol>
        <p><em>Usuários com roles superiores têm acesso a funcionalidades de roles inferiores.</em></p>
      </div>
    </div>
  );
}; 