import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Loading from './components/Loading';

const Layout = lazy(() => import('./views/Layout'));
const Home = lazy(() => import('./views/Home'));
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            {/*<Route path="/login" element={<LoginPage />} /> */}

            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
