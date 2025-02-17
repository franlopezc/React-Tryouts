import { useState } from 'react';

import { CssBaseline } from '@mui/material';

import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const [darkMode] = useState(false);

  return (
    <>
      <CssBaseline />
      <div style={{ minHeight: '100vh', color: darkMode ? 'white' : 'black' }}>
        <header style={{ height: '4dvh' }}>
          <Navbar theme={darkMode} />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
