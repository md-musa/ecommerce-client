import React, { useEffect, useState } from 'react';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import WideProductCard from '../components/WideProductCard';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { useQuery } from 'react-query';
import { getProductByCategory } from '../services/product';
import indicateLoadingProgress from '../utils/loadingProgress';
import Empty from '../components/Empty';

function ProductsByCategory() {
  const { category } = useParams();
  const [isGridView, setIsGridView] = useState(false);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);

  const [url, setUrl] = useState(`products/categories/${category}`);
  const baseURL = `products/categories/${category}`;

  const { isLoading, data: products } = useQuery(
    ['productByCategory', url, category],
    () => getProductByCategory(url)
  );

  indicateLoadingProgress(isLoading);

  let queries = {};

  const generateURL = () => {
    console.log(queries);
    let url = baseURL;
    Object.keys(queries).forEach((key, index) => {
      if (index == 0) url = `${url}?${key}=${queries[key]}`;
      else url += `&${key}=${queries[key]}`;
    });

    console.log(url);
    return url;
  };

  const handleRangePrice = () => {
    queries.min = minPrice;
    queries.max = maxPrice;
    setUrl(generateURL());
  };
  const handleSortingByPrice = value => {
    queries.sort = value;
    setUrl(generateURL());
  };

  // If product is empty then show a empty page
  if (products?.length === 0)
    return (
      <>
        <Navbar />
        <Empty message={'Product not found'} />
      </>
    );

  return (
    <>
      <Navbar />
      <div className="grid md:grid-cols-[1fr_3fr] lg:px-10 pt-3">
        {/* Left section */}
        <div className="hidden md:block px-6 mt-3 h-min">
          {/* <div className="flex justify-between">
            <p className="font-bold text-gray-700">Filter by</p>
            <button className="py-1 px-2 cursor-pointer font-semibold hover:bg-gray-50 rounded-full text-yellow-600">
              Clear All
            </button>
          </div>

          <div className="my-4 flex flex-wrap">
            {filterKeyword.map(keyword => (
              <FilteringKeyword keyword={keyword} resetFilter={resetFilter} />
            ))}
          </div>
          <hr /> */}

          {/* Price range */}
          <div className="my-2 text-gray-700 space-y-3">
            <p className="font-bold text-lg">Price range</p>
            <div className="flex items-center">
              <input
                className="py-4 px-2 my-1 w-full h-2 text-lg hover:bg-gray-50 rounded-md border outline-none shadow-md"
                type="text"
                value={minPrice}
                placeholder="min"
                onChange={e => setMinPrice(e.target.value)}
              />
              <span className="mx-2 font-semibold text-xl">to</span>
              <input
                className="py-4 px-2 my-1 w-full h-2 text-lg hover:bg-gray-50 rounded-md border outline-none shadow-md"
                type="text"
                name=""
                value={maxPrice}
                id=""
                onChange={e => setMaxPrice(e.target.value)}
                placeholder="max"
              />
            </div>
            <button onClick={handleRangePrice} className="btn-secondary">
              Submit
            </button>
          </div>
          <hr />
        </div>

        {/* Right section */}
        <div className="border h-full">
          <div className="flex items-center justify-between px-4 py-2">
            <div>
              <p className="font-semibold text-gray-600 text-sm md:text-lg">
                {`Shown ${
                  products?.length < 10
                    ? `0${products?.length}`
                    : products?.length
                } items`}
              </p>
            </div>

            <div className="flex items-center">
              <TableRowsIcon
                onClick={() => setIsGridView(false)}
                style={
                  !isGridView
                    ? {
                        color: '#eab308',
                        cursor: 'not-allowed',
                      }
                    : {
                        color: 'black',
                      }
                }
                className="mx-2 cursor-pointer active:cursor-not-allowed"
              />
              <ViewComfyIcon
                onClick={() => setIsGridView(true)}
                style={
                  isGridView
                    ? {
                        color: '#eab308',
                        cursor: 'not-allowed',
                      }
                    : {
                        color: 'black',
                      }
                }
                className="mx-2 cursor-pointer active:cursor-not-allowed"
              />

              {/* Sort by price */}
              <select
                onChange={e => handleSortingByPrice(e.target.value)}
                id="order"
                className="px-4  cursor-pointer py-1 mx-2 text-md md:text-lg outline-none font-semibold border shadow:sm hover:shadow-md bg-gray-100 hover:bg-gray-200 rounded-full"
              >
                <option value="RESET">Sort by Price</option>
                <option value="ascending">Low to High</option>
                <option value="descending">High to Low</option>
              </select>
            </div>
          </div>

          {/* Product card variants */}
          {isGridView ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {products?.map(item => (
                <ProductCard product={item} key={item._id} />
              ))}
            </div>
          ) : (
            <div>
              {products?.map(item => (
                <WideProductCard product={item} key={item._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductsByCategory;
