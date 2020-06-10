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

type SetSingle = (id: number) => void;
type SetMultiple = (ids: Array<number>) => void;

type Props = {
  setSelected: SetSingle | SetMultiple;
  label?: string;
  initialValue?: any[];
  multiple?: boolean;
  size?: 'medium' | 'small';
};

const UsersAutocomplete: React.FC<Props> = ({
  setSelected,
  label = 'Search users',
  initialValue = [],
  multiple = false,
  size = 'medium',
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [value, setValue] = useState<any>(initialValue);
  const [resultsOpen, setResultsOpen] = useState<boolean>(false);
  const { search, results, loading } = useUsersSearch();

  const handleSetSelectedIds = () => {
    const selected = multiple ? value.map((item: any) => item.id) : value?.id;
    setSelected(selected);
  };

  useEffect(() => search(inputValue), [inputValue, search]);
  useEffect(handleSetSelectedIds, [value]);

  return (
    <Autocomplete
      classes={{ inputRoot: 'bg-white' }}
      id="users-autocomplete"
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
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      getOptionSelected={(option, optionValue) => option.id === optionValue.id}
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
      multiple={multiple}
      filterSelectedOptions
      freeSolo
      fullWidth
      autoComplete
      includeInputInList
      size={size}
    />
  );
};

export default UsersAutocomplete;
