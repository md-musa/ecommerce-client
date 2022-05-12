import React from 'react';
import { Link } from 'react-router-dom';
import useProgress from '../hooks/useProgress';

function Category(props) {
  const progress = useProgress();
  const { image, title } = props.category;

  return (
    <Link
      to={`/category/${title}`}
      className="h-72 m-3 rounded-lg overflow-hidden cursor-pointer"
    >
      <div
        style={{ backgroundImage: `url("${image}")` }}
        className="flex items-end bg-cover h-full bg-center hover:bg-white"
      >
        <div className="category-blur h-1/6 w-full flex items-center justify-end text-white opacity-90">
          <p className=" font-bold text-xl md:text-2xl text-shadow mr-5 capitalize">
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Category;
