import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

function RedirectPage (props) {
  const navigate = useNavigate();

  useEffect(() => {
    console.error('Incorrect route');
    Cookies.get('access_token') ? navigate('/overview') : navigate('/sign-in');
  }, [props, navigate]);

  return (<></>);
}

export default RedirectPage;