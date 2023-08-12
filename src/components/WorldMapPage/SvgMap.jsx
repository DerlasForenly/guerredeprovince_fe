import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { LinearProgress } from '@mui/material';
import { setSelectedRegion } from '../../redux/worldMap/actions';

function SvgMap ({ user, selectedRegion, setSelectedRegion }) {
  const [loading, setLoading] = useState(true);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    setSelectedRegion(false);
    setLoading(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/world-map`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      setRegions(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, [setSelectedRegion]);

  const onClick = e => {
    e.preventDefault();

    let elements = document.getElementsByClassName('selected-map-region');
    Array.from(elements).forEach((element, index) => {
      element.removeAttribute('class');
      element.setAttribute('class', 'map-region');
    });

    e.target.setAttribute('class', 'map-region selected-map-region');

    const selectedRegion = regions.filter(region => region.id === Number(e.target.id))[0];

    setSelectedRegion(selectedRegion)
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 670"
      aria-label="Map of Ukraine"
    >
      {
        loading ? <LinearProgress /> :
          regions.map((region, index) => {
            return (
              <path
                key={index}
                d={region.svg_d}
                name={region.name}
                id={region.id}
                fill={region.country.color}
                stroke={'black'}
                className={'map-region'}
                onClick={onClick}
              />
            );
          })
      }
    </svg>
  );
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    selectedRegion: state.worldMap.selectedRegion
  };
};

const mapDispatchToProps = {
  setSelectedRegion,
};

export default connect(mapStateToProps, mapDispatchToProps)(SvgMap);