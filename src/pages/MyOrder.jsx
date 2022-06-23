import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Empty from '../components/Empty';
import CheckoutProduct from '../components/CheckoutProduct';

function MyOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      try {
        const { data } = await axios.get('/orders/myOrders');
        setOrders(data);
      } catch (err) {
        console.log(err);
      }
    }
    getOrders();
  }, []);

  const cancelOrder = async id => {
    console.log('cancel order by this', id);
  };

  return (
    <>
      <Navbar />

      {orders.length === 0 ? (
        <Empty message="You did not order anything yet." />
      ) : (
        <div className="grid grid-cols-2 my-4">
          {orders.map(order => (
            <div className=' bg-gray-100 rounded p-5"'>
              <h3 className="text-xl text-gray-700 my-1 font-semibold">
                Order ID:
                {order._id}
              </h3>
              <h3 className="text-xl text-gray-700 my-1 font-semibold">
                Date:
                {order.date}
              </h3>
              <button
                type="button"
                className="px-2 py-1 bg-red-100 border-2 text-lg font-semibold"
              >
                {order.status}
              </button>

              {order.products.map(item => (
                <CheckoutProduct item={item.product} key={item._id} />
              ))}

              <button
                onClick={() => cancelOrder(order._id)}
                className="px-2 py-1 bg-red-200 text-red-600 border-2 text-lg font-semibold"
                type="button"
              >
                Cancel order
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default MyOrder;
