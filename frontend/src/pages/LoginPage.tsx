// src/pages/LoginPage.tsx
import React from 'react';
import LoginLeftPanel from '../components/login/LoginLeftPanel';
import LoginRightPanel from '../components/login/LoginRightPanel';
import AnimatedBackgroundEffects from '../components/custom/AnimatedBackgroundEffects';

export default function LoginPage() {
    return (
        <div className="h-screen grid grid-cols-[2fr_3fr]">
            <div className="flex flex-col items-center justify-center bg-white h-screen">
                <LoginLeftPanel />
            </div>
            <div className="blink-gradient relative overflow-hidden h-screen flex flex-col">
                <AnimatedBackgroundEffects />
                <div className="flex items-center justify-center flex-1 relative z-10">
                    <LoginRightPanel />
                </div>
            </div>
        </div>
    );
}