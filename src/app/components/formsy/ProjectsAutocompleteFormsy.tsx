import React from 'react';
import { withFormsy } from 'formsy-react';
import FormControl from '@material-ui/core/FormControl';
import ProjectsAutocomplete from 'app/components/ProjectsAutocomplete';
import { WithFormsyProps } from 'common/types/formsy';

type Props = {
  label?: string;
  multiple?: boolean;
};

const ProjectsAutocompleteFormsy = (props: WithFormsyProps & Props) => {
  // An error message is returned only if the component is invalid
  const errorMessage = props.getErrorMessage();
  const value = props.getValue();

  const changeValue = (ids: Array<number> | number) => {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    props.setValue(ids);
  };

  return (
    <FormControl className="w-full">
      <ProjectsAutocomplete
        label={props.label}
        multiple={props.multiple}
        initialValue={value}
        setSelected={changeValue}
      />
      <span>{errorMessage}</span>
    </FormControl>
  );
};

export default withFormsy(ProjectsAutocompleteFormsy);
