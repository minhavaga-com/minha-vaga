import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPageScreen } from '../screens/landing/landing';
import { PaymentPlans } from '../screens/PaymentPlans/PaymentPlans';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPageScreen />} />
      <Route path="/planos" element={<PaymentPlans />} />
    </Routes>
  );
};