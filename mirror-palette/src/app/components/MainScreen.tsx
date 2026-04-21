import React, { useState, Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'

function Model({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
}

export default function MainScreen() {
  // --- 状態管理 (State) ---
  const [topIndex, setTopIndex] = useState(0);
  const [underIndex, setUnderIndex] = useState(0);
  const [weatherData, setWeatherData] = useState({ temp: 20, name: "Tokyo" });
  const [searchQuery, setSearchQuery] = useState("");

  // --- モデルリスト ---
  const topsList = ["/models/onepiece.glb", "/models/current_tops.glb", "/models/shirt.glb", "/models/hoodie.glb"];
  const underList = ["/models/cargopants.glb", "/models/pants.glb"]; // パンツ等のファイル名に合わせて変更してください

  // --- 天気API連携 ---
  const fetchWeather = async (targetCity: string) => {
    const API_KEY = "008fdf46ace34f9c9671fa048e797180"; 
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${targetCity}&appid=${API_KEY}&units=metric&lang=ja`
      );
      const data = await res.json();
      if (data.main) {
        setWeatherData({
          temp: Math.round(data.main.temp),
          name: data.name
        });
      } else {
        alert("都市が見つかりませんでした");
      }
    } catch (err) {
      console.error("天気情報の取得に失敗しました", err);
    }
  };

  useEffect(() => {
    fetchWeather("Tokyo");
  }, []);

  // --- ハンドラー ---
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) fetchWeather(searchQuery);
  };

  const nextTop = () => setTopIndex((prev) => (prev + 1) % topsList.length);
  const prevTop = () => setTopIndex((prev) => (prev - 1 + topsList.length) % topsList.length);
  const nextUnder = () => setUnderIndex((prev) => (prev + 1) % underList.length);
  const prevUnder = () => setUnderIndex((prev) => (prev - 1 + underList.length) % underList.length);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', touchAction: 'none', backgroundColor: '#fdf2f8' }}>
      
      {/* 1. 検索窓（最前面・最上部） */}
      <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 30 }}>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input 
            type="text" 
            placeholder="都市名" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-full border border-pink-100 shadow-md focus:outline-none bg-white/90"
          />
          <button type="submit" className="bg-brand-pink text-white px-4 py-2 rounded-full text-sm font-bold shadow-md active:scale-95 transition-transform">検索</button>
        </form>
      </div>

      {/* 2. メインUIレイヤー（中央コンテナ） */}
      <div className="absolute inset-0 mx-auto w-full max-w-md pointer-events-none z-20">
        
        {/* 左側：地名と気温 */}
        <div className="absolute top-[35%] left-4 pointer-events-auto">
          <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">{weatherData.name}</p>
          <div className="flex items-start">
            <span className="text-6xl font-black text-brand-purple-dark leading-none">{weatherData.temp}</span>
            <span className="text-2xl font-bold text-brand-purple-dark ml-1">°C</span>
          </div>
        </div>

        {/* 右側：切り替えボタン */}
        <div className="absolute top-[35%] right-4 flex flex-col gap-8 pointer-events-auto">
          <div className="flex flex-col items-center">
            <p className="text-[10px] font-bold text-pink-400 mb-2 uppercase">Tops</p>
            <button onClick={nextTop} className="bg-white/90 w-14 h-14 rounded-2xl shadow-lg border-b-4 border-pink-100 flex items-center justify-center text-xl active:border-b-0 active:translate-y-1 transition-all">👗</button>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-[10px] font-bold text-purple-400 mb-2 uppercase">Bottoms</p>
            <button onClick={nextUnder} className="bg-white/90 w-14 h-14 rounded-2xl shadow-lg border-b-4 border-purple-100 flex items-center justify-center text-xl active:border-b-0 active:translate-y-1 transition-all">👖</button>
          </div>
        </div>

        {/* 下部：操作ガイド（ここを1つに統合） */}
        <div className="absolute bottom-10 left-0 w-full text-center">
          <p className="text-[10px] text-gray-400 font-bold tracking-widest bg-white/40 backdrop-blur-sm inline-block px-4 py-1 rounded-full uppercase">
            Drag to rotate / Buttons to change
          </p>
        </div>
      </div>

      {/* 3. 3D Canvas */}
      <Canvas camera={{ position: [0, 1.2, 20.0], fov: 30 }}>
        <ambientLight intensity={2.0} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <Model path="/models/base_avatar.glb" />
          <Model path={topsList[topIndex]} />
          <Model path={underList[underIndex]} />
          <Environment preset="city" />
        </Suspense>
        {/* ズームと平行移動を無効化 */}
        <OrbitControls enableZoom={false} enablePan={false} target={[0, 0.9, 0]} makeDefault />
      </Canvas>

    </div>
  );
}
