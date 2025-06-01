import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';

export default function MainLayout() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="flex">
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <main
        className={`transition-all duration-300 ${
          isExpanded ? 'ml-1/8 min-ml-[200px]' : 'ml-16'
        } flex-1 p-4`}
      >
        <Outlet />
      </main>
    </div>
  );
}
