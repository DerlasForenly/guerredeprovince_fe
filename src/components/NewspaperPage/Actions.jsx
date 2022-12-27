import { connect } from 'react-redux';
import StaffButton from './StaffButton';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import SubscribeButton from './SubscribeButton';
import { updateSubscription } from '../../redux/newspaper/actions';

function Actions ({ user, newspaper, updateSubscription }) {
  const isOwner = user.id === newspaper.owner.id;

  return <div className="actions">
    <SubscribeButton
      newspaperId={newspaper.id}
      isSubscribed={newspaper.subscribed}
      updateStateFunction={updateSubscription}
    />
    {isOwner ? <EditButton /> : <></>}
    {isOwner ? <StaffButton /> : <></>}
    {isOwner ? <DeleteButton /> : <></>}
  </div>;
}

const mapDispatchToProps = {
  updateSubscription,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    newspaper: state.newspaper.newspaper,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
