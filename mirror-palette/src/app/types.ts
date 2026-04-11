export type Brand = 'UNIQLO' | 'GU' | 'ZARA';
export type Category = 'Tops' | 'Bottoms' | 'Shoes' | 'Accessories';

export interface ClothingItem {
  id: string;
  brand: Brand;
  productNumber: string;
  imageUrl: string;
  category: Category;
  attributes: {
    tempMin: number;
    tempMax: number;
    humidityResistant: boolean;
  };
}

export interface WeatherData {
  temp: number;
  humidity: number;
  condition: string;
}
