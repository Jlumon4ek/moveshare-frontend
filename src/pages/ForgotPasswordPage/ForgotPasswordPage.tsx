import { ForgotPasswordForm } from '../../features/auth/ui/ForgotPasswordForm/ForgotPasswordForm';

export const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};