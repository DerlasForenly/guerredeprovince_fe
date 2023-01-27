import { connect } from 'react-redux';
import SubscribeButton from '../../components/NewspaperPage/SubscribeButton';
import { updateSubscription } from '../../redux/subscriptions/actions';
import { Link, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

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
        <Link href={`/newspaper/${newspaper.id}`}>
          <Avatar
            src={`${process.env.REACT_APP_API}/${newspaper.avatar}`}
            alt="newspaper-avatar"
            sx={{ height: 86, width: 86 }}
          />
        </Link>
        <Stack spacing={1}>
          <Link href={`/newspaper/${newspaper.id}`} color={'inherit'} underline={'none'}>
            <Typography component={'h2'} variant={'h6'}>
              {newspaper.name}
            </Typography>
          </Link>
          <Link href={`/user/${newspaper.owner.id}`} color={'inherit'} underline={'none'}>
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