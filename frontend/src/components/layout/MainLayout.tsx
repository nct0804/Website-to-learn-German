import LeftBar from './LeftBar';
import TopBar from './TopBar';
import RightBar from '@/components/layout/RightBar';
import MainContent from '@/components/layout/MainContent';

export default function MainLayout() {
  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex flex-1 overflow-hidden h-full">
        <LeftBar/>
        <MainContent/>
        <RightBar />
      </div>
    </div>
  );
}
