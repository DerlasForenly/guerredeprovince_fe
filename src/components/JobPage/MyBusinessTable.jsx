import { connect } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import BusinessTableItem from './BusinessTableItem';

/**
 * @param user
 * @param businesses
 * @returns {JSX.Element}
 * @constructor
 */
function MyBusinessTable ({ user, businesses }) {
  return (
    <Table sx={{ minWidth: 500, width: '100%' }} size="small" aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Business</TableCell>
          <TableCell align="right">Corporation</TableCell>
          <TableCell align="right">LVL</TableCell>
          <TableCell align="right">Type</TableCell>
          <TableCell align="right">Salary</TableCell>
          <TableCell align="right">Expected Salary</TableCell>
          <TableCell align="center">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {businesses?.map((business, index) => (
          <BusinessTableItem business={business} key={index}/>
        ))}
      </TableBody>
    </Table>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(MyBusinessTable);