import { connect } from 'react-redux';
import UnsubscriptionButton from './UnsubscriptionButton';
import SubscriptionButton from './SubscriptionButton';

function Newspaper ({ newspaper, key, subscribed }) {
  return <div className="newspaper row">
    <div className="row">
      <img
        src={`${process.env.REACT_APP_API}/${newspaper.avatar}`}
        alt="newspaper-avatar"
      />
      <div className="name-nickname col">
        <label className="name">{newspaper.name}</label>
        <label className="nickname">{newspaper.owner.nickname}</label>
      </div>
    </div>
    {
      subscribed ?
        <UnsubscriptionButton newspaperId={newspaper.id} /> :
        <SubscriptionButton newspaperId={newspaper.id} />
    }
  </div>;
}

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Newspaper);