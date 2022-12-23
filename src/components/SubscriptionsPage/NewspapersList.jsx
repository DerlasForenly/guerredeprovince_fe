import { connect } from 'react-redux';
import Newspaper from './Newspaper';

function NewspapersList ({ subscriptions }) {
  return <div className="col">{
    subscriptions.map((item, index) => {
      return <Newspaper newspaper={item} key={index} subscribed={item.subscribed}></Newspaper>;
    })
  }</div>;
}

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    subscriptions: state.subscriptions.subscriptions.subscriptions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewspapersList);
