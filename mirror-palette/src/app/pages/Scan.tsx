import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

export const Scan = () => {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    setIsScanning(true);
    // 1. カメラ起動
    // 2. OCR処理で商品番号抽出
    // 3. APIで画像取得
    setIsScanning(false);
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <div className="relative w-full aspect-square border-4 border-dashed border-pink-400 rounded-2xl flex items-center justify-center bg-white/50">
        <div className="absolute inset-0 bg-pink-500/10 animate-pulse" />
        <Camera size={64} className="text-pink-400" />
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-700">Tag Scan</h2>
        <p className="text-sm text-gray-500">ブランドタグの番号を写してね！</p>
      </div>

      <Button 
        onClick={handleScan}
        className="w-full h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full text-xl font-bold shadow-lg"
      >
        {isScanning ? "Scanning..." : "SCAN!"}
      </Button>
    </div>
  );
};
