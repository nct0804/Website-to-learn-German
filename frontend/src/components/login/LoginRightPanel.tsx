import React from 'react';
import SplitText from '../custom/SplitText';

export default function LoginRightPanel() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-white text-center p-8">
       <SplitText
      text="Meister Deutsch mit uns"
      className="text-4xl font-bold block text-white"
      delay={100}
      duration={0.6}
      ease="power3.out"
      splitType="chars"
      from={{ opacity: 0, y: 40, scale: 0.8 }}
      to={{ opacity: 1, y: 0, scale: 1 }}
      threshold={0.1}
      rootMargin="-100px"
      textAlign="center"
      onLetterAnimationComplete={() => console.log('Text animated!')}
    />
      </div>
    </div>
  );
}