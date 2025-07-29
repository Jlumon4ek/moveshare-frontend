import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../../../shared/ui/Input/Input';
import { Button } from '../../../../shared/ui/Button/Button';

interface ForgotPasswordFormData {
  email: string;
  code: string;
}

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: '',
    code: '',
  });

  const [emailError, setEmailError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCodeError('');

    const isCodeCorrect = formData.code === '123456';

    if (!isCodeCorrect) {
      setCodeError('Incorrect code. Please try again.');
    } else {
      navigate('/reset-password', { replace: true });
    }
  };

  const handleSendCode = () => {
    const emailExists = formData.email.includes('tolebi'); 
    
    if (!emailExists) {
      setEmailError('We cannot find your email');
      setEmailSent(false);
    } else {
      setEmailError('');
      setEmailSent(true);
      setCountdown(60);
    }
  };

  const handleInputChange = (field: keyof ForgotPasswordFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));

    if (field === 'email') setEmailError('');
    if (field === 'code') setCodeError('');
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl p-8 shadow-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Forgot Password?
        </h1>
        <p className="text-gray-600">
          Enter your email and we will send you a<br />
          code to reset your password!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email address:
          </label>
          <div className="flex gap-2 items-start">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="tolebi.baitassov@gmail.com"
                value={formData.email}
                onChange={handleInputChange('email')}
                required
              />
            </div>
            <Button
              type="button"
              onClick={handleSendCode}
              disabled={!formData.email || countdown > 0}
              className="px-4 whitespace-nowrap flex-shrink-0"
            >
              {countdown > 0 ? `${countdown}s` : 'Send a code'}
            </Button>
          </div>

          {emailError && (
            <p className="mt-2 ml-2 text-sm text-red-500">{emailError}</p>
          )}
          {emailSent && (
            <p className="mt-2 ml-2 text-sm text-green-500 font-medium">
              Check your inbox!
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Code:
          </label>
          <Input
            type="text"
            placeholder="Type received code here..."
            value={formData.code}
            onChange={handleInputChange('code')}
            required
          />
          {codeError && (
            <p className="mt-2 ml-2 text-sm text-red-500">{codeError}</p>
          )}
        </div>

        <Button type="submit" fullWidth>
          Submit
        </Button>

        <div className="text-center">
          <span className="text-gray-600">Remember your password? </span>
          <Link
            to="/sign-in"
            className="text-primary hover:text-primary/80 font-medium"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};
