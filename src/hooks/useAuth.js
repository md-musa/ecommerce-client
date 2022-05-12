import { useSelector } from 'react-redux';

function useAuth() {
  return useSelector(state => state.auth);
}

export default useAuth;
