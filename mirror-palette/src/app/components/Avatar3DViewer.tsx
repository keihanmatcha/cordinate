import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, useGLTF } from '@react-three/drei';
import { AvatarModel } from './AvatarModel';

interface Props {
  currentOutfit: {
    tops: string;
    bottoms: string;
    shoes: string;
  };
}

export const Avatar3DViewer = ({ currentOutfit }: Props) => {
  return (
    <div className="h-[60vh] w-full bg-gradient-to-b from-pink-200 via-white to-purple-100 relative">
      {/* 筐体ゲームのようなキラキラ背景演出（CSS） */}
      <div className="absolute inset-0 opacity-30 pointer-events-none sparkle-bg" />

      <Canvas shadows camera={{ position: [0, 1.2, 3.5], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <Suspense fallback={null}>
          {/* アバター本体と着せ替えロジック */}
          <AvatarModel 
            topsId={currentOutfit.tops} 
            bottomsId={currentOutfit.bottoms} 
            shoesId={currentOutfit.shoes} 
          />
          <Environment preset="city" />
        </Suspense>

        {/* 地面の影 */}
        <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
        
        {/* モバイルでの回転操作。ズームと上下回転を制限して「着せ替え」に集中させる */}
        <OrbitControls 
          enablePan={false} 
          minPolarAngle={Math.PI / 2.5} 
          maxPolarAngle={Math.PI / 1.8} 
          minDistance={2} 
          maxDistance={5}
        />
      </Canvas>

      {/* 温度・湿度のフローティング表示（ゲームUI風） */}
      <div className="absolute top-4 right-4 glass-card p-3 text-xs font-bold text-pink-600 animate-bounce-slow">
        NOW: 24℃ / 65%
      </div>
    </div>
  );
};
