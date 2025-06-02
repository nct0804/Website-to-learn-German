// src/layouts/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import HeaderPanel from '../components/HeaderPanel';
import { useState } from 'react';
import QuotePanel from '@/components/QuotePanel';

export default function MainLayout() {
  const [isExpanded, setIsExpanded] = useState(true);
  const sidebarMargin = isExpanded ? 'ml-[200px]' : 'ml-16';

  return (
    <div className="flex h-screen">
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      <div
        className={`
          ${sidebarMargin}    
          flex-1                  
          relative                
        `}
      >
        <div className="pt-16 flex justify-center overflow-auto h-full">
          <div className="w-full max-w-3xl px-4">
            <Outlet />
          </div>
        </div>
      </div>

      <aside className="w-[25%] min-w-[250px] bg-white border-l border-gray-200 p-6">
        <HeaderPanel />
        <QuotePanel />
      </aside>
    </div>
  );
}
