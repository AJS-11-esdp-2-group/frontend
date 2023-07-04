import HomePage from './Container/HomePage/HomePage';
import Items from './Container/Items/Items';
import Suppliers from './Container/Suppliers/Suppliers';
import Categories from './Container/Categories/Categories';
import AddCategory from './Container/Categories/AddCategory';
import Register from './Container/Register/Register';
import Login from './Container/Login/Login';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from './Store/hooks';
import AppToolBar from './Components/UI/Layout/AppToolbar/ApptoolBar';
import AddItem from './Container/Items/AddItems';
import AddSupplier from './Container/Suppliers/AddSuppliers';
import EditItem from './Container/Items/EditItem';
import EditSupplier from './Container/Suppliers/EditSupplier';
import Supply from './Container/Supply/Supply';
import AddSupply from './Container/Supply/AddSupply';
import Recipes from './Container/Recipes/Recipes';
import AddRecipes from './Container/Recipes/AddRecipes';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, PaletteMode, createTheme, ThemeProvider } from '@mui/material';
import { grey, blue, blueGrey } from '@mui/material/colors';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...blue,
      main: mode === 'light' ? blue[500] : blue[400],
    },
    background: {
      default: mode === 'light' ? 'white' : '#383b48',
      paper: mode === 'light' ? '#383b48' : blueGrey[900],
    },
    text: {
      primary: mode === 'light' ? blue[700] : blue[50],
      secondary: mode === 'light' ? grey[500] : grey[300],
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
            <Route path="/" element={<HomePage />} />
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
              path="/edit-item/:id"
              element={
                <ProtectedRoute isAllowed={!!user} redirectPath="/">
                  <EditItem />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-supplier/:id"
              element={
                <ProtectedRoute isAllowed={!!user} redirectPath="/">
                  <EditSupplier />
                </ProtectedRoute>
              }
            />
            <Route
              path="/supply"
              element={
                <ProtectedRoute isAllowed={!!user} redirectPath="/">
                  <Supply />
                </ProtectedRoute>
              }
            />
            <Route
              path="/new-supply"
              element={
                <ProtectedRoute isAllowed={!!user} redirectPath="/">
                  <AddSupply />
                </ProtectedRoute>
              }
            />
            <Route
              path="/items_categories"
              element={
                <ProtectedRoute isAllowed={!!user} redirectPath="/">
                  <Categories />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recipes"
              element={
                <ProtectedRoute isAllowed={!!user} redirectPath="/">
                  <Recipes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/new-recipes/:id"
              element={
                <ProtectedRoute isAllowed={!!user} redirectPath="/">
                  <AddRecipes />
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
