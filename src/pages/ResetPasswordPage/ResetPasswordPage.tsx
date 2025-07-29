import { ResetPasswordForm } from '../../features/auth/ui/ResetPasswordForm/ResetPasswordForm';

export const ResetPasswordPage = () => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ResetPasswordForm />
      </div>
    </div>
  );
};