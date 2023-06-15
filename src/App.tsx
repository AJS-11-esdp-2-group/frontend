import Header from './Components/Layout/Header/Header';
import HomePage from './Container/HomePage/HomePage';
import Items from './Container/Items/Items';
import Suppliers from './Container/Suppliers/Suppliers';
import Register from './Container/Register/Register';
import Login from './Container/Login/Login';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from './Store/hooks';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

function App() {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Header />}>
          <Route index element={<HomePage />} />
          <Route path={'/goods'} element={<Items />} />
          <Route path={'/suppliers'} element={<Suppliers />} />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
