import { connect } from 'react-redux';

import avatarImg from '../assets/default_avatar.jpg';
import flagImg from '../assets/flag-of-ukraine.jpg';
import Pagination from '../components/Pagination';

const NewsPage = (props) => {
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

function ArticlesList () {
  return <div className="col">
    <Article></Article>
    <Article></Article>
    <Article></Article>
    <Article></Article>
    <Article></Article>
    <Article></Article>
    <Article></Article>
    <Article></Article>
  </div>;
}

function TopArticles () {
  return <div className="articles-list row">
    <div className="col">
      <div className="articles-list__title-container row">
        <label className="articles-list__header">Top Article in</label>
        <img src={flagImg} alt="flag" className="articles-list__flag"></img>
        <button>Change language</button>
      </div>
      <ArticlesList></ArticlesList>
      <Pagination></Pagination>
    </div>
  </div>;
}

function RecommendedArticles () {
  return <div className="articles-list row">
    <div className="col">
      <div className="articles-list__title-container row">
        <label className="articles-list__header">Recommended for you</label>
      </div>
      <ArticlesList></ArticlesList>
    </div>
  </div>;
}

function PromotedArticle () {
  return <div className="articles-list row">
    <div className="col">
      <div className="articles-list__title-container row">
        <label className="articles-list__header">Promoted article</label>
      </div>
      <Article></Article>
    </div>
  </div>;
}

function SubscriptionArticles () {
  return <div className="articles-list row">
    <div className="col">
      <div className="articles-list__title-container row">
        <label className="articles-list__header">Your subscriptions</label>
      </div>
      <ArticlesList></ArticlesList>
      <Pagination></Pagination>
    </div>
  </div>;
}

function Article () {
  return <div className="article row">
    <div className="space-between col">
      <label className="title">Як приборкати клоуна за 400 американських гривень</label>
      <div className="row">
        <label className="author">[WMI] Derlas Forenly</label>
        <label className="rating">+15</label>
      </div>
    </div>
    <img src={avatarImg} alt="avatar" className="avatar"></img>
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
