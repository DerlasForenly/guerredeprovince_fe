import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SubscribeButton from '../../components/NewspaperPage/SubscribeButton';
import { updateSubscription } from '../../redux/subscriptions/actions';

function Newspaper ({ newspaper, key, subscribed, updateSubscription }) {
  return <div className="newspaper row">
    <div className="row">
      <Link to={`/newspaper/${newspaper.id}`}>
        <img
          src={`${process.env.REACT_APP_API}/${newspaper.avatar}`}
          alt="newspaper-avatar"
        />
      </Link>
      <div className="name-nickname col">
        <Link to={`/newspaper/${newspaper.id}`}>
          <label className="medium-name-label">{newspaper.name}</label>
        </Link>
        <Link to={`/user/${newspaper.owner.id}`}>
          <label className="medium-content-p">Owner: {newspaper.owner.nickname}</label>
        </Link>
      </div>
    </div>
    <SubscribeButton
      newspaperId={newspaper.id}
      isSubscribed={subscribed}
      updateStateFunction={updateSubscription}
      className={"huge-gray-button"}
    />
  </div>;
}

const mapDispatchToProps = {
  updateSubscription,
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Newspaper);