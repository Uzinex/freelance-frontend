import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/authStore';

export default function Logout() {
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const logoutStore = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
      logoutStore();
      navigate('/login');
    };
    void doLogout();
  }, [refreshToken, logoutStore, navigate]);

  return <div>Logging out...</div>;
}
