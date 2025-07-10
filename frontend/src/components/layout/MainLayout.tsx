import LeftBar from './LeftBar';
import TopBar from './TopBar';
import RightBar from '@/components/layout/RightBar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="flex flex-col h-screen px-8 py-4 bg-[#FBFBFC] min-w-[1400px]">
      <TopBar />
      <div className="flex flex-1 overflow-hidden h-full">
        <LeftBar/>
        <Outlet />
        <RightBar />
      </div>
    </div>
  );
}
