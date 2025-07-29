import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignUpPage } from '../../pages/SignUpPage/SignUpPage';
import { SignInPage } from '../../pages/SignInPage/SignInPage';
import { ForgotPasswordPage } from '../../pages/ForgotPasswordPage/ForgotPasswordPage';
import { ResetPasswordPage } from '../../pages/ResetPasswordPage/ResetPasswordPage';
import { ProtectedRoute } from '../../shared/lib/auth/ProtectedRoute';


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute requireAuth={false}>
              <Navigate to="/dashboard" replace />
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
          path="/sign-in" 
          element={
            <ProtectedRoute requireAuth={false}>
              <SignInPage />
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
            <ProtectedRoute requireAuth={false}>
              <ResetPasswordPage />
            </ProtectedRoute>
          } 
        />
        
      </Routes>
    </BrowserRouter>
  );
};