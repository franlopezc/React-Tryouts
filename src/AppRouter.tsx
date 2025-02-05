import { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const Layout = lazy(() => import('./components/layout'));
// import TimelogManager from './views/Timelog/TimelogManager';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Layout />} />

        {/*<Route path="/login" element={<LoginPage />} /> */}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
