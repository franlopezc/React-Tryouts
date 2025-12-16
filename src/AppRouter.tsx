import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './views/Layout';
import Home from './views/Home';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
