import { connect } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';

import loadingGif from '../../assets/loading.gif';
import { useEffect, useState } from 'react';
import { loadArticle, updateArticleRating } from '../../redux/article/actions';
import { Link } from 'react-router-dom';
import Rating from '../../components/baseComponents/Rating';
import Paper from '@mui/material/Paper';
import Title from '../../components/baseComponents/Title';
import Typography from '@mui/material/Typography';
import { LinearProgress, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';

function ArticleContent ({ article, loadArticle, updateArticleRating }) {
  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: 800 }}>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Title>{article.title}</Title>
        <Typography variant={'body2'} component={'h2'}>
          {article?.content}
        </Typography>
        <Stack justifyContent={'center'} alignItems="center" sx={{ width: '100%' }}>
          <Stack
            sx={{ width: '100%' }}
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <Stack direction={'row'} spacing={1}>
              <Avatar
                src={`${process.env.REACT_APP_API}/${article.avatar}`}
                alt={'article-avatar'}
                sx={{ width: 56, height: 56 }}
              />
              <Stack justifyContent={'space-between'}>
                <Typography variant={'body1'} component={'h2'}>
                  {article.newspaper.name}
                </Typography>
                <Typography variant={'body2'} component={'h2'}>
                  {article.author.nickname}
                </Typography>
              </Stack>
            </Stack>
            <Rating
              typoVariant={'h6'}
              size={'large'}
              item={article}
              voteUrl={`${process.env.REACT_APP_API}/api/articles/${article.id}/vote`}
              updateItemFunction={updateArticleRating}
            />
          </Stack>
          <Typography variant={'body2'} component={'h2'}>
            {article.created_at}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

const mapDispatchToProps = {
  loadArticle,
  updateArticleRating,
};

const mapStateToProps = state => {
  return {
    article: state.article.article,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContent);
