// src/pages/LoginPage.tsx
import React from 'react';
import LoginLeftPanel from '../components/login/LoginLeftPanel';
import LoginRightPanel from '../components/login/LoginRightPanel';

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-[2fr_3fr]">
      {/* Left: form */}
      <div className="flex items-center justify-center bg-white">
        <LoginLeftPanel />
      </div>
      {/* Right: placeholder */}
<div className="flex items-center justify-center bg-gradient-to-br from-[#feb123] to-[#fe9a0b]">    
    <LoginRightPanel />
      </div>
    </div>
  );
}
