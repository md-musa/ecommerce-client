import { Route, Routes } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import ShoppingCart from './pages/ShoppingCart';
import Home from './pages/Home';
import NotFound from './components/NotFound';
import SignUp from './pages/SignUp';
import CheckOut from './pages/CheckOut';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import ProductsByCategory from './pages/ProductsByCategory';
import SignIn from './pages/SignIn';
import MyOrder from './pages/MyOrder';
import WishList from './pages/WishList';
import MyAccount from './pages/MyAccount';
import PrivateRoutes from './components/PrivateRoutes';
import SearchProduct from './pages/SearchProduct';
import useAuth from './hooks/useAuth';

// 'http://localhost:5000/api'
// https://ecommerce50.herokuapp.com/api

const _user = JSON.parse(localStorage.getItem('user'));
axios.defaults.baseURL = 'https://ecommerce50.herokuapp.com/api';
if (_user) {
  axios.defaults.headers.common.Authorization = `Bearer ${_user.token}`;
}

export default function App() {
  const { user } = useAuth();
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/:category" element={<ProductsByCategory />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/products/search/:term" element={<SearchProduct />} />
      {!user && (
        <>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
        </>
      )}

      {/* Protected routes */}
      <Route element={<PrivateRoutes />}>
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/myOrder" element={<MyOrder />} />
        <Route path="/wishList" element={<WishList />} />
        <Route path="/myAccount" element={<MyAccount />} />
        <Route path="/cart/checkout" element={<CheckOut />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
