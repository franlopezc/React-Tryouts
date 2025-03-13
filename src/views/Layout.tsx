import { CssBaseline } from '@mui/material';

import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <CssBaseline />
      <div style={{ minHeight: '100vh' }}>
        <header style={{ height: 'auto' }}>
          <Navbar />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
