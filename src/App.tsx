import HomePage from './Container/HomePage/HomePage';
import Items from './Container/Items/Items';
import Suppliers from './Container/Suppliers/Suppliers';
import Register from './Container/Register/Register';
import Login from './Container/Login/Login';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from './Store/hooks';
import AppToolBar from './Components/UI/Layout/AppToolbar/ApptoolBar';
import AddItem from './Container/Items/AddItems';
import AddSupplier from './Container/Suppliers/AddSuppliers';
import {Routes, Route } from 'react-router-dom';
import { CssBaseline, PaletteMode, createTheme, ThemeProvider } from '@mui/material';
import { amber, blueGrey, grey, green } from '@mui/material/colors';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...amber,
      ...(mode === 'dark' && {
        main: amber[300],
      }),
    },
    ...(mode === 'dark' && {
      background: {
        default: blueGrey[600],
        paper: green[800],
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
            primary: blueGrey[900],
            secondary: grey[500],
          }
        : {
            primary: '#fff',
            secondary: grey[800],
          }),
    },
  },
});
const darkModeTheme = createTheme(getDesignTokens('dark'));
function App() {
  const { user } = useAppSelector((state) => state.auth);
  
  return (
    <ThemeProvider theme={darkModeTheme}>
      <CssBaseline>
        <header>
          <AppToolBar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route
              path="/register"
              element={
                <ProtectedRoute isAllowed={!user} redirectPath="/">
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute isAllowed={!user} redirectPath="/">
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/items"
              element={
                <ProtectedRoute isAllowed={!!user} redirectPath="/">
                  <Items />
                </ProtectedRoute>
              }
            />
            <Route
              path="/suppliers"
              element={
                <ProtectedRoute isAllowed={!!user} redirectPath="/">
                  <Suppliers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/new-item"
              element={
                <ProtectedRoute isAllowed={!!user} redirectPath="/">
                  <AddItem/>
                </ProtectedRoute>
              }
            />
             <Route
              path="/new-supplier"
              element={
                <ProtectedRoute isAllowed={!!user} redirectPath="/">
                  <AddSupplier/>
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
