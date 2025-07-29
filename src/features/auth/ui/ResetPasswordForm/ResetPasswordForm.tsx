import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '../../../../shared/ui/Input/Input';
import { Button } from '../../../../shared/ui/Button/Button';

interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Reset password:', formData.newPassword);
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/sign-in', {
        replace: true,
        state: { message: 'Password reset successful! Please sign in with your new password.' },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password reset failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof ResetPasswordFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (error) setError('');
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl p-8 shadow-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Reset Your Password
        </h1>
        <p className="text-gray-600">
          Type your new password below to renew access to<br />
          your account!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <div className="relative">
            <Input
              type={showNewPassword ? 'text' : 'password'}
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleInputChange('newPassword')}
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(prev => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Repeat New Password
          </label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Repeat New Password"
              value={formData.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(prev => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <Button
          type="submit"
          fullWidth
          disabled={isLoading || !formData.newPassword || !formData.confirmPassword}
        >
          {isLoading ? 'Resetting...' : 'Reset Password and Login'}
        </Button>
      </form>
    </div>
  );
};
