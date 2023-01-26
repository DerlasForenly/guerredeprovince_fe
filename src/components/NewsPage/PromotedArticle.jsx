import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { LinearProgress, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import * as React from 'react';

import Article from './Article';
import { loadPromotedArticle } from '../../redux/news/actions';
import Title from '../../components/baseComponents/Title';

function PromotedArticle ({ loadPromotedArticle, article }) {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/articles/promoted`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      loadPromotedArticle(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, [loadPromotedArticle]);

  if (loading) {
    return (
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: 400 }}>
        <LinearProgress />
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: 400 }}>
      <Stack>
        <Title>Promoted article</Title>
        <Article article={article} />
      </Stack>
    </Paper>
  );
}

const mapDispatchToProps = {
  loadPromotedArticle,
};

const mapStateToProps = state => {
  return {
    article: state.news.promotedArticle,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PromotedArticle);

