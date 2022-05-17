import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Profile() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user.id === null) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <h1>username: {user && user.username}</h1>
        <h3>email: {user && user.email}</h3>
        <p>{user && user.id}</p>
      </div>
    </>
  );
}

export default Profile;
