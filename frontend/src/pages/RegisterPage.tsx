// src/pages/RegisterPage.tsx
import React from 'react';
import RegisterLeftPanel from '../components/login/RegisterLeftPanel';
import LoginRightPanel from '../components/login/LoginRightPanel';
import AnimatedBackgroundEffects from '../components/custom/AnimatedBackgroundEffects';


export default function RegisterPage() {
  return (
    <div className="min-h-screen grid grid-cols-[2fr_3fr]">
      <div className="flex items-center justify-center bg-white">
        <RegisterLeftPanel />
      </div>
      <div className="blink-gradient relative overflow-hidden">
        <AnimatedBackgroundEffects />
        <div className="flex items-center justify-center h-full relative z-10">
          <LoginRightPanel />
        </div>
      </div>
    </div>
  );
}

