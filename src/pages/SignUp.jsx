import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';
import { addUserInfo } from '../stores/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import { signUpUser } from '../services/auth';
const from = location.state?.from?.pathname || '/';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();

  const handleSignUp = e => {
    e.preventDefault();

    signUpUser(name, email, password).then(res => {
      dispatch(
        addUserInfo({
          _id: res.data._id,
          token: res.data.token,
          role: res.data.role,
        })
      );
      navigate(from, { replace: true });
    });
  };

  return (
    <div className="grid h-screen sm:grid-cols-[1fr_2fr]">
      <div className="border hidden sm:flex items-center justify-center bg-cover bg-[url('https://images.unsplash.com/photo-1643622000342-65f9fdeb50d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60')]">
        <div className="p-4 w-3/4 text-white card">
          <h2 className="text-2xl  font-bold">Enjoy Buying new Products</h2>
          <small>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis,
            dolorum?
          </small>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-4/5 sm:w-3/5 md:w-1/2">
          <h1 className="my-5 text-3xl">Create a account</h1>

          <form className="m-auto" onSubmit={handleSignUp}>
            <input
              className="com-input"
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <br />

            <input
              className="com-input"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <br />

            <input
              className="com-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <br />

            <button className="btn-secondary my-2">Sign up</button>

            <p className="mt-2 text-center">
              <span className="text-gray-400">Already have an account?</span>
              <Link
                className="px-2 ml-2 text-blue-400 bg-blue-50 rounded-md hover:underline"
                to="/signIn"
              >
                sign in
              </Link>
            </p>

            <br />
          </form>

          <button className="flex justify-center items-center com-input">
            <img
              className="mx-2 w-8 h-8"
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
              alt=""
              srcSet=""
            />
            <p className="text-lg text-gray-500"> Sign up with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
