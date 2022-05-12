import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from '../services/axiosConfig';
import Navbar from '../components/Navbar';
import { addItem } from '../store/cartSlice';
import Rating from '../components/Rating';
import useProgress from '../hooks/useProgress';
import ProductCard from '../components/ProductCard';

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const progress = useProgress();

  const [item, setItem] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryItems, setCategoryItems] = useState([]);

  if (!item) progress.start();
  else progress.finish();

  useEffect(() => {
    setItem(null);
    async function getProduct() {
      try {
        const { data } = await axios.get(`/products/${id}`);
        setItem(data);
        setCategoryName(data.category);
        window.scrollTo(0, 0);
      } catch (err) {
        console.log('Error=>', err);
      }
    }
    getProduct();
  }, [id]);

  useEffect(() => {
    const getProductByCategory = async () => {
      try {
        const { data } = await axios.get(`products/category/${categoryName}`);
        const products = data.products.filter(item => item.id != id);
        setCategoryItems(products);
      } catch (error) {
        console.log(error);
      }
    };
    getProductByCategory();
  }, [categoryName, id]);

  return (
    <>
      <Navbar />
      {item && (
        <div className="pt-4 px-3 md:px-10 grid md:grid-cols-2">
          <div className=" place-content-center">
            <img
              className="w-auto object-contain"
              src={item.thumbnail}
              alt=""
            />
            {/* Other images */}
          </div>
          <div className="">
            <h3 className="text-gray-600 text-4xl my-3">{item.title}</h3>

            <div className="flex items-center my-3">
              <Rating rating={item.rating} />
              <span className="text-xl">{`  ${item.rating}`}</span>
            </div>

            <span className="font-bold text-2xl">
              ${`${parseFloat(item.price)} `}
            </span>
            <span className="text-xl">without shipping + handling</span>
            <br />
            <p className="my-4 text-xl text-gray-600">{item.description}</p>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  dispatch(addItem(item));
                  navigate('/cart');
                }}
                className="p-2 rounded-sm w-2/5 hover:bg-gray-200 shadow-md my-2 bg-gray-100 text-gray-700 text-xl"
              >
                Buy Now
              </button>
              <button
                onClick={() => dispatch(addItem(item))}
                className="p-2 rounded-sm w-2/5 hover:bg-yellow-600 shadow-md my-2 bg-yellow-500 text-xl"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
      <h3 className="my-3 mx-6 font-semibold text-3xl text-gray-600">
        Related products
      </h3>
      {categoryItems && (
        <div className="grid rounded-sm md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {categoryItems.map(item => (
            <ProductCard product={item} key={item.id} />
          ))}
        </div>
      )}
    </>
  );
}

export default ProductDetails;
