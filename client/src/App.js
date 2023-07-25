import { Route, Routes } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import Homepage from './Pages/homepage';
import Cart from './Pages/cart';
import Signup from './Pages/signup';
import Login from './Pages/login';
import Forgetpass from './Pages/forgetpass';
import Dashboard from './Pages/dashboard';
import Admin from './Pages/admin';
import ChangePassword from './Pages/changePassword';
import { ExternalRoute, ProtectedRoute, VerifiedRoute } from './utility/protectedRoute';
import Verify from './Pages/verify';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/cart" element={
        <VerifiedRoute>
          <Cart />
        </VerifiedRoute>
      } />
      <Route path="/signup" element={
        <ExternalRoute>
          <Signup />
        </ExternalRoute>
      } />
      <Route path="/login" element={
        <ExternalRoute>
          <Login />
        </ExternalRoute>
      } />
      <Route path="/forgetpass" element={
        <ExternalRoute>
          <Forgetpass />
        </ExternalRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin" element={
        <ProtectedRoute>
          <Admin />
        </ProtectedRoute>
      } />
      <Route path="/change/:slug" element={
        <ExternalRoute>
          <ChangePassword />
        </ExternalRoute>
      } />
      <Route path="/verify/:slug" element={
          <Verify />
      } />

    </Routes>
  );
}

export default App;
