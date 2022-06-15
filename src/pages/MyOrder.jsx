import userEvent from '@testing-library/user-event';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from '../config/axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth';

function MyOrder() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  console.log('user=>', user);

  useEffect(() => {
    axios(`/orders/${'628897dd46c73e0e74473883'}`)
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <Navbar />

      <div>
        {orders.map(order => (
          <table className="border w-full my-10">
            <thead>
              <tr className="border">
                <th>Image</th>
                <th>Title</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map(item => (
                <tr className="border h-10">
                  <td>
                    <img
                      src={item.productId.images[0]}
                      className="h-[100px] w-[100px]"
                      alt=""
                      srcset=""
                    />
                  </td>
                  <td>{item.productId.title}</td>
                  <td>{item.quantity}</td>
                  <td>{item.productId.price}</td>
                </tr>
              ))}
              <hr />
            </tbody>
          </table>
        ))}
      </div>
    </>
  );
}

export default MyOrder;
