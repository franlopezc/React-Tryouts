import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouter } from './AppRouter';

//Crear un contexto con el theme para poder tratar el modo claro oscuro.

export default function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#04AEFF', // Azul principal
        contrastText: '#FFFFFF', // Texto en botones
      },
      secondary: {
        main: '#FB5110', // Naranja complementario
      },
      background: {
        default: '#F8F9FA', // Fondo claro
        paper: '#FFFFFF', // Fondos de tarjetas
      },
      text: {
        primary: '#212529', // Texto oscuro
        secondary: '#6c757d', // Texto gris más suave
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normaliza los estilos predeterminados */}
      <AppRouter />;
    </ThemeProvider>
  );
}
