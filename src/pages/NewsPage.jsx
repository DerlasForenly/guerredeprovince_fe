import { connect } from 'react-redux';

import PromotedArticle from '../components/PromotedArticle';
import LastArticles from '../components/LastArticles';
import SubscriptionArticles from '../components/SubscriptionArticles';
import RecommendedArticles from '../components/RecommendedArticles';
import NewspaperShortInfo from '../components/NewspaperShortInfo';

const NewsPage = () => {
  return <div className="news-page col">
    <div>
      <NewspaperShortInfo></NewspaperShortInfo>
      <div className="row">
        <div className="col">
          <PromotedArticle></PromotedArticle>
          <RecommendedArticles></RecommendedArticles>
        </div>
        <SubscriptionArticles></SubscriptionArticles>
        <LastArticles></LastArticles>
      </div>
    </div>
  </div>;
};

export default connect(null, null)(NewsPage);
