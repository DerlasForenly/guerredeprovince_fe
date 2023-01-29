import { LinearProgress, Stack } from '@mui/material';
import Title from '../../components/baseComponents/Title';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Article from './Article';

export default function RecommendedArticle ({ user }) {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/articles/recommended`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      setArticle(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: 400 }}>
        <Stack>
          <Title>Recommended article</Title>
          <LinearProgress />
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: 400 }}>
      <Stack>
        <Title>Recommended article</Title>
        <Article article={article} />
      </Stack>
    </Paper>
  );
}