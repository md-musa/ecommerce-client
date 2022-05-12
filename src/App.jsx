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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/category/:title" element={<ProductsByCategory />} />
      <Route path="/cart" element={<ShoppingCart />} />
      <Route path="/cart/checkout" element={<CheckOut />} />
      <Route path="/productDetails/:id" element={<ProductDetails />} />
      <Route path="/product/search/:title" element={<SearchProducts />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
