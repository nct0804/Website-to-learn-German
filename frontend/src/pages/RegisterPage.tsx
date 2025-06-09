// src/pages/RegisterPage.tsx
import React from 'react';
import RegisterLeftPanel from '../components/login/RegisterLeftPanel';
import LoginRightPanel from '../components/login/LoginRightPanel';

export default function RegisterPage() {
  return (
    <div className="min-h-screen grid grid-cols-[2fr_3fr]">
      <div className="flex items-center justify-center bg-white">
        <RegisterLeftPanel />
      </div>
<div className="flex items-center justify-center bg-gradient-to-br from-[#f9a200] to-[#ffbb00]">    <LoginRightPanel />
      </div>
    </div>
  );
}
