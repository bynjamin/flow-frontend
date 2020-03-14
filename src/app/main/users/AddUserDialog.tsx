import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

const initialUser = {
  firstName: '',
  lastName: '',
  age: 0,
  visits: 0,
  status: 'single',
  progress: 0,
  subRows: undefined,
};

type Props = {
  addUserHandler: any;
  open: boolean;
  onClose: () => void;
};

const AddUserDialog: React.FC<Props> = ({ open, onClose, addUserHandler }) => {
  const [user, setUser] = useState(initialUser);

  const [switchState, setSwitchState] = React.useState({
    addMultiple: false,
  });

  const handleSwitchChange = (name: any) => (event: any) => {
    setSwitchState({ ...switchState, [name]: event.target.checked });
  };

  const resetSwitch = () => {
    setSwitchState({ addMultiple: false });
  };

  const handleClose = () => {
    onClose();
    resetSwitch();
  };

  const handleAdd = (event: any) => {
    addUserHandler(user);
    setUser(initialUser);
    if (!switchState.addMultiple) {
      onClose();
    }
  };

  const handleChange = (name: any) => ({
    target: { value },
  }: {
    target: { value: any };
  }) => {
    setUser({ ...user, [name]: value });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add User</DialogTitle>
      <DialogContent>
        <DialogContentText>Demo add item to react table.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="First Name"
          type="text"
          fullWidth
          value={user.firstName}
          onChange={handleChange('firstName')}
        />
        <TextField
          margin="dense"
          label="Last Name"
          type="text"
          fullWidth
          value={user.lastName}
          onChange={handleChange('lastName')}
        />
        <TextField
          margin="dense"
          label="Age"
          type="number"
          fullWidth
          value={user.age}
          onChange={handleChange('age')}
        />
        <TextField
          margin="dense"
          label="Visits"
          type="number"
          fullWidth
          value={user.visits}
          onChange={handleChange('visits')}
        />
        <TextField
          margin="dense"
          label="Status"
          type="text"
          fullWidth
          value={user.status}
          onChange={handleChange('status')}
        />
        <TextField
          margin="dense"
          label="Profile Progress"
          type="number"
          fullWidth
          value={user.progress}
          onChange={handleChange('progress')}
        />
      </DialogContent>
      <DialogActions>
        <Tooltip title="Add multiple">
          <Switch
            checked={switchState.addMultiple}
            onChange={handleSwitchChange('addMultiple')}
            value="addMultiple"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </Tooltip>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;
