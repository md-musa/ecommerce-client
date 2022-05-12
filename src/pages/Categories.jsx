import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Category from '../components/Category';
import Navbar from '../components/Navbar';
import useProgress from '../hooks/useProgress';
import axios from '../services/axiosConfig';

function Categories() {
  const [categories, setCategories] = useState([]);
  const progress = useProgress();

  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await axios.get('/products/categories');
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    }
    getCategories();
  }, []);

  if (!categories.length) progress.start();
  else progress.finish();

  return (
    <>
      <Navbar />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {categories.map(category => {
          return (
            <Link
              to={`/category/${category}`}
              className="h-[200px] m-3 rounded-lg overflow-hidden cursor-pointer"
            >
              <div className="w-full hover:bg-gray-200 h-full flex items-center justify-center shadow-md bg-gray-100 border text-center">
                <p className="font-semibld capitalize text-5xl">{category}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Categories;
