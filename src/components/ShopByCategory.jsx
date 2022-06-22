import React from 'react';
import Category from './Category';

// import bicycle from '../assets/images/bicycle2.jpg';
import cosmetics from '../assets/images/cosmetics.jpg';
import laptop from '../assets/images/laptop.jpg';
import sneaker from '../assets/images/sneker2.jpg';
import watch from '../assets/images/watch2.jpg';
import furniture from '../assets/images/sofa.jpg';
import sunglass from '../assets/images/sunglass.jpg';

function ShopByCategory() {
  const categories = [
    {
      title: 'skincare',
      image: cosmetics,
    },
    {
      title: 'watches',
      image: watch,
    },
    {
      title: 'sunglasses',
      image: sunglass,
    },
    {
      title: 'furniture',
      image: furniture,
    },
    {
      title: 'laptops',
      image: laptop,
    },
    {
      title: 'shoes',
      image: sneaker,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {categories.map((category, index) => (
        <Category key={index} category={category} />
      ))}
    </div>
  );
}

export default ShopByCategory;
