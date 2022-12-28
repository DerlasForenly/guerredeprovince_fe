import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from '../baseComponents/Avatar';
import RatingLabel from '../../components/baseComponents/RatingLabel';

function Newspaper ({ newspaper }) {
  return <Link className="newspaper-short-info-container row" to={`/newspaper/${newspaper.id}`}>
    <Avatar
      src={`${process.env.REACT_APP_API}/${newspaper.avatar}`}
      size={'medium'}
      mr={15}
    />
    <div className="text-info col">
      <div className="col">
        <label className="newspaper-name">{newspaper?.name}</label>
        <label>Your position: {newspaper.position}</label>
      </div>
      <RatingLabel
        value={newspaper.rating}
        fs={22}
      />
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
