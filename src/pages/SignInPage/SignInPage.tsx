import { SignInForm } from '../../features/auth/ui/SignInForm/SignInForm';

export const SignInPage = () => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignInForm />
      </div>
    </div>
  );
};