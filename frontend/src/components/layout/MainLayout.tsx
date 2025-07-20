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
        <div className="w-full mx-auto min-h-0 overflow-y-auto
        max-w-3xl xl:max-w-3xl 2xl:max-w-4xl">
          <Outlet />
        </div>
        <RightBar />
      </div>
    </div>
  );
}
