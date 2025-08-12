import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../../../shared/ui/Input/Input';
import { Button } from '../../../../shared/ui/Button/Button';
import { Checkbox } from '../../../../shared/ui/Checkbox/Checkbox';
import { authApi } from '../../../../shared/api/auth';
import { Eye, EyeOff } from 'lucide-react';

interface SignUpFormData {
  email: string;
  username: string;
  password: string;
  acceptTerms: boolean;
}

export const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    username: '',
    password: '',
    acceptTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await authApi.signUp({
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });
      navigate('/sign-in', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof SignUpFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl p-8 shadow-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Create an Account
        </h1>
        <p className="text-gray-600">
          Create an account to continue
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
            placeholder="johndoe@gmail.com"
            value={formData.email}
            onChange={handleInputChange('email')}
            required
            disabled={isLoading}
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <Input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange('username')}
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
              placeholder="••••••••"
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
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {/* Terms */}
        <div className="flex items-center">
          <Checkbox
            checked={formData.acceptTerms}
            onChange={handleInputChange('acceptTerms')}
            required
            disabled={isLoading}
          >
            I accept terms and conditions
          </Checkbox>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          fullWidth
          disabled={!formData.acceptTerms || isLoading}
        >
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </Button>

        {/* Footer */}
        <div className="text-center">
          <span className="text-gray-600">Already have an account? </span>
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
