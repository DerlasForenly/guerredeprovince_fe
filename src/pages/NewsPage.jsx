import { connect } from 'react-redux';

import avatarImg from '../assets/default_avatar.jpg';

import Pagination from '../components/Pagination';
import ArticlesList from '../components/ArticlesList';
import PromotedArticle from '../components/PromotedArticle';
import TopArticles from '../components/TopArticles';

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

function RecommendedArticles () {
  return <div className="articles-list col">
    <div className="articles-list__title-container row">
      <label className="articles-list__header">Recommended for you</label>
    </div>
    <ArticlesList></ArticlesList>
  </div>;
}

function SubscriptionArticles () {
  return <div className="articles-list col">
    <div className="articles-list__title-container row">
      <label className="articles-list__header">Your subscriptions</label>
    </div>
    <ArticlesList></ArticlesList>
    <Pagination></Pagination>
  </div>;
}

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
