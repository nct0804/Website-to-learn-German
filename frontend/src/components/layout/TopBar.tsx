import ProgressBar from '../top-bar/ProgressBar'; 
import Logo from '../top-bar/Logo';
import ProfileAndStats from '../top-bar/ProfileAndStats';
import { useAuth } from '@/hooks/useAuth';

export default function TopBar() {
  const { user } = useAuth();
  const level = user?.level ?? 1;
  const streak = user?.streak ?? 0;
  return (
    <header className="w-full bg-white flex items-center justify-between px-8 py-4 z-20">
      <Logo />
      <ProgressBar />
      <ProfileAndStats level={level} streak={streak} />
    </header>
  );
}
