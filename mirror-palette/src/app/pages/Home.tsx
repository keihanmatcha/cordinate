import React, { useState } from 'react';
import { Avatar3DViewer } from '../components/Avatar3DViewer';

export const Home = () => {
  const [outfit, setOutfit] = useState({
    tops: 'UNIQLO-T-001',
    bottoms: 'ZARA-SKIRT-002'
  });

  return (
    <div className="relative h-screen overflow-hidden bg-pink-50">
      {/* 3Dアバター表示 */}
      <Avatar3DViewer currentOutfit={outfit} />

      {/* スワイプ選択UI (オーバーレイ) */}
      <div className="absolute bottom-0 w-full p-4 space-y-4 bg-white/80 backdrop-blur-md rounded-t-3xl border-t border-pink-200">
        <div className="flex flex-col space-y-2">
          <label className="text-xs font-bold text-pink-500 uppercase tracking-widest">Tops</label>
          <div className="flex overflow-x-auto space-x-4 pb-2 snap-x">
             {/* ここでスワイプ可能なアイテムカードを並べる */}
             <div className="w-24 h-24 bg-pink-100 rounded-lg flex-shrink-0 snap-center border-2 border-pink-400" />
             <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 snap-center" />
             <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 snap-center" />
          </div>
        </div>
      </div>

      {/* 天気アドバイス */}
      <div className="absolute top-6 left-6 right-6 p-4 bg-white/90 rounded-2xl shadow-sm border border-pink-100">
        <p className="text-sm font-medium text-purple-600">
          「今日は湿気が多いから、髪が広がりにくい首元すっきりのコーデにしたよ！✨」
        </p>
      </div>
    </div>
  );
};
