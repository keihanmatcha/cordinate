import React from 'react';

const Closet = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-brand-purple-dark mb-4">
        My Closet
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {/* 仮のカードを表示 */}
        <div className="bg-white p-4 rounded-xl shadow-magic border border-brand-pink-light">
          <div className="aspect-square bg-pink-50 rounded-lg mb-2 flex items-center justify-center">
            <span className="text-pink-300">No Image</span>
          </div>
          <p className="text-sm font-bold text-gray-700">お気に入りのTシャツ</p>
        </div>
      </div>
      <p className="mt-8 text-gray-500 text-sm text-center">
        ここにあなたの3Dアイテムが並びます。
      </p>
    </div>
  );
};

export default Closet;
