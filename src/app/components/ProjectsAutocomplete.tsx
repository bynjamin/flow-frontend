import React, { useState, useEffect, ChangeEvent } from 'react';
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
  setSelected: (ids: Array<number> | number) => void;
  label?: string;
  initialValue?: any;
  multiple?: boolean;
};

const ProjectsAutocomplete: React.FC<Props> = ({
  setSelected,
  initialValue,
  label = 'Search projects',
  multiple = false,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [value, setValue] = useState<any>(initialValue);
  const [resultsOpen, setResultsOpen] = useState<boolean>(false);
  const { search, results, loading } = useProjectsSearch();

  const handleSetSelected = () => {
    let selected;
    if (multiple) {
      selected = value.map((item: any) => item.id);
    } else {
      selected = value?.id;
    }
    setSelected(selected);
  };

  useEffect(() => search(inputValue), [inputValue, search]);
  useEffect(handleSetSelected, [value]);

  return (
    <Autocomplete
      id="projects-autocomplete"
      // style={{ width: 300 }}
      noOptionsText="No results"
      open={resultsOpen}
      onOpen={() => {
        setResultsOpen(true);
      }}
      onClose={() => {
        setResultsOpen(false);
      }}
      value={value}
      onChange={(event: any, newValue: any) => {
        setValue(newValue);
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
      multiple={multiple}
      filterSelectedOptions
      freeSolo
      autoComplete
      includeInputInList
    />
  );
};

export default ProjectsAutocomplete;
