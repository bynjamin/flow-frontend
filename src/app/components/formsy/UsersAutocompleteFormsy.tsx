import React from 'react';
import { withFormsy } from 'formsy-react';
import UsersAutocomplete from 'app/components/UsersAutocomplete';
import { WithFormsyProps } from 'common/types/formsy';

type Props = {
  label?: string;
};

const UsersAutocompleteFormsy = (props: WithFormsyProps & Props) => {
  // An error message is returned only if the component is invalid
  const errorMessage = props.getErrorMessage();
  const value = props.getValue();

  const changeValue = (userIds: Array<number>) => {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    props.setValue(userIds);
  };

  return (
    <div>
      <UsersAutocomplete
        label={props.label}
        initialValues={value}
        setSelected={changeValue}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default withFormsy(UsersAutocompleteFormsy);
