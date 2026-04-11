import React from 'react';
import { Button } from '@/components/ui/button';

export const AvatarCreator = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-black text-center text-pink-500 uppercase">Create Your Avatar</h2>
      
      {/* 髪型選択スライダー */}
      <div className="space-y-2">
        <p className="text-sm font-bold">Hair Style</p>
        <div className="flex space-x-2 overflow-x-auto py-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-16 h-16 rounded-full bg-white border-2 border-pink-200 flex-shrink-0" />
          ))}
        </div>
      </div>

      {/* 肌の色 */}
      <div className="space-y-2">
        <p className="text-sm font-bold">Skin Tone</p>
        <div className="flex space-x-4">
          <div className="w-10 h-10 rounded-full bg-[#FFE0BD] border-2 border-white shadow-md" />
          <div className="w-10 h-10 rounded-full bg-[#E4B98E] border-2 border-white shadow-md" />
          <div className="w-10 h-10 rounded-full bg-[#94613C] border-2 border-white shadow-md" />
        </div>
      </div>

      <Button className="btn-magic w-full h-14 text-lg">
        これで行くよ！✨
      </Button>
    </div>
  );
};
