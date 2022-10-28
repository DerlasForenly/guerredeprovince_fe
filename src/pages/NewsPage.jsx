import { connect } from 'react-redux';

import avatarImg from '../assets/default_avatar.jpg';

import PromotedArticle from '../components/PromotedArticle';
import TopArticles from '../components/TopArticles';
import SubscriptionArticles from '../components/SubscriptionArticles';
import RecommendedArticles from '../components/RecommendedArticles';

const NewsPage = () => {
  return <div className="news-page col">
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
        <TopArticles></TopArticles>
      </div>
    </div>
  </div>;
};

export default connect(null, null)(NewsPage);

function NewspaperShortInfo () {
  return <div className="newspaper-and-navigation-container row">
    <div className="newspaper-short-info-container row">
      <img src={avatarImg} alt="newspaper-avatar" />
      <div className="text-info col">
        <div className="col">
          <label className="newspaper-name">Газета доброї волі на кожен день</label>
          <label>Your position: moderator</label>
        </div>
        <label className="rating">+855</label>
      </div>
    </div>
    <div>
      <button>Create an article</button>
      <button>Promote an article</button>
      <button>My subscriptions</button>
    </div>
  </div>;
}
