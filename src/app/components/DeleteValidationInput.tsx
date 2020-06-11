import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

type Props = {
  deleteWord?: string;
  setValidated: React.Dispatch<React.SetStateAction<boolean>>;
};

type Ref = any;

const DeleteValidationInput: React.FC<Props> = ({
  setValidated,
  deleteWord = 'DELETE',
}) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => setValidated(value === deleteWord), [
    deleteWord,
    setValidated,
    value,
  ]);

  return (
    <TextField
      value={value}
      onChange={handleChange}
      variant="outlined"
      margin="dense"
      fullWidth
      placeholder={`Type '${deleteWord}' to proceed`}
    />
  );
};

export default DeleteValidationInput;
