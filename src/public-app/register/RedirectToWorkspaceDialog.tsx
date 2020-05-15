import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { redirectToWorkspace } from './helpers';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const RedirectToWorkspaceDialog = ({ isOpen, handleClose }: Props) => {
  const [workspace, setWorkspace] = useState<string>('');

  const handleWorkspaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkspace(e.target.value);
  };

  const handleRedirect = () => {
    redirectToWorkspace(workspace);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        Redirect to your workspace
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To redirect to your workspace, please enter your valid workspace name.
        </DialogContentText>
        <TextField
          value={workspace}
          onChange={handleWorkspaceChange}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              handleRedirect();
              e.preventDefault();
            }
          }}
          autoFocus
          margin="dense"
          id="name"
          label="Workspace name"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleRedirect}
          color="secondary"
          disabled={!workspace}
        >
          Redirect
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RedirectToWorkspaceDialog;
