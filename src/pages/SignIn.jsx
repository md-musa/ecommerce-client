import axios from '../services/axiosConfig';
import { addUserInfo } from '../store/authSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function SignIn() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('kminchelle');
  const [password, setPassword] = useState('0lelplR');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `/auth/login`,
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      dispatch(addUserInfo({ username, token: data.token, image: data.image }));
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        setError('Invalid username or password');
      } else if (err.response.status === 500) {
        setError('Internal server error');
      } else if (err.response.status === 404) {
        setError('Not found');
      }
    }
  }

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
          <h1 className="my-5 text-3xl">Sign your account</h1>

          <form onSubmit={handleSubmit}>
            <input
              className="com-input"
              type="text"
              onChange={e => setUsername(e.target.value)}
              value={username}
              placeholder="Username"
              required
            />
            <br />
            <input
              className="com-input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              required
            />

            <br />
            <span
              style={error ? { display: 'inline' } : { display: 'none' }}
              className="text-lg text-red-400 pl-2"
            >
              {error}
            </span>

            <button className="btn-secondary">Sign In</button>

            <p className="text-center mt-4">
              <span className="text-gray-400">Don't have account?</span>
              <Link
                to="/signUp"
                className="px-1 ml-2 text-blue-400 bg-blue-50 rounded-md hover:underline"
              >
                sign up now
              </Link>
            </p>

            <br />
          </form>

          <button className="flex justify-center items-center com-input">
            <img
              className="mx-2 w-8 h-8"
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
            />
            <p className="text-lg text-gray-500"> Sign In with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
