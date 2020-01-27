import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { dispatch } from '../state/store';
import AvailabilityMarker from './AvailabilityMarker';

const styles = {
  container: {
    height: '100%',
    width: '60%',
    margin: '10px',
    display: 'flex',
    flexFlow: 'column',
  },
  smallCell: {
    width: '10px',
  },
};

const RoomsAvailability = ({ classes }) => {
  useEffect(() => {
    dispatch.rooms.getRooms();
  });
  const rooms = useSelector(state => state.rooms.rooms);
  return (
    <div className={classes.container}>
      <TableContainer component={Paper}>
        <Table className={classes.table} size='small'>
          <TableHead>
            <TableRow>
              <TableCell className={classes.smallCell} alt='Availability' />
              <TableCell>Name</TableCell>
              <TableCell>Floor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map(row => (
              <TableRow key={row.name}>
                <TableCell className={classes.smallCell}>
                  <AvailabilityMarker availability={false} />
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell>{row.floor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

RoomsAvailability.propTypes = {
  classes: PropTypes.object.isRequired,
};

RoomsAvailability.defaultProps = {};

export default withStyles(styles)(RoomsAvailability);
