import React, { useEffect, useCallback } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  Avatar,
} from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/FuseUtils';
import { DialogType } from './types';

const defaultFormState = {
  id: '',
  name: '',
  lastName: '',
  avatar: 'assets/images/avatars/profile.jpg',
  nickname: '',
  company: '',
  jobTitle: '',
  email: '',
  phone: '',
  address: '',
  notes: '',
};

const mockContactDialogData = {
  id: '5',
  name: 'Johana',
  lastName: 'Smetana',
  avatar: 'assets/images/avatars/profile.jpg',
  nickname: 'johanka339',
  company: 'Flowato',
  jobTitle: 'Rybar',
  email: 'johana.smetana@flowato.com',
  phone: '+421 910 869 336',
  address: 'plynarenska 33, Bratislava',
  notes: 'xxx',
};

type Props = {
  type: DialogType;
  isOpen: boolean;
  close: () => void;
};

const ContactDialog: React.FC<Props> = ({ isOpen, type, close }) => {
  const { form, handleChange, setForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (type === 'edit' && mockContactDialogData) {
      setForm({ ...mockContactDialogData });
    }

    /**
     * Dialog type: 'new'
     */
    if (type === 'new') {
      setForm({
        ...defaultFormState,
        id: FuseUtils.generateGUID(),
      });
    }
  }, [mockContactDialogData, type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (isOpen) {
      initDialog();
    }
  }, [isOpen, initDialog]);

  const canBeSubmitted = () => {
    return form.name.length > 0;
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (type === 'new') {
      console.log('create'); // send form
    } else {
      console.log('update'); // send form
    }
    close();
  };

  function handleRemove() {
    console.log('remove'); // remove form.id
    close();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      open={isOpen}
      onClose={close}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {type === 'new' ? 'New Contact' : 'Edit Contact'}
          </Typography>
        </Toolbar>
        <div className="flex flex-col items-center justify-center pb-24">
          <Avatar
            className="w-96 h-96"
            alt="contact avatar"
            src={form.avatar}
          />
          {type === 'edit' && (
            <Typography variant="h6" color="inherit" className="pt-8">
              {form.name}
            </Typography>
          )}
        </div>
      </AppBar>
      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col md:overflow-hidden"
      >
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">account_circle</Icon>
            </div>

            <TextField
              className="mb-24"
              label="Name"
              autoFocus
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20" />
            <TextField
              className="mb-24"
              label="Last name"
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">star</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Nickname"
              id="nickname"
              name="nickname"
              value={form.nickname}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">phone</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Phone"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">email</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">domain</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Company"
              id="company"
              name="company"
              value={form.company}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">work</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Job title"
              id="jobTitle"
              name="jobTitle"
              value={form.jobTitle}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">cake</Icon>
            </div>
            <TextField
              className="mb-24"
              id="birthday"
              label="Birthday"
              type="date"
              value={form.birthday}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">home</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Address"
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">note</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Notes"
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={5}
              fullWidth
            />
          </div>
        </DialogContent>

        {type === 'new' ? (
          <DialogActions className="justify-between pl-16">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              type="submit"
              disabled={!canBeSubmitted()}
            >
              Add
            </Button>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between pl-16">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
              disabled={!canBeSubmitted()}
            >
              Save
            </Button>
            <IconButton onClick={handleRemove}>
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
};

export default ContactDialog;
