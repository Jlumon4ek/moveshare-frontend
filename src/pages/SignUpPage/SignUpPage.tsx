import { SignUpForm } from '../../features/auth/ui/SignUpForm/SignUpForm';

export const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignUpForm />
      </div>
    </div>
  );
};