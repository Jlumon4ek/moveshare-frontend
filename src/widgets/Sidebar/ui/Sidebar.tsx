import { NavLink, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { 
  LayoutDashboard, Search, List, MessageSquare, CheckSquare, User, LogOut, Home 
} from 'lucide-react';
import { authStore } from '../../../shared/lib/auth/authStore';
import logoIcon from '../../../shared/assets/icons/logo.svg';

const Logo = () => (
  <div className="flex items-center gap-3 px-3 mb-6">
    <img src={logoIcon} alt="MoveShare Logo" className="w-8 h-8" />
    <span className="text-xl font-bold text-gray-800">MoveShare</span>
  </div>
);

const navLinks = [
  { to: '/welcome', icon: Home, label: 'Welcome' },
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/available-jobs', icon: Search, label: 'Available Jobs' },
  { to: '/my-jobs', icon: List, label: 'My jobs' },
  { to: '/chats', icon: MessageSquare, label: 'Chats' },
  { to: '/claimed-jobs', icon: CheckSquare, label: 'Claimed Jobs' },
  { to: '/profile', icon: User, label: 'Profile' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authStore.clearAuth();
    navigate('/sign-in', { replace: true });
    onClose();
  };

  const handleLinkClick = () => {
    onClose(); // Закрыть сайдбар при клике на ссылку
  };

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-4 p-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-primary text-white'
        : 'text-gray-600 hover:bg-primary/10 hover:text-primary'
    }`;

  return (
    <>
      {/* Overlay */} 
      <div 
        className={`fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      <aside 
        className={`fixed top-0 left-0 z-50 flex flex-col w-64 h-screen p-4 bg-white shadow-lg lg:shadow-md lg:relative lg:translate-x-0 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        
        <div className="flex items-center justify-between mb-6">
          <Logo />
          <button className="lg:hidden p-1 text-gray-500 hover:text-gray-800" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {navLinks.map(link => (
            <NavLink to={link.to} key={link.to} className={linkClasses} onClick={handleLinkClick}>
              <link.icon size={20} />
              <span className="font-medium">{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-4 p-3 mt-auto text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </aside>
    </>
  );
};