import { connect } from 'react-redux';
import ArticleContent from '../components/ArticlePage/ArticleContent';
import CommentsSection from '../components/ArticlePage/Comments/CommnetsSection';
import Container from '@mui/material/Container';
import { LinearProgress, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { loadArticle, updateArticleRating } from '../redux/article/actions';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router';

const ArticlePage = ({ article, loadArticle, updateArticleRating }) => {
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/articles/${id}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      loadArticle(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });

  }, [id, loadArticle]);

  if (loading) {
    return (
      <Container sx={{ mt: 4, mb: 4 }}>
        <Stack spacing={2} width={'100%'}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '100%' }}>
            <LinearProgress />
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '100%' }}>
            <LinearProgress />
          </Paper>
        </Stack>
      </Container>
    )
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Stack spacing={2} width={'100%'}>
        <ArticleContent></ArticleContent>
        <CommentsSection></CommentsSection>
      </Stack>
    </Container>
  )
};

const mapDispatchToProps = {
  loadArticle,
  updateArticleRating,
};

const mapStateToProps = state => {
  return {
    article: state.article.article,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);

