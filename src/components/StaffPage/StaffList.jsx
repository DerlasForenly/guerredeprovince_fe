import { loadStaff } from '../../redux/newspaper/actions';
import { connect } from 'react-redux';
import StaffUser from './StaffUser';

function StaffList ({ staff = [] }) {
  return <div className="staff-list">
    {
      staff.map((item, index) => {
        return <StaffUser staff={item} key={index} />;
      })
    }
  </div>;
}

const mapDispatchToProps = {
  loadStaff,
};

const mapStateToProps = state => {
  return {
    staff: state.newspaper.staff,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffList);