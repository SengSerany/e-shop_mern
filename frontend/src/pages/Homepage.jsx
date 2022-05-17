import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { handleSession } from '../features/auth/authSlice';

function Homepage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleSession('/profile'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>Homepage</div>;
}

export default Homepage;
