import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'

// アバターと服を表示するコンポーネント
function AvatarModel({ clothesPath }) {
  // clothesPath を変えることで、スワイプ時にモデルを差し替える
  const { scene } = useGLTF(clothesPath)
  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />
}

export default function MainScreen() {
  return (
    <div style={{ width: '100vw', height: '80vh', position: 'relative' }}>
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
