import React from 'react';
import Category from './Category';

// import bicycle from '../assets/images/bicycle2.jpg';
import cosmetics from '../assets/images/cosmetics.jpg';
import laptop from '../assets/images/laptop.jpg';
import furniture from '../assets/images/sofa.jpg';

function ShopByCategory() {
  const categories = [
    {
      title: 'skincare',
      image: cosmetics,
    },
    {
      title: 'watches',
      image:
        'https://i.ibb.co/2n797kX/daniel-korpai-hb-TKIbu-Mm-BI-unsplash.jpg',
    },
    {
      title: 'head phone',
      image: 'https://i.ibb.co/SNgWqYt/kiran-ck-LSNJ-pltdu8-unsplash.jpg',
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
      image: 'https://i.ibb.co/CKkjn8g/izzy-gibson-ut-q-Kclcm-BI-unsplash.jpg',
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
