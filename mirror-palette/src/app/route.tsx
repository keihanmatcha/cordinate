import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';

// 軽量化した服を表示するパーツ
function Clothes({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  // 位置やサイズはアバターに合わせて調整してください
  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
}

const MainView = () => {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {/* 右上の天気・気温表示（HTMLレイヤー） */}
      <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1, textAlign: 'right' }}>
        <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Urayasu</p>
        <p style={{ fontSize: '40px', margin: 0 }}>18°C</p>
      </div>

      {/* 3Dアバター表示エリア */}
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} />
        
        <Suspense fallback={null}>
          {/* 下着（アバター本体） */}
          <Clothes modelPath="/models/underwear.glb" />
          {/* Tシャツ（今回作った 2_compressed.glb） */}
          <Clothes modelPath="/models/2_compressed.glb" />
          
          <Environment preset="city" />
          <ContactShadows opacity={0.4} scale={10} blur={2} far={10} />
        </Suspense>

        <OrbitControls enablePan={false} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
};

export default MainView;
