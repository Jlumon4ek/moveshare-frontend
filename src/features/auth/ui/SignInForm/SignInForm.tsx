import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../../../shared/ui/Input/Input';
import { Button } from '../../../../shared/ui/Button/Button';
import { authApi } from '../../../../shared/api/auth';
import { authStore } from '../../../../shared/lib/auth/authStore';
import { Eye, EyeOff } from 'lucide-react';

interface SignInFormData {
  identifier: string; 
  password: string;
  rememberPassword: boolean;
}

export const SignInForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignInFormData>({
    identifier: '',
    password: '',
    rememberPassword: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authApi.signIn({
        identifier: formData.identifier,
        password: formData.password,
      });

      authStore.setAuth(
        {
          access_token: response.access_token,
          refresh_token: response.refresh_token,
        },
        {
          user_id: response.user_id,
          username: response.username,
          email: response.email,
        }
      );

      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof SignInFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (error) setError('');
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl p-8 shadow-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Login to Account
        </h1>
        <p className="text-gray-600">
          Please enter your email and password to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email address:
          </label>
          <Input
            type="email"
            placeholder="tolebi_baitassov@gmail.com"
            value={formData.identifier}
            onChange={handleInputChange('identifier')}
            required
            disabled={isLoading}
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••"
              value={formData.password}
              onChange={handleInputChange('password')}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}
        {/* Submit */}
        <Button
          type="submit"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        {/* Footer */}
        <div className="text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link
            to="/sign-up"
            className="text-primary hover:text-primary/80 font-medium"
          >
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
};
