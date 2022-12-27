import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import loadingGif from '../assets/ok2.gif';
import RatingLabel from '../components/RatingLabel';
import ratingArrowIcon from '../assets/pagination-arrow.png';

function Rating ({
                   item,
                   updateItemFunction,
                   voteUrl,
                   fs = 28,
                   fw = 'bold',
                   iconH = 15,
                   iconW = 15,
                   padding = 10
                 }) {
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

  return <div className="rating-container">
    <div
      className="arrow-container"
      style={{ height: iconH, width: iconW, padding: padding }}
    >
      <img
        src={ratingArrowIcon}
        alt="rating-arrow"
        className="rating-arrow down"
        onClick={down}
        style={{ height: iconH, width: iconW }}
      />
    </div>
    {
      loading ?
        <img
          className="loading"
          src={loadingGif}
          alt="loading-gif"
          style={{
            height: iconH,
            width: iconW,
          }}
        /> :
        <RatingLabel
          value={item.rating}
          fs={fs}
          fw={fw}
        />
    }
    <div
      className="arrow-container"
      style={{ height: iconH, width: iconW, padding: padding }}
    >
      <img
        src={ratingArrowIcon}
        alt="rating-arrow"
        className="rating-arrow up"
        onClick={up}
        style={{ height: iconH, width: iconW }}
      />
    </div>
  </div>;
}

export default Rating;