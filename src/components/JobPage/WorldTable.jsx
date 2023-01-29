import { connect } from 'react-redux';
import { Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import picturePlaceholder from '../../assets/picture-placeholder.jpg';
import Button from '@mui/material/Button';

const rows = [
  createData('Frozen yoghurt', 'Derlas Forenly', 159, 90, 'Gold', 13),
  createData('Ice cream sandwich', 'Derlas Forenly', 237, 99, 'Gold', 14),
  createData('Eclair', 'Derlas Forenly', 262, 16.0, 'Gold', 214),
  createData('Cupcake', 'Derlas Forenly', 305, 3.7, 'Gold', 12),
  createData('Gingerbread', 'Derlas Forenly', 356, 100, 'Gold', 11),
];

function createData (name, owner, lvl, salary, type, compensation) {
  return { name, owner, lvl, salary, type, compensation };
}

function WorldTable ({ user }) {
  return (
    <Table sx={{ minWidth: 500, width: '100%' }} size="small" aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Business</TableCell>
          <TableCell align="right">LVL</TableCell>
          <TableCell align="right">Type</TableCell>
          <TableCell align="right">Salary</TableCell>
          <TableCell align="right">CC</TableCell>
          <TableCell align="center">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <Stack direction={'row'} spacing={1}>
                <Avatar
                  variant={'square'}
                  src={picturePlaceholder}
                  alt={'business-avatar'}
                />
                <Stack>
                  <div>{row.name}</div>
                  <div>{row.owner}</div>
                </Stack>
              </Stack>
            </TableCell>
            <TableCell align="right">{row.lvl}</TableCell>
            <TableCell align="right">{row.type}</TableCell>
            <TableCell align="right">{row.salary}%</TableCell>
            <TableCell align="right">{row.compensation}</TableCell>
            <TableCell align="center">
              <Button size={'small'}>Join</Button>
            </TableCell>
          </TableRow>
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

export default connect(mapStateToProps, null)(WorldTable);