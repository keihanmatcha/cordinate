import React, { useState, Suspense } from 'react' // useStateを追加
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { useDrag } from '@use-gesture/react'

// アバターと服を表示するコンポーネント
function AvatarModel({ clothesPath }) {
  // clothesPath を変えることで、スワイプ時にモデルを差し替える
  const { scene } = useGLTF(clothesPath)
  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />
}

export default function MainScreen() {
  // 1. 状態管理の定義
  const [index, setIndex] = useState(0);
  const clothesList = ["/models/2_compressed.glb", "/models/shirt.glb", "/models/hoodie.glb"];

  // 2. スワイプイベントの定義
  const bind = useDrag(({ swipe: [swipeX] }) => {
    if (swipeX === -1) { // 左スワイプで次の服
      setIndex((prev) => (prev + 1) % clothesList.length);
    } else if (swipeX === 1) { // 右スワイプで前の服
      setIndex((prev) => (prev - 1 + clothesList.length) % clothesList.length);
    }
  });
  return (
     <div {...bind()} style={{ width: '100vw', height: '100vh', position: 'relative', touchAction: 'none' }}>
       <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 10, textAlign: 'right' }}>
        <p>Region</p>
        <p style={{ fontSize: '2rem' }}>Temperature°C</p>
      </div>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        {/* 明るい照明設定 */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <Suspense fallback={null}>
          {/* ここにアバター本体と、選択中の服を表示 */}
          <AvatarModel clothesPath="./models/base_avatar.glb" />
          <AvatarModel clothesPath="./models/current_tops.glb" />
          <Environment preset="city" />
        </Suspense>

        {/* ユーザーが指でくるくる回せるようにする */}
        <OrbitControls enableZoom={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  )
}
