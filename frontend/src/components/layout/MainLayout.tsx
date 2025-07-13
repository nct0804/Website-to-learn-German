import LeftBar from './LeftBar';
import TopBar from './TopBar';
import RightBar from '@/components/layout/RightBar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="flex flex-col h-screen px-8 py-4 bg-[#FBFBFC] dark:bg-gray-900 min-w-[1400px] transition-colors duration-300">
      <TopBar />
      <div className="flex flex-1 overflow-hidden h-full">
        <LeftBar/>
        <div className="flex-1 min-h-0 overflow-y-auto">
          <Outlet />
        </div>
        <RightBar />
      </div>
    </div>
  );
}
