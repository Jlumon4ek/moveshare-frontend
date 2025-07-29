import { useAuth } from '../../shared/lib/auth/useAuth';
import { authStore } from '../../shared/lib/auth/authStore';
import { Button } from '../../shared/ui/Button/Button';

export const DashboardPage = () => {
  const { user } = useAuth();

  const handleLogout = () => {
    authStore.clearAuth();
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to Dashboard! 🎉
              </h1>
              <p className="text-gray-600">
                Successfully signed in to MoveShare
              </p>
            </div>
            <Button onClick={handleLogout} variant="secondary">
              Logout
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">User Info:</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">ID:</span> {user?.user_id}</p>
                <p><span className="font-medium">Username:</span> {user?.username}</p>
                <p><span className="font-medium">Email:</span> {user?.email}</p>
              </div>
            </div>

            <div className="bg-primary/10 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">API Response:</h3>
              <p className="text-sm text-gray-600">
                Successfully authenticated with backend API! ✅
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};