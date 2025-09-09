import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import AllOrdersPage from './pages/AllOrdersPage';
import CartPage from './pages/CartPage';
import ProductsPage from './pages/ProductsPage';
import HomePage from './pages/HomePage';
import UserNavbar from './components/navbars/UserNavbar';
import ManagerNavbar from './components/navbars/ManagerNavbar';
import RegisterForm from './components/RegisterForm';
import OrderCard from './components/OrderCard';
import OrderFinishPage from './pages/OrderFinishPage';
import MyOrdersPage from './pages/MyOrdersPage';
import AllUsersPage from './pages/AllUsersPage';
import AddProductPage from './pages/AddProductPage';
import VirtualTryOn from './components/VirtualTryOn';
import TryGlasses from './components/TryGlasses';
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, currentUser } = useSelector(state => state.user);
  const isAuthPage = location.pathname === '/' || location.pathname === '/login';

  const handleLoginSuccess = (user) => {
    console.log("התחברות הצליחה!", user);
    navigate("/home");
  };

  useEffect(() => {
    if (currentUser && (location.pathname === '/' || location.pathname === '/login')) {
      navigate('/home');
    }
  }, [currentUser, navigate, location.pathname]);

  return (
    <>
      {!isAuthPage && (isAdmin ? <ManagerNavbar /> : <UserNavbar />)}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<RegisterForm onSuccess={handleLoginSuccess} />} />
        <Route path="/login" element={<RegisterForm onSuccess={handleLoginSuccess} />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<AllOrdersPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/OrderCard/:id" element={<OrderCard />} />
        <Route path="/OrderFinish" element={<OrderFinishPage />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
        <Route path="/AllUsersPage" element={<AllUsersPage/>}/>
        <Route path="/AddProductPage" element={<AddProductPage/>}/>
         <Route path="/try-glasses" element={<VirtualTryOn/>} />
        <Route path="/try-glasses" element={<TryGlasses />} />
        <Route path="*" element={<div>404 not found</div>} />

      </Routes>
    </>
  );
}

export default App;