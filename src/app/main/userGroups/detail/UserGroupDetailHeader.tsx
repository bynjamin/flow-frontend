import React from 'react';
import gql from 'graphql-tag';
import { Avatar, Button, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { MISSING_FIELD } from 'common/constants';
import DeleteUserGroupDialog, {
  DeleteUserGroupDialogFragment,
} from './DeleteUserGroupDialog';
// eslint-disable-next-line no-unused-vars
import { UserGroupDetailHeaderFragment as DataType } from './__generated__/UserGroupDetailHeaderFragment';

type Props = {
  data: DataType;
};

const UserGroupDetail: React.FC<Props> = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
      <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
        <FuseAnimate animation="transition.expandIn" delay={300}>
          <Avatar
            className="w-96 h-96"
            src="assets/images/avatars/Velazquez.jpg"
          />
        </FuseAnimate>
        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
          <Typography className="md:ml-24" variant="h4" color="inherit">
            {data.name || MISSING_FIELD}
          </Typography>
        </FuseAnimate>
      </div>

      <div className="flex items-center justify-end">
        <Button
          className="mr-8 normal-case"
          variant="contained"
          color="secondary"
          aria-label="Follow"
          startIcon={<EditIcon />}
          onClick={() => console.log('edit')}
        >
          Edit
        </Button>
        <DeleteUserGroupDialog data={data} />
      </div>
    </div>
  );
};

export default UserGroupDetail;

export const UserGroupDetailHeaderFragment = {
  data: gql`
    fragment UserGroupDetailHeaderFragment on UserGroup {
      name
      ...DeleteUserGroupDialogFragment
    }
    ${DeleteUserGroupDialogFragment.data}
  `,
};
