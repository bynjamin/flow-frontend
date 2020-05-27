import React, { useState, useEffect } from 'react';
import { withFormsy } from 'formsy-react';
import DateFnsUtils from '@date-io/date-fns';
// import FormControl from '@material-ui/core/FormControl';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import { WithFormsyProps } from 'common/types/formsy';

type Props = {
  label: string;
};

const DatePickerFormsy = (props: WithFormsyProps & Props) => {
  const [open, setOpen] = useState<boolean>(false);
  // An error message is returned only if the component is invalid
  const errorMessage = props.getErrorMessage();
  const value = props.getValue();

  const toggleOpen = () => setOpen(!open);

  const changeValue = (date: Date | null) => {
    toggleOpen();
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    props.setValue(date);
  };

  useEffect(() => props.setValue(new Date()), []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        id="date-picker-inline"
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="none"
        label={props.label}
        value={value}
        onChange={changeValue}
        open={open}
        onOpen={toggleOpen}
        onClose={toggleOpen}
        inputVariant="outlined"
        fullWidth
      />
    </MuiPickersUtilsProvider>
  );
};

export default withFormsy(DatePickerFormsy);
