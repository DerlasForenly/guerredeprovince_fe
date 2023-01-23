import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';

import Actions from '../components/NewspaperPage/Actions';
import { loadNewspaper } from '../redux/newspaper/actions';
import Avatar from '../components/baseComponents/Avatar';

function NewspaperPage ({ newspaper, loadNewspaper }) {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/newspapers/${id}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      loadNewspaper(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });

  }, [id, loadNewspaper]);

  return <div className="page">
    <div className="newspaper-container">
      <div className="row">
        <div className="col">
          <Avatar
            src={`${process.env.REACT_APP_API}/${newspaper.avatar}`}
            size={'huge'}
            mb={15}
          />
          <Actions></Actions>
        </div>
        <div className="text-data col">
          <label className="huge-name-label">{newspaper.name}</label>
          <p className="description small-content-p">{newspaper.description}</p>
          <StatisticsRow
            label="Owner:"
            value={newspaper.owner.nickname}
          />
          <div className="statistics col">
            <label className="medium-name-label">Statistics:</label>
            <StatisticsRow
              label="Best article:"
              value={newspaper.best_article?.title}
            />
            <StatisticsRow
              label="Worst article:"
              value={newspaper.worst_article?.title}
            />
            <StatisticsRow
              label="Count articles:"
              value={newspaper?.total_articles}
            />
            <StatisticsRow
              label="Total rating:"
              value={newspaper?.rating}
            />
            <StatisticsRow
              label="Personal:"
              value={newspaper?.count_staff}
            />
            <StatisticsRow
              label="Founded:"
              value={newspaper?.created_at}
            />
          </div>
        </div>
      </div>
    </div>
  </div>;
}

const mapDispatchToProps = {
  loadNewspaper
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    newspaper: state.newspaper.newspaper,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewspaperPage);

function StatisticsRow ({ label, value, url = false }) {
  if (url) {
    return <div className="statistics-row row">
      <label>{label}</label>
      <Link to={`/home`}><label>{value}</label></Link>
    </div>;
  } else {
    return <div className="statistics-row row">
      <label>{label}</label>
      <label>{value}</label>
    </div>;
  }
}