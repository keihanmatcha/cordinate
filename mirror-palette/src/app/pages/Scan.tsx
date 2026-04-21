import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { storage } from '../utils/storage';

export const Scan = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);

  // カメラでスキャンした時の疑似処理
  const onScanSuccess = (code: string) => {
    // 例: UNIQLOの番号形式 (6桁) ならTシャツテンプレートを割り当て
    const isUniqlo = /^\d{6}$/.test(code);
    
    const newItem = {
      id: `item-${Date.now()}`,
      brand: isUniqlo ? 'UNIQLO' : 'ZARA',
      productNumber: code,
      imageUrl: `/images/placeholder-${isUniqlo ? 'tshirt' : 'pants'}.png`, // 仮の画像
      category: isUniqlo ? 'Tops' : 'Bottoms',
      templateModel: isUniqlo ? 't_shirt_base' : 'pants_base', // ここが重要！
      attributes: { tempMin: 15, tempMax: 25, humidityResistant: false }
    };

    storage.saveItem(newItem);
    setScanResult(code);
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center h-full space-y-8 bg-pink-50">
      <div className="w-64 h-64 border-4 border-brand-pink rounded-3xl relative overflow-hidden bg-black">
        {/* ここにカメラプレビューが表示される */}
        <div className="scan-line" /> 
        <div className="absolute inset-0 flex items-center justify-center text-white opacity-50 text-xs">
          Align tag number here
        </div>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-brand-purple">CARD GENERATOR</h2>
        <p className="text-xs font-bold text-gray-400">タグの番号を読み取ってカードを作ろう！</p>
      </div>

      <Button onClick={() => onScanSuccess("464850")} className="btn-magic w-full h-16 text-xl">
        SCAN START!
      </Button>

      {scanResult && (
        <div className="animate-in fade-in zoom-in glass-card p-4 text-center">
          <p className="text-brand-pink font-bold">UNIQLO 商品番号 {scanResult} を登録したよ！</p>
        </div>
      )}
    </div>
  );
};
