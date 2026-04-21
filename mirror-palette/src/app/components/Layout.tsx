import React from 'react';
import { Navigation } from './Navigation';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-pink-50 shadow-2xl overflow-hidden relative font-sans">
      {/* メインコンテンツ表示エリア */}
      <main className="flex-grow overflow-y-auto">
        {children}
      </main>
      
      {/* 下部メニュー */}
      <Navigation />
    </div>
  );
};
