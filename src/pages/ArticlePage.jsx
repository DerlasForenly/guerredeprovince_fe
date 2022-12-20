import { connect } from 'react-redux';
import ArticleContent from '../components/ArticleContent';

const ArticlePage = () => {
  return <div className="article-page col">
    <ArticleContent></ArticleContent>
    <CommentsSection></CommentsSection>
  </div>;
};

export default connect(null, null)(ArticlePage);

function CommentsSection () {
  return <div className="comments-section-container">
    <button>Show comments (1365)</button>
  </div>;
}