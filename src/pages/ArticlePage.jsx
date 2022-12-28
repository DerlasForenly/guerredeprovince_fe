import { connect } from 'react-redux';
import ArticleContent from '../components/ArticlePage/ArticleContent';
import CommentsSection from '../components/ArticlePage/Comments/CommnetsSection';

const ArticlePage = () => {
  return <div className="article-page col">
    <ArticleContent></ArticleContent>
    <CommentsSection></CommentsSection>
  </div>;
};

export default connect(null, null)(ArticlePage);

