import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import loadingGif from '../assets/reload-cat.gif';

function Rating ({ item, updateItemFunction, voteUrl }) {
  const [loading, setLoading] = useState(false);

  const up = e => {
    setLoading(true);
    post(1);
  };

  const down = e => {
    setLoading(true);
    post(-1);
  };

  const post = (value) => {
    axios({
      method: 'post',
      url: voteUrl,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      },
      data: { value },
    }).then((response) => {
      updateItemFunction(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  };

  return <div className="rating">
    <button
      className={item.voted === -1 && !loading ? 'down-active' : 'down'}
      onClick={down}
      disabled={item.voted === -1}
    >
      -
    </button>
    {
      loading ?
        <img className="loading" src={loadingGif} alt="loading-gef" /> :
        <label className={item.rating >= 0 ? 'positive-rating' : 'negative-rating'}>
          { item.rating > 0 ? '+' + item.rating : item.rating }
        </label>
    }
    <button
      className={item.voted === 1 && !loading ? 'up-active' : 'up'}
      onClick={up}
      disabled={item.voted === 1}
    >
      +
    </button>
  </div>;
}

export default Rating;