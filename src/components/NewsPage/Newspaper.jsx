import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Newspaper ({ newspaper }) {
  return <Link className="newspaper-short-info-container row" to={`/newspaper/${newspaper.id}`}>
    <img src={`${process.env.REACT_APP_API}/${newspaper.avatar}`} alt="newspaper-avatar" className="newspaper-avatar" />
    <div className="text-info col">
      <div className="col">
        <label className="newspaper-name">{newspaper?.name}</label>
        <label>Your position: {newspaper.position}</label>
      </div>
      <label className={newspaper?.rating >= 0 ? 'positive-rating' : 'negative-rating'}>
        {newspaper?.rating > 0 ? '+' + newspaper?.rating : newspaper.rating}
      </label>
    </div>
  </Link>;
}

const mapDispatchToProps = {

};

const mapStateToProps = state => {
  return {
    newspaper: state.newspaper.newspaper,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Newspaper);
