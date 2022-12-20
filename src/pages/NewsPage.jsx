import { connect } from 'react-redux';

import PromotedArticle from '../components/PromotedArticle';
import LastArticles from '../components/LastArticles';
import SubscriptionArticles from '../components/SubscriptionArticles';
import RecommendedArticles from '../components/RecommendedArticles';
import NewspaperShortInfo from '../components/NewspaperShortInfo';

const NewsPage = () => {
  return <div className="news-page col">
    <div>
      <div>
        <NewspaperShortInfo></NewspaperShortInfo>
      </div>
      <div className="row">
        <div className="col">
          <PromotedArticle></PromotedArticle>
          <RecommendedArticles></RecommendedArticles>
        </div>
        <div className="col">
          <SubscriptionArticles></SubscriptionArticles>
        </div>
        <div className="col">
          <LastArticles></LastArticles>
        </div>
      </div>
    </div>
  </div>;
};

export default connect(null, null)(NewsPage);
