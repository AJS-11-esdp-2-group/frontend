import { useAppSelector } from '../../../Store/hooks';
import { useLogoutMutation } from '../../../Store/services/auth';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Container } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';

const pages = [
  {
    ru: 'Товар',
    en: 'goods',
  },
  {
    ru: 'Поставщики',
    en: 'suppliers',
  },
];

const unauthorizedZone = [
  {
    ru: 'Регистрация',
    en: 'register',
  },
  {
    ru: 'Авторизация',
    en: 'login',
  },
];

const settings = [
  {
    ru: 'Выйти',
    en: 'logout',
  },
];

const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  //необходимо сделать logout
  const [logout] = useLogoutMutation();
  const logoutHandler = async () => {
    handleClose();
    await logout();
  };

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page: string) => {
    setAnchorElNav(null);
    navigate(`${page}`);
  };

  const handleCloseUnauthorizedZone = (zone: string) => {
    setAnchorElNav(null);
    navigate(`${zone}`);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <>
                {user ? (
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                ) : null}
              </>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <>
                  {user
                    ? pages.map((page) => (
                        <MenuItem key={page.en} onClick={() => handleCloseNavMenu(page.en)}>
                          <Typography textAlign="center">{page.ru}</Typography>
                        </MenuItem>
                      ))
                    : null}
                </>
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <>
                {user
                  ? pages.map((page) => (
                      <Button
                        key={page.en}
                        onClick={() => handleCloseNavMenu(page.en)}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                      >
                        {page.ru}
                      </Button>
                    ))
                  : null}
              </>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <>
                  {user
                    ? settings.map((setting) => (
                        <MenuItem key={setting.ru} onClick={handleCloseUserMenu}>
                          <Typography
                            textAlign="center"
                            // onClick={() => handleCloseNavMenu(setting.en)}
                            onClick={logoutHandler}
                            component={Link}
                            to={'/'}
                          >
                            {setting.ru}
                          </Typography>
                        </MenuItem>
                      ))
                    : unauthorizedZone.map((zone) => (
                        <MenuItem key={zone.ru} onClick={handleCloseUserMenu}>
                          <Typography textAlign="center" onClick={() => handleCloseUnauthorizedZone(zone.en)}>
                            {zone.ru}
                          </Typography>
                        </MenuItem>
                      ))}
                </>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container sx={{ mt: '25px' }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default Header;
