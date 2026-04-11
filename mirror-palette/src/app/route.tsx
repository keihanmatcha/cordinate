import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Scan } from './pages/Scan';
import { Closet } from './pages/Closet';
import { Review } from './pages/Review';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scan" element={<Scan />} />
      <Route path="/closet" element={<Closet />} />
      <Route path="/review" element={<Review />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
/*「ラブandベリー」のように、ホーム、スキャン、クローゼット、レビューを切り替える設定*/
