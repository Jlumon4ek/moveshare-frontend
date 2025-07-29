import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignUpPage } from '../../pages/SignUpPage/SignUpPage';
import { SignInPage } from '../../pages/SignInPage/SignInPage';
import { ForgotPasswordPage } from '../../pages/ForgotPasswordPage/ForgotPasswordPage';
import { ResetPasswordPage } from '../../pages/ResetPasswordPage/ResetPasswordPage';
import { ProtectedRoute } from '../../shared/lib/auth/ProtectedRoute';
import { MainLayout } from '../layouts/MainLayout';
import { DashboardPage } from '../../pages/DashboardPage/DashboardPage';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage'
import { FleetManagement } from '../../widgets/FleetManagement/ui/FleetManagement'; 
import { CompanyInformation } from '../../widgets/CompanyInformation/ui/CompanyInformation';
import { PaymentSettings } from '../../widgets/PaymentSettings/ui/PaymentSettings';
import { NotificationSettings } from '../../widgets/NotificationSettings/ui/NotificationSettings';
import { SecuritySettings } from '../../widgets/SecuritySettings/ui/SecuritySettings';


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/sign-in"
          element={
            <ProtectedRoute requireAuth={false}>
              <SignInPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <ProtectedRoute requireAuth={false}>
              <SignUpPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute requireAuth={false}>
              <ForgotPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute requireAuth={true}>
              <ResetPasswordPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute requireAuth={true}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />

          <Route path="profile" element={<ProfilePage />}>
            <Route index element={<Navigate to="fleet" replace />} />
            <Route path="fleet" element={<FleetManagement />} />
            <Route path="company" element={<CompanyInformation />} /> 
            <Route path="payment" element={<PaymentSettings />} />
            <Route path="notifications" element={<NotificationSettings />} /> 
            <Route path="security" element={<SecuritySettings />} />

          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};