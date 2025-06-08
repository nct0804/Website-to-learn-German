import ProgressBar from '../top-bar/ProgressBar';
import Logo from '../top-bar/Logo';
import ProfileAndStats from '../top-bar/ProfileAndStats';

export default function TopBar() {
  return (
    <header className="w-full bg-white flex items-center justify-between px-8 py-4 z-20">
      <Logo />
      <ProgressBar />
      <ProfileAndStats />
    </header>
  );
}
