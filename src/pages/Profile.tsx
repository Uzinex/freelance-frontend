import { useEffect, useState } from 'react';
import Reviews from '../components/Reviews';
import { useAuthStore } from '../store/authStore';

interface ProfileData {
  id: number;
  username?: string;
}

export default function Profile() {
  const token = useAuthStore((state) => state.accessToken);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setProfile({ id: payload.user_id, username: payload.username });
      } catch {
        setProfile(null);
      }
    }
  }, [token]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">{profile.username || 'Profile'}</h1>
      <Reviews userId={profile.id} canReview={false} />
    </div>
  );
}

