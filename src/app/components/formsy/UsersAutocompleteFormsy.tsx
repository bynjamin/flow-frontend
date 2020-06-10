import React from 'react';
import { withFormsy } from 'formsy-react';
import FormControl from '@material-ui/core/FormControl';
import UsersAutocomplete from 'app/components/UsersAutocomplete';
import { WithFormsyProps } from 'common/types/formsy';

type Props = {
  label?: string;
  multiple?: boolean;
};

const UsersAutocompleteFormsy = (props: WithFormsyProps & Props) => {
  // An error message is returned only if the component is invalid
  const errorMessage = props.getErrorMessage();
  const value = props.getValue();

  const changeValue = (userIds: Array<number> | number) => {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    props.setValue(userIds);
  };

  return (
    <FormControl className="w-full">
      <UsersAutocomplete
        label={props.label}
        initialValue={value}
        setSelected={changeValue}
        multiple={props.multiple}
      />
      <span>{errorMessage}</span>
    </FormControl>
  );
};

export default withFormsy(UsersAutocompleteFormsy);
