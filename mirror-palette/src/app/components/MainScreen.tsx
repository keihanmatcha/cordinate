import React, { useState } from 'react';
import { Camera, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../utils/storage'; // storageをインポート

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: 'tops' as 'tops' | 'bottoms',
    subCategory: 't-shirt',
    color: '#ffb6c1',
    season: 'winter',
    scene: 'casual',
    sleeve: 'short',
    weight: 'normal'
  });

  // --- 保存処理 ---
  const handleSave = () => {
    if (!formData.name) {
      alert("アイテム名を入力してください");
      return;
    }

    // 1. 次の連番IDを取得
    const nextId = storage.getNextId();

    // 2. 保存するデータの構築
    const newItem = {
      ...formData,
      id: nextId,
      // 形状(subCategory)に応じてモデルのパスを自動決定する
      modelPath: formData.category === 'tops' 
        ? `models/${formData.subCategory}.glb` 
        : `models/${formData.subCategory}.glb`
    };

    // 3. LocalStorageへ保存
    storage.saveItem(newItem as any);

    // 4. クローゼットへ移動
    alert(`ID: ${nextId} で登録しました！`);
    navigate('/closet');
  };

  const seasons = [
    { id: 'spring', label: '春', emoji: '🌸' },
    { id: 'summer', label: '夏', emoji: '☀️' },
    { id: 'autumn', label: '秋', emoji: '🍂' },
    { id: 'winter', label: '冬', emoji: '❄️' },
  ];

  const topShapes = [
    { id: 't-shirt', label: 'Tシャツ', icon: '👕' },
    { id: 'fleece', label: 'フリース', icon: '☁️' },
    { id: 'hoodie', label: 'パーカー', icon: '🧥' },
    { id: 'sweat', label: 'トレーナー', icon: '🧶' },
    { id: 'sweater', label: 'セーター', icon: '🧣' },
    { id: 'cardigan', label: 'カーディガン', icon: '🧥' },
  ];

  const bottomShapes = [
    { id: 'pants', label: 'パンツ', icon: '👖' },
    { id: 'cargo', label: 'カーゴパンツ', icon: '🪖' },
    { id: 'shorts', label: 'ショートパンツ', icon: '🩳' },
    { id: 'skirt', label: 'スカート', icon: '👗' },
  ];

  return (
    <div className="p-8 pb-24 min-h-screen bg-pink-50/30">
      <h1 className="text-2xl font-bold text-brand-purple-dark mb-6">アイテム登録</h1>

      {/* 1. 写真アップロード部分 */}
      <div className="w-full aspect-video bg-white rounded-2xl border-2 border-dashed border-pink-200 flex flex-col items-center justify-center mb-8 shadow-sm">
        <Camera className="text-pink-300 mb-2" size={32} />
        <p className="text-xs text-gray-400 font-bold uppercase">Upload Photo</p>
      </div>

      <div className="space-y-6">
        {/* アイテム名 */}
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase ml-1">Item Name</label>
          <input 
            type="text" 
            placeholder="例: お気に入りのパーカー"
            className="w-full mt-1 px-4 py-3 rounded-xl border border-pink-100 shadow-sm focus:outline-none bg-white"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        {/* カテゴリ（トップス/ボトムス）の切り替え */}
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button 
            className={`flex-1 py-2 text-xs font-bold rounded-lg ${formData.category === 'tops' ? 'bg-white shadow-sm' : 'text-gray-400'}`}
            onClick={() => setFormData({...formData, category: 'tops', subCategory: 't-shirt'})}
          >
            TOPS
          </button>
          <button 
            className={`flex-1 py-2 text-xs font-bold rounded-lg ${formData.category === 'bottoms' ? 'bg-white shadow-sm' : 'text-gray-400'}`}
            onClick={() => setFormData({...formData, category: 'bottoms', subCategory: 'pants'})}
          >
            BOTTOMS
          </button>
        </div>

        {/* 形状選択 */}
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase ml-1">Shape</label>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {(formData.category === 'tops' ? topShapes : bottomShapes).map((shape) => (
              <button
                key={shape.id}
                onClick={() => setFormData({...formData, subCategory: shape.id})}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
                  formData.subCategory === shape.id 
                  ? 'border-brand-pink bg-pink-50 scale-105 shadow-md' 
                  : 'border-transparent bg-white shadow-sm'
                }`}
              >
                <span className="text-2xl mb-1">{shape.icon}</span>
                <span className="text-[10px] font-bold text-gray-600">{shape.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 袖丈 */}
        <div className="mt-8">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Sleeve Length</label>
          <div className="flex gap-2 mt-2">
            {[
              { id: 'short', label: '半袖', icon: '👕' },
              { id: 'long', label: '長袖', icon: '🧥' }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setFormData({...formData, sleeve: s.id})}
                className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  formData.sleeve === s.id ? 'bg-brand-pink text-white shadow-lg' : 'bg-white text-gray-400 border border-pink-50'
                }`}
              >
                <span>{s.icon}</span>{s.label}
              </button>
            ))}
          </div>
        </div>

        {/* 厚み */}
        <div className="mt-6">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Material Weight</label>
          <div className="flex bg-gray-100 p-1 rounded-2xl mt-2">
            {[
              { id: 'thin', label: '薄手' },
              { id: 'normal', label: '普通' },
              { id: 'thick', label: '厚手' }
            ].map((w) => (
              <button
                key={w.id}
                onClick={() => setFormData({...formData, weight: w.id})}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  formData.weight === w.id ? 'bg-white shadow-sm text-brand-purple-dark' : 'text-gray-400'
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>

        {/* 季節 */}
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase ml-1">Season</label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {seasons.map((s) => (
              <button
                key={s.id}
                onClick={() => setFormData({...formData, season: s.id})}
                className={`py-2 rounded-xl text-sm font-bold transition-all ${
                  formData.season === s.id 
                  ? 'bg-brand-pink text-white shadow-md scale-105' 
                  : 'bg-white text-gray-400 border border-pink-50'
                }`}
              >
                {s.emoji} {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* 色 */}
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase ml-1">Main Color</label>
          <div className="flex gap-4 mt-2 items-center">
            <input 
              type="color" 
              value={formData.color}
              className="w-12 h-12 rounded-lg cursor-pointer border-none bg-transparent"
              onChange={(e) => setFormData({...formData, color: e.target.value})}
            />
            <span className="text-sm font-mono text-gray-500 uppercase">{formData.color}</span>
          </div>
        </div>
      </div>

      {/* 登録ボタン */}
      <button 
        onClick={handleSave}
        className="w-full mt-10 bg-brand-purple-dark text-white py-4 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
      >
        <CheckCircle2 size={20} />
        この内容で登録する
      </button>
    </div>
  );
};

export default Register;
