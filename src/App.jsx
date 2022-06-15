import { Route, Routes } from 'react-router-dom';
import React from 'react';
import ShoppingCart from './pages/ShoppingCart';
import Home from './pages/Home';
import NotFound from './components/NotFound';
import SignUp from './pages/SignUp';
import CheckOut from './pages/CheckOut';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import ProductsByCategory from './pages/ProductsByCategory';
import SignIn from './pages/SignIn';
import SearchProducts from './pages/SearchProducts';
import MyOrder from './pages/MyOrder';
import WishList from './pages/WishList';
import MyAccount from './pages/MyAccount';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/categories" element={<Categories />} />
      <Route
        path="/categories/:categoryName"
        element={<ProductsByCategory />}
      />
      <Route path="/cart" element={<ShoppingCart />} />
      <Route path="/myOrder" element={<MyOrder />} />
      <Route path="/wishList" element={<WishList />} />
      <Route path="/myAccount" element={<MyAccount />} />
      <Route path="/cart/checkout" element={<CheckOut />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/product/search/:title" element={<SearchProducts />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
