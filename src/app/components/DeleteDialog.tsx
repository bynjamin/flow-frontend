import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import CriticalButton from 'common/components/CriticalButton';
import Dialog from 'common/components/Dialog';

const DELETE_WORD = 'DELETE';

type Props = {
  title: string;
  onDelete: () => void;
  critical?: boolean;
  multiple?: boolean;
  withoutController?: boolean;
};

const DeleteDialog: React.FC<Props> = ({
  title,
  onDelete,
  critical,
  multiple,
  withoutController,
}) => {
  const [validationInput, setValidationInput] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidationInput(event.target.value);
  };

  return (
    <Dialog
      title={title}
      openController={
        !withoutController && (
          <CriticalButton
            className="mr-8 normal-case"
            variant="contained"
            color="primary"
            aria-label="Follow"
            startIcon={<DeleteIcon />}
          >
            Delete
          </CriticalButton>
        )
      }
      closeController={
        <Button
          className="mr-8 normal-case"
          variant="contained"
          aria-label="Follow"
          disableElevation
        >
          Cancel
        </Button>
      }
      content={
        <>
          <Alert severity="warning">
            Are you sure you want to permamently delete{' '}
            {multiple ? 'these items' : 'this item'}?
            <br />
            After this action, it will not be possible to restore{' '}
            {multiple ? 'them' : 'it'}.
          </Alert>
          {critical && (
            <TextField
              value={validationInput}
              onChange={handleInputChange}
              variant="outlined"
              margin="dense"
              fullWidth
              placeholder={`Type '${DELETE_WORD}' to proceed`}
            />
          )}
        </>
      }
      actions={
        <CriticalButton
          className="mr-8 normal-case"
          variant="contained"
          aria-label="Follow"
          startIcon={<DeleteIcon />}
          onClick={onDelete}
          disableElevation
          disabled={critical && validationInput !== DELETE_WORD}
        >
          Delete
        </CriticalButton>
      }
    />
  );
};

export default DeleteDialog;
