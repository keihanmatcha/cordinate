export type Brand = 'UNIQLO' | 'GU' | 'ZARA';
export type Category = 'Tops' | 'Bottoms' | 'Shoes' | 'Accessories';

export interface ClothingItem {
  id: string;
  name: string;
  category: 'tops' | 'bottoms';
  shape: string;      // hoodie, sweater, etc.
  sleeve: 'short' | 'long';
  weight: 'thin' | 'normal' | 'thick';
  color: string;      // HEX値
  season: string[];   // ['winter', 'autumn']
  scene: string;      // casual, formal, etc.
  modelPath: string;  // 使用するテンプレートモデルのパス
}

export interface WeatherData {
  temp: number;
  humidity: number;
  condition: string;
}
