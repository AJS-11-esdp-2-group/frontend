import { useAppSelector } from '../../../../Store/hooks';
import { useLogoutMutation } from '../../../../Store/services/auth';
import AnonymousMenu from '../../Menu/AnonymousMenu';
import Navigation from '../Navigation/Navigation';
import { Typography, Toolbar, AppBar, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
const AppToolBar = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [logout] = useLogoutMutation();
  const logoutHandel = async () => {
    await logout();
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#383b48', marginBottom: '64px' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            sx={{
              textDecoration: 'none',
              color: 'aliceblue',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            <Link to="/">Flower Shop</Link>
          </Typography>
          {user ? (
            <Typography
              variant="subtitle1"
              sx={{
                textDecoration: 'none',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              <Navigation logout={logoutHandel}/>
            </Typography>
          ) : (
            <Grid item>
              <AnonymousMenu />
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppToolBar;
