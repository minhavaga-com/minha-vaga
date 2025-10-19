import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPageScreen } from '../screens/landing/landing';
import { PaymentPlans } from '../screens/PaymentPlans/PaymentPlans';
import { ContactScreen } from '../screens/Contact/Contact';
import { LoginScreen } from '../screens/Login/Login';
import { CheckoutScreen } from '../screens/CheckoutScreen/CheckoutScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';
import { UserRole } from '../contexts/AuthContext';
import { AdminPanel } from '../components/AdminPanel/AdminPanel';
import { UserDashboard } from '../components/UserDashboard/UserDashboard';
import { LinkedInSearchScreen } from '../screens/LinkedInSearch/LinkedInSearch';
import { CompaniesScreen } from '../screens/CompaniesScreen/CompaniesScreen';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPageScreen />} />
      <Route path="/planos" element={<PaymentPlans />} />
      <Route path="/contato" element={<ContactScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/checkout/:planId" element={<CheckoutScreen />} />
      <Route 
        path="/home" 
        element={
          <ProtectedRoute requiredRole={UserRole.BASIC_PLAN}>
            <HomeScreen />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute requireAuth={true}>
            <UserDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requireAuth={true}>
            <AdminPanel />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/linkedin-search" 
        element={<LinkedInSearchScreen />} 
      />
      <Route 
        path="/empresas" 
        element={<CompaniesScreen />} 
      />
    </Routes>
  );
};