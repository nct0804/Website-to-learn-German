// src/pages/LoginPage.tsx
import React from 'react';
import LoginLeftPanel from '../components/login/LoginLeftPanel';
import LoginRightPanel from '../components/login/LoginRightPanel';
import AnimatedBackgroundEffects from '../components/custom/AnimatedBackgroundEffects';

export default function LoginPage() {
    return (
        <div className="min-h-screen grid grid-cols-[2fr_3fr]">
            <div className="flex items-center justify-center bg-white">
                <LoginLeftPanel />
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