import { connect } from 'react-redux';
import { updateArticleRating } from '../../redux/article/actions';
import Rating from '../../components/baseComponents/Rating';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import ArticleMenu from './ArticleMenu';

function ArticleContent ({ article, updateArticleRating }) {
  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: 800 }}>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
          <Typography variant={'h4'} component={'h2'} color={'primary'}>
            {article.title}
          </Typography>
          <ArticleMenu />
        </Stack>
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
                variant={'square'}
                src={`${process.env.REACT_APP_API}/${article.avatar}`}
                alt={'article-avatar'}
                sx={{ width: 56, height: 56 }}
              />
              <Stack>
                <Link to={`/newspaper/${article.newspaper.id}`}>
                  <Typography variant={'body1'} component={'h2'} color={'primary'}>
                    {article.newspaper.name}
                  </Typography>
                </Link>

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
          <Typography variant={'body2'} component={'h2'} color={'gray'} fontSize={13}>
            {article.created_at}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

const mapDispatchToProps = {
  updateArticleRating,
};

const mapStateToProps = state => {
  return {
    article: state.article.article,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContent);
