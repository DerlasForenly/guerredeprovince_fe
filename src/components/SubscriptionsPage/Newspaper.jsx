import { connect } from 'react-redux';
import SubscribeButton from '../../components/NewspaperPage/SubscribeButton';
import { updateSubscription } from '../../redux/subscriptions/actions';
import { Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function Newspaper ({ newspaper, updateSubscription }) {
  return (
    <Stack
      direction={'row'}
      spacing={2}
      sx={{ width: '100%' }}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Stack direction={'row'} spacing={2}>
        <Link to={`/newspaper/${newspaper.id}`}>
          <Avatar
            src={`${process.env.REACT_APP_API}/${newspaper.avatar}`}
            alt="newspaper-avatar"
            sx={{ height: 86, width: 86 }}
          />
        </Link>
        <Stack spacing={1}>
          <Link to={`/newspaper/${newspaper.id}`}>
            <Typography component={'h2'} variant={'h6'}>
              {newspaper.name}
            </Typography>
          </Link>
          <Link to={`/user/${newspaper.owner.id}`}>
            <Typography component={'h2'} variant={'body1'}>
              Owner: {newspaper.owner.nickname}
            </Typography>
          </Link>
        </Stack>
      </Stack>
      <SubscribeButton
        variant={'contained'}
        size={'large'}
        newspaper={newspaper}
        updateSubscription={updateSubscription}
      />
    </Stack>
  );
}

const mapDispatchToProps = {
  updateSubscription,
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Newspaper);