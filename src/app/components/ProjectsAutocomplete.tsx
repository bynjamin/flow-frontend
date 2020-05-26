import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ProjectIcon from '@material-ui/icons/Widgets';
import useProjectsSearch from 'app/hooks/useProjectsSearch';

type Props = {
  setSelected: Dispatch<SetStateAction<number[]>>;
  label?: string;
  initialValues?: any[];
};

const ProjectsAutocomplete: React.FC<Props> = ({
  setSelected,
  label = 'Search projects',
  initialValues = [],
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [values, setValues] = useState<any>(initialValues);
  const [resultsOpen, setResultsOpen] = useState<boolean>(false);
  const { search, results, loading } = useProjectsSearch();

  const handleSetSelectedIds = () => {
    const selectedIds = values.map((item: any) => item.id);
    setSelected(selectedIds);
  };

  useEffect(() => search(inputValue), [inputValue, search]);
  useEffect(handleSetSelectedIds, [values]);

  return (
    <Autocomplete
      id="projects-autocomplete"
      style={{ width: 300 }}
      noOptionsText="No results"
      open={resultsOpen}
      onOpen={() => {
        setResultsOpen(true);
      }}
      onClose={() => {
        setResultsOpen(false);
      }}
      value={values}
      onChange={(event, newValues) => {
        setValues(newValues);
      }}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={option => option.name}
      options={results}
      loading={loading}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(option, state) => (
        <ListItem>
          <ListItemIcon>
            <ProjectIcon />
          </ListItemIcon>
          <ListItemText primary={option.name} />
        </ListItem>
      )}
      ListboxComponent={List}
      openOnFocus
      multiple
      filterSelectedOptions
      freeSolo
      autoComplete
      includeInputInList
    />
  );
};

export default ProjectsAutocomplete;
