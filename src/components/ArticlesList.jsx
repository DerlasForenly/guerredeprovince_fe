import { connect } from 'react-redux';

import Article from './Article';
import loadingGif from '../assets/loading.gif';

const ArticlesList = ({ articles = [], loading = false }) => {
  if (loading) {
    return <img className="loading-gif" src={loadingGif} alt="loading-gif" />
  } else {
    return <div className="col">{
      articles.map((item, index) => {
        return <Article article={item} key={index}></Article>;
      })
    }</div>;
  }
};

export default connect(null, null)(ArticlesList);