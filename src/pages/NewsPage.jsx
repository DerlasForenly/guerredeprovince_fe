import { connect } from 'react-redux';

import PromotedArticle from '../components/NewsPage/PromotedArticle';
import LastArticles from '../components/NewsPage/LastArticles';
import SubscriptionArticles from '../components/NewsPage/SubscriptionArticles';
import RecommendedArticles from '../components/NewsPage/RecommendedArticles';
import NewspaperShortInfo from '../components/NewsPage/NewspaperShortInfo';

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
