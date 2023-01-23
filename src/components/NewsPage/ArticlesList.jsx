import { connect } from 'react-redux';

import Article from './Article';

const ArticlesList = ({ articles = [] }) => {
  return <div>{
    articles.map((item, index) => {
      return <Article article={item} key={index}></Article>;
    })
  }</div>;
};

export default connect(null, null)(ArticlesList);