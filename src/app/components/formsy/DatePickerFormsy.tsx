import React from 'react';
import { withFormsy } from 'formsy-react';
import DateFnsUtils from '@date-io/date-fns';
// import FormControl from '@material-ui/core/FormControl';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import { WithFormsyProps } from 'common/types/formsy';

type Props = {
  label: string;
};

const DatePickerFormsy = (props: WithFormsyProps & Props) => {
  // An error message is returned only if the component is invalid
  const errorMessage = props.getErrorMessage();
  const value = props.getValue();

  const changeValue = (date: Date | null) => {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    props.setValue(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="none"
        id="date-picker-inline"
        label={props.label}
        value={value}
        onChange={changeValue}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        inputVariant="outlined"
        fullWidth
      />
    </MuiPickersUtilsProvider>
  );
};

export default withFormsy(DatePickerFormsy);
