import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import useUsersSearch from 'app/hooks/useUsersSearch';
import ColorAvatar from 'app/components/ColorAvatar';

type Props = {
  setSelected: Dispatch<SetStateAction<number[]>>;
  label?: string;
  initialValues?: any[];
};

const UsersAutocomplete: React.FC<Props> = ({
  setSelected,
  label = 'Search users',
  initialValues = [],
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [values, setValues] = useState<any>(initialValues);
  const [resultsOpen, setResultsOpen] = useState<boolean>(false);
  const { search, results, loading } = useUsersSearch();

  const handleSetSelectedIds = () => {
    const selectedIds = values.map((item: any) => item.id);
    setSelected(selectedIds);
  };

  useEffect(() => search(inputValue), [inputValue, search]);
  useEffect(handleSetSelectedIds, [values]);

  return (
    <Autocomplete
      id="users-autocomplete"
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
      getOptionLabel={option => option.email}
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
          <ListItemAvatar>
            <ColorAvatar colorString={option.email}>
              {option.firstName[0]}
            </ColorAvatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${option.firstName} ${option.lastName}`}
            secondary={option.email}
          />
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

export default UsersAutocomplete;
