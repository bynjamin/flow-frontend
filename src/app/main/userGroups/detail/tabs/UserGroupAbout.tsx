import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { AppContext } from 'app/AppContext';
import { ADD_USERS_TO_GROUP } from '../mutations/addUsersToGroup';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Members from 'app/components/Members';
import { MISSING_FIELD } from 'common/constants';
import {
  // eslint-disable-next-line no-unused-vars
  UserGroupAboutFragment__data as DataType,
  // eslint-disable-next-line no-unused-vars
  UserGroupAboutFragment__data_members as MemberType,
} from './__generated__/UserGroupAboutFragment__data';
import {
  // eslint-disable-next-line no-unused-vars
  AddUsersToUserGroup as ResponseType,
  // eslint-disable-next-line no-unused-vars
  AddUsersToUserGroupVariables as InputType,
} from '../mutations/__generated__/AddUsersToUserGroup';

type Props = {
  data: DataType;
};

const UserGroupAbout: React.FC<Props> = ({ data }) => {
  const { setLoading, setActionFeedback } = useContext(AppContext);
  const [addMembersOpen, setAddMembersOpen] = useState<boolean>(false);
  const [addMembersValue, setAddMemebersValue] = useState<string>('');
  const [addMembersToGroup] = useMutation<ResponseType, InputType>(
    ADD_USERS_TO_GROUP,
  );

  const openAddMembers = () => {
    setAddMembersOpen(true);
  };

  const closeAddMembers = () => {
    setAddMembersOpen(false);
    setAddMemebersValue('');
  };

  const handleChangeAddMembersValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAddMemebersValue(event.target.value);
  };

  const sanitize = (input: string): number[] => {
    const stringsArray = input.split(',');
    const result = stringsArray.map((item: string) => Number(item));
    return result;
  };

  const dispatchErrorFeedback = () => {
    setActionFeedback({
      message: 'Unable to add members',
      severity: 'error',
    });
  };

  const dispatchSuccessFeedback = () => {
    setActionFeedback({
      message: 'Members was successfully added to group',
      severity: 'success',
    });
  };

  const handleSubmit = async () => {
    try {
      const userIds = sanitize(addMembersValue);
      closeAddMembers();
      setLoading(true);
      const { data: response } = await addMembersToGroup({
        variables: { groupId: data.id, userIds },
      });
      if (response?.addUsersToUserGroup) {
        dispatchSuccessFeedback();
      } else {
        dispatchErrorFeedback();
      }
    } catch {
      dispatchErrorFeedback();
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    console.log('Remove');
  };

  if (!data) {
    return null;
  }

  return (
    <>
      <div className="p-16 sm:p-24">
        <div className="flex flex-col flex-1">
          <FuseAnimate animation="transition.slideUpBigIn" delay={300}>
            <Card className="w-full mb-16">
              <AppBar position="static" elevation={0}>
                <Toolbar className="pl-16 pr-8">
                  <Typography
                    variant="subtitle1"
                    color="inherit"
                    className="flex-1"
                  >
                    General Information
                  </Typography>
                </Toolbar>
              </AppBar>

              <CardContent>
                <div className="mb-24">
                  <Typography className="font-bold mb-4 text-15">
                    Group name
                  </Typography>
                  <Typography>{data.name}</Typography>
                </div>

                <div className="mb-24">
                  <Typography className="font-bold mb-4 text-15">
                    Description
                  </Typography>
                  <Typography>{data.description || MISSING_FIELD}</Typography>
                </div>
              </CardContent>
            </Card>
          </FuseAnimate>
        </div>

        <div className="flex">
          <div className="w-full h-512">
            <Members
              members={data.members}
              onAdd={openAddMembers}
              onRemove={handleRemove}
            />
          </div>
        </div>
      </div>
      <Dialog
        open={addMembersOpen}
        onClose={closeAddMembers}
        aria-labelledby="add-members-dialog-title"
      >
        <DialogTitle id="add-members-dialog-title">Add members</DialogTitle>
        <DialogContent>
          <DialogContentText>Search users by their email</DialogContentText>
          <TextField
            value={addMembersValue}
            onChange={handleChangeAddMembersValue}
            autoFocus
            margin="dense"
            id="users"
            label="Search members"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddMembers}>Cancel</Button>
          <Button onClick={handleSubmit} color="secondary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserGroupAbout;

export const UserGroupAboutFragment = {
  data: gql`
    fragment UserGroupAboutFragment__data on UserGroup {
      id
      name
      description
      members {
        id
        title
        fullName
        email
        role {
          id
          name
        }
      }
    }
  `,
};
