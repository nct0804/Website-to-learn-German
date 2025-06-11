// src/pages/LoginPage.tsx
import React from 'react';
import LoginLeftPanel from '../components/login/LoginLeftPanel';
import LoginRightPanel from '../components/login/LoginRightPanel';

export default function LoginPage() {
    return (
        <div className="min-h-screen grid grid-cols-[2fr_3fr]">
            <div className="flex items-center justify-center bg-white">
                <LoginLeftPanel />
            </div>
            <div className="flex items-center justify-center blink-gradient">
                <LoginRightPanel />
            </div>
        </div>
    );
}
