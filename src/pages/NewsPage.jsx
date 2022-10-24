import { connect } from "react-redux";

import avatarImg from "../assets/default_avatar.jpg";
import flagImg from "../assets/flag-of-ukraine.jpg";

const NewsPage = (props) => {
	return <div className="news-page row">
		<div className="col">
			<ArticlesList></ArticlesList>
		</div>
		<div className="col">
			<ArticlesList></ArticlesList>
		</div>
		<div className="col">
			<ArticlesList></ArticlesList>
		</div>
	</div>
}

export default connect(null, null)(NewsPage)

function ArticlesList() {
	return <div className="top-article-container row">
		<div className="info-container col">
			<div className="container-title row">
				<label className="header">Top Article in</label>
				<img src={flagImg} alt="flag"></img>
			</div>
			<Article></Article>
		</div>
	</div>
}

function TopArticles() {

}

function RecommendedArticles() {

}

function SubscriptionArticles() {

}

function Article() {
	return <div className="row">
		<div className="info-container col">
			<label className="article-name">Як приборкати клоуна за 400 американських гривень</label>
			<label className="nickname">[WMI] Derlas Forenly</label>
		</div>
		<img src={avatarImg} alt="avatar" className="news-article-img"></img>
	</div>
}