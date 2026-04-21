import { ClothingItem } from '../types';

const STORAGE_KEY = 'mirror_palette_closet';

export const storage = {
  getAllItems: (): ClothingItem[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // 次の連番IDを取得する関数
  getNextId: (): string => {
    const items = storage.getAllItems();
    if (items.length === 0) return "1";
    
    // 現在のIDの中で最大の数値を見つけて +1 する
    const ids = items.map(item => parseInt(item.id)).filter(id => !isNaN(id));
    const maxId = Math.max(...ids);
    return (maxId + 1).toString();
  },

  saveItem: (item: ClothingItem) => {
    const items = storage.getAllItems();
    const updated = [...items, item];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
  // アイテムの更新（編集時用）
  updateItem: (updatedItem: ClothingItem) => {
    const items = storage.getAllItems();
    const updated = items.map(i => i.id === updatedItem.id ? updatedItem : i);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  // 削除
  removeItem: (id: string) => {
    const items = storage.getAllItems();
    const filtered = items.filter(i => i.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  // 特定のカテゴリだけ取得（フィルタリング）
  getItemsByCategory: (category: 'tops' | 'bottoms'): ClothingItem[] => {
    return storage.getAllItems().filter(i => i.category === category);
  }
};
