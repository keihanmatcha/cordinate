import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage } from '@react-three/drei';
import { Heart, Plus } from 'lucide-react'; // Plus をここにまとめました
import { useNavigate } from 'react-router-dom';

function Model({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
}

const Closet = () => {
  const navigate = useNavigate(); // ここを追加しました

  // 1. アイテムリスト
  const items = [
    { id: 1, name: "カジュアルTシャツ", path: "/models/current_tops.glb", category: "casual" },
    { id: 2, name: "勝負服（パーティー）", path: "/models/onepiece.glb", category: "party" },
    { id: 3, name: "ビジネスシャツ", path: "/models/current_tops.glb", category: "formal" },
    { id: 4, name: "トレーニングウェア", path: "/models/current_tops.glb", category: "sport" },
    { id: 5, name: "カーゴパンツ", path: "/models/cargopants.glb", category: "casual" },
  ];

  // 2. カテゴリカラー設定
  const categoryColors: { [key: string]: string } = {
    casual: "border-red-400 bg-red-50",
    party: "border-yellow-400 bg-yellow-50",
    formal: "border-blue-400 bg-blue-50",
    sport: "border-green-400 bg-green-50",
  };

  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative min-h-screen pb-32 bg-gray-50/50">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-brand-purple-dark mb-6">My Closet</h1>
        
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => {
            const isFavorite = favorites.includes(item.id);
            const colorClass = categoryColors[item.category] || "border-gray-200 bg-gray-50";
            
            return (
              <div 
                key={item.id} 
                className={`bg-white p-4 rounded-xl shadow-sm border-2 ${colorClass.split(' ')[0]} relative`}
              >
                <div className={`aspect-square rounded-lg mb-2 overflow-hidden relative ${colorClass.split(' ')[1]}`}>
                  <Canvas shadows camera={{ position: [0, 0, 2], fov: 50 }}>
                    <Suspense fallback={null}>
                      <Stage environment="city" intensity={0.5} contactShadow={false}>
                        <Model path={item.path} />
                      </Stage>
                    </Suspense>
                    <OrbitControls enableZoom={false} autoRotate />
                  </Canvas>

                  <button 
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute bottom-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm z-10"
                  >
                    <Heart 
                      size={18} 
                      fill={isFavorite ? "#ff85a2" : "none"} 
                      color={isFavorite ? "#ff85a2" : "#ccc"} 
                    />
                  </button>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm font-bold text-gray-700 truncate mr-1">{item.name}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-400 uppercase flex-shrink-0">
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 登録用フローティングボタン */}
      <button 
        onClick={() => navigate('/register')}
        className="fixed bottom-24 right-6 w-16 h-16 bg-brand-pink text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-50"
      >
        <Plus size={32} strokeWidth={3} />
      </button>
    </div>
  );
};

export default Closet;