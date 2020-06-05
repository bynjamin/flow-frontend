import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { Avatar, Typography } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/People';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { MISSING_FIELD } from 'common/constants';
import { AppContext } from 'app/AppContext';

import DeleteUserGroupDialog, {
  DeleteUserGroupDialogFragment,
} from './DeleteUserGroupDialog';
import UpdateUserGroupDialog, {
  UpdateUserGroupDialogFragment,
} from './UpdateUserGroupDialog';
import { UserGroupDetailHeaderFragment__data as DataType } from './__generated__/UserGroupDetailHeaderFragment__data';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      color: theme.palette.getContrastText(blueGrey[50]),
      backgroundColor: blueGrey[50],
    },
    avatarIcon: {
      fontSize: 64,
    },
  }),
);

type Props = {
  data: DataType;
};

const UserGroupDetailHeader: React.FC<Props> = ({ data }) => {
  const classes = useStyles();
  const { permissions } = useContext(AppContext);

  const canUpdate = () => permissions.UserGroup.basic.update;
  const canDelete = () => permissions.UserGroup.basic.delete;

  if (!data) {
    return null;
  }

  return (
    <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
      <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
        <FuseAnimate animation="transition.expandIn" delay={300}>
          <Avatar
            variant="rounded"
            className={`w-96 h-96 ${classes.avatar}`}
            alt={data.name}
          >
            <GroupIcon className={classes.avatarIcon} />
          </Avatar>
        </FuseAnimate>
        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
          <Typography className="md:ml-24" variant="h4" color="inherit">
            {data.name || MISSING_FIELD}
          </Typography>
        </FuseAnimate>
      </div>

      <div className="flex items-center justify-end">
        {canUpdate() && <UpdateUserGroupDialog data={data} />}
        {canDelete() && <DeleteUserGroupDialog data={data} />}
      </div>
    </div>
  );
};

export default UserGroupDetailHeader;

export const UserGroupDetailHeaderFragment = {
  data: gql`
    fragment UserGroupDetailHeaderFragment__data on UserGroup {
      name
      ...UpdateUserGroupDialogFragment__data
      ...DeleteUserGroupDialogFragment__data
    }
    ${UpdateUserGroupDialogFragment.data}
    ${DeleteUserGroupDialogFragment.data}
  `,
};
