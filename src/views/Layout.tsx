import { CssBaseline } from '@mui/material';

import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <CssBaseline />
      <div style={{ minHeight: '100vh', color: 'black' }}>
        <header style={{ height: '4dvh' }}>
          <Navbar />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
