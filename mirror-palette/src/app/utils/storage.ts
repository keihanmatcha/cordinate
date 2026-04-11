import { ClothingItem } from '../types';

const STORAGE_KEY = 'mirror_palette_closet';

export const storage = {
  saveItem: (item: ClothingItem) => {
    const items = storage.getAllItems();
    const updated = [...items, item];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
  
  getAllItems: (): ClothingItem[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },
  
  removeItem: (id: string) => {
    const items = storage.getAllItems();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.filter(i => i.id !== id)));
  }
};
