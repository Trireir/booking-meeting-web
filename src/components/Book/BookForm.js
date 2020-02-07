/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { withStyles } from '@material-ui/core/styles';
import DatePickerFieldDefault from '../../reusable-components/form/DatePickerFieldDefault';
import HourPickerFieldDefault from '../../reusable-components/form/HourPickerFieldDefault';
import SelectFieldDefault from '../../reusable-components/form/SelectFieldDefault';
import TextInputFieldDefault from '../../reusable-components/form/TextInputFieldDefault';
import ButtonField from '../../reusable-components/buttons/ButtonField';
import { getLastUserUsed } from '../../utils/localStorage';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  button: {
    fontSize: '16px',
    padding: '8px 16px',
    cursor: 'pointer',
  },
  buttons: {
    width: '100%',
    marginTop: '16px',
    marginBottom: '8px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
};

function parseRooms(rooms) {
  return rooms.map(room => ({
    value: room.id.toString(),
    text: `${room.name} (${room.floor})`,
  }));
}

const BookForm = ({ onSubmit, rooms, classes }) => {
  const now = new Date();
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        name: 'Meeting',
        authId: getLastUserUsed(),
        date: now,
        startHour: now,
        endHour: new Date(now.getTime() + 15 * 60 * 1000),
      }}
      validate={values => {
        const errors = {};
        if (new Date(values.startHour) > new Date(values.endHour)) {
          errors.endHour = 'End Hour should be after start';
        }
        return errors;
      }}
      render={({ handleSubmit, form, submitting, pristine }) => (
        <form onSubmit={handleSubmit} className={classes.container}>
          <div className={classes.field}>
            <TextInputFieldDefault
              name='authId'
              label='User ID'
              placeholder='User ID'
              required
            />
          </div>
          <div className={classes.field}>
            <TextInputFieldDefault
              name='name'
              label='Meeting Name'
              placeholder='Meeting Name'
            />
          </div>
          <div className={classes.field}>
            <SelectFieldDefault
              name='room'
              label='Room'
              text='Room'
              options={parseRooms(rooms)}
            />
          </div>
          <div className={classes.field}>
            <DatePickerFieldDefault
              name='date'
              label='Room'
              className={classes.selectField}
            />
          </div>
          <div className={classes.field}>
            <HourPickerFieldDefault
              name='startHour'
              label='Start Hour'
              className={classes.selectField}
            />
          </div>
          <div className={classes.field}>
            <HourPickerFieldDefault
              name='endHour'
              label='End Hour'
              className={classes.selectField}
            />
          </div>
          <div className={classes.buttons}>
            <ButtonField
              variant='contained'
              type='submit'
              color='primary'
              className={classes.button}
              disabled={submitting || pristine}
              loading={submitting}
            >
              Book
            </ButtonField>
          </div>
        </form>
      )}
    />
  );
};

BookForm.propTypes = {
  classes: PropTypes.object.isRequired,
  rooms: PropTypes.array.isRequired,
  onSubmit: PropTypes.func,
};

BookForm.defaultProps = {
  onSubmit: () => {},
};

export default withStyles(styles)(BookForm);
