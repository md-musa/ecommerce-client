import React from 'react';
import { Link } from 'react-router-dom';

function Category(props) {
  const { image, title } = props.category;

  return (
    <Link
      to={`/categories/${title}`}
      className="h-72 m-3 rounded-lg shadow-2xl border-2 border-gray-100 overflow-hidden cursor-pointer"
    >
      <div
        style={{ backgroundImage: `url("${image}")` }}
        className="flex items-end bg-cover shadow-2xl h-full bg-center hover:bg-white"
      >
        <div className="category-blur h-1/6 w-full flex items-center justify-end text-white opacity-90">
          <p className=" font-bold text-lg md:text-lg text-shadow mr-5 capitalize">
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Category;
