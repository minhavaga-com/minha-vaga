import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPageScreen } from '../screens/landing/landing';
import { PaymentPlans } from '../screens/PaymentPlans/PaymentPlans';
import { ContactScreen } from '../screens/Contact/Contact';
import { LoginScreen } from '../screens/Login/Login';
import { CheckoutScreen } from '../screens/CheckoutScreen/CheckoutScreen';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPageScreen />} />
      <Route path="/planos" element={<PaymentPlans />} />
      <Route path="/contato" element={<ContactScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/checkout/:planId" element={<CheckoutScreen />} />
    </Routes>
  );
};