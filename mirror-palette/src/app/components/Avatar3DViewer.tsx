import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

interface Props {
  currentOutfit: {
    tops?: string;
    bottoms?: string;
  };
}

export const Avatar3DViewer = ({ currentOutfit }: Props) => {
  return (
    <div className="h-[500px] w-full bg-gradient-to-b from-pink-100 to-purple-200">
      <Canvas camera={{ position: [0, 1, 3] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <AvatarModel outfit={currentOutfit} />
        </Suspense>
        <OrbitControls enablePan={false} minDistance={2} maxDistance={5} />
      </Canvas>
    </div>
  );
};

function AvatarModel({ outfit }: any) {
  // ここでBlenderから書き出した素体(.glb)を読み込む
  const { scene } = useGLTF('/models/base_avatar.glb');
  
  // 着せ替えロジック：outfitのIDに基づいてメッシュを動的に切り替え
  return <primitive object={scene} />;
}
