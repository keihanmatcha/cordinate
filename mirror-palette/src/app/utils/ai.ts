import { WeatherData, ClothingItem } from '../types';

export const ai = {
  // 気温と湿度からおすすめのアイテムをフィルタリング
  recommendOutfit: (items: ClothingItem[], weather: WeatherData) => {
    return items.filter(item => {
      const isCorrectTemp = weather.temp >= item.attributes.tempMin && 
                            weather.temp <= item.attributes.tempMax;
      
      // 湿度が高い（雨など）場合、湿度に強い素材を優先
      if (weather.humidity > 80 && !item.attributes.humidityResistant) {
        return false;
      }
      
      return isCorrectTemp;
    });
  },

  // アバターが話すアドバイス文を生成
  getAdvice: (weather: WeatherData) => {
    if (weather.humidity > 75) return "湿気が強いね。髪が広がらないように首元スッキリな服がおすすめだよ！";
    if (weather.temp < 10) return "今日は寒いから、しっかり着込んで風邪ひかないようにね！";
    return "今日のお天気なら、この組み合わせが一番輝けるよ！✨";
  }
};
