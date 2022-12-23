import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SubscriptionButton from '../Newspaper/SubscriptionButton';
import UnsubscriptionButton from '../Newspaper/UnsubscriptionButton';

function Actions ({ user, newspaper }) {

  return <div className="actions">
    { newspaper.subscribed ? <UnsubscriptionButton newspaperId={newspaper.id}/> : <SubscriptionButton newspaperId={newspaper.id}/> }
    <Edit
      hide={user.id !== newspaper.owner.id}
    />
    <Staff
      hide={user.id !== newspaper.owner.id}
    />
    <Delete
      hide={user.id !== newspaper.owner.id}
    />
  </div>;
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    newspaper: state.newspaper.newspaper,
  };
};

export default connect(mapStateToProps, null)(Actions);

function Edit ({ hide }) {
  return hide ? <div></div> : <Link to={'/home'}><button>Edit</button></Link>
}

function Staff ({ hide }) {
  return hide ? <div></div> : <Link to={'/home'}><button>Staff</button></Link>
}

function Delete ({ hide }) {
  const onClickHandler = e => {

  }

  return hide ? <div></div> : <button className="delete-button" onClick={onClickHandler}>Delete</button>
}