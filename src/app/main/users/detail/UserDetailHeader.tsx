import React, { useContext } from 'react';
import gql from 'graphql-tag';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { MISSING_FIELD } from 'common/constants';
import DeleteUserDialog, { DeleteUserDialogFragment } from './DeleteUserDialog';
import UpdateUserDialog, { UpdateUserDialogFragment } from './UpdateUserDialog';
import ChangePasswordDialog from './ChangePasswordDialog';
import { AppContext } from 'app/AppContext';
// eslint-disable-next-line no-unused-vars
import { UserDetailHeaderFragment__data as DataType } from './__generated__/UserDetailHeaderFragment__data';
// eslint-disable-next-line no-unused-vars
import { UserDetailHeaderFragment__roles as RoleType } from './__generated__/UserDetailHeaderFragment__roles';

type Props = {
  data: DataType;
  roles: RoleType[];
};

const UserDetailHeader: React.FC<Props> = ({ data, roles }) => {
  const { user, permissions } = useContext(AppContext);

  const isCurrentUser = () => user.id === data.id;
  const canUpdate = () => {
    if (isCurrentUser()) {
      return permissions.User.basic.update;
    }
    return permissions.User.global.update;
  };
  const canDelete = () => {
    if (isCurrentUser()) {
      return permissions.User.basic.delete;
    }
    return permissions.User.global.delete;
  };

  if (!data) {
    return null;
  }

  return (
    <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
      <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
        <FuseAnimate animation="transition.expandIn" delay={300}>
          <Avatar
            className="w-96 h-96"
            src="assets/images/avatars/profile.jpg"
          />
        </FuseAnimate>
        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
          <Typography className="md:ml-24" variant="h4" color="inherit">
            {data.fullName || MISSING_FIELD}
          </Typography>
        </FuseAnimate>
      </div>

      <div className="flex items-center justify-end">
        {isCurrentUser() && <ChangePasswordDialog />}
        {canUpdate() && <UpdateUserDialog data={data} roles={roles} />}
        {canDelete() && <DeleteUserDialog data={data} />}
      </div>
    </div>
  );
};

export default UserDetailHeader;

export const UserDetailHeaderFragment = {
  data: gql`
    fragment UserDetailHeaderFragment__data on User {
      id
      fullName
      ...DeleteUserDialogFragment__data
      ...UpdateUserDialogFragment__data
    }
    ${DeleteUserDialogFragment.data}
    ${UpdateUserDialogFragment.data}
  `,
  roles: gql`
    fragment UserDetailHeaderFragment__roles on UserRole {
      ...UpdateUserDialogFragment__roles
    }
    ${UpdateUserDialogFragment.roles}
  `,
};
