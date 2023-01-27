import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function RedirectPage (props) {
  const navigate = useNavigate();

  useEffect(() => {
    console.error('Incorrect route');
    navigate('/overview');
  }, [props, navigate]);

  return <div></div>;
}

export default RedirectPage;