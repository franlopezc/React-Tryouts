import { createTheme, ThemeProvider } from '@mui/material';
import { AppRouter } from './AppRouter';

//Crear un contexto con el theme para poder tratar el modo claro oscuro.

export default function App() {
  const theme = createTheme({
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      // Puedes personalizar otros estilos como fontSize, fontWeight, etc.
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppRouter />;
    </ThemeProvider>
  );
}
