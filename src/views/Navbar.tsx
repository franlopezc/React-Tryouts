import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HomeIcon from '@mui/icons-material/Home';
import { NavbarProps } from '../helpers/interfaceHelper';

export const Navbar = (props: NavbarProps) => {
  return (
    <>
      <CssBaseline />{' '}
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="home" href="/">
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Weather App
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => {}} /*onClick={() => setDarkMode(!props.theme)}*/
          >
            {props.theme ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </>
  );
};
