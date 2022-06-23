import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await axios.get('/categories');
        // console.log(data);c
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    }
    getCategories();
  }, []);

  return (
    <>
      <Navbar />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {categories.map(category => (
          <>
            <p key={category._id}>{category.name}</p>

            <ul>
              {category.subCategories.map(sub => (
                <Link to={`/categories/${sub.name}`}>
                  <li key={sub._id}> {`===>${sub.name}`}</li>
                </Link>
              ))}
            </ul>
          </>

          // <Link
          //   to={`/categories/${category}`}
          //   className="h-[200px] m-3 rounded-lg overflow-hidden cursor-pointer"
          // >
          //   <div className="w-full hover:bg-gray-200 h-full flex items-center justify-center shadow-md bg-gray-100 border text-center">
          //     <p className="font-semibld capitalize text-5xl">{category}</p>
          //   </div>
          // </Link>
        ))}
      </div>
    </>
  );
}

export default Categories;
