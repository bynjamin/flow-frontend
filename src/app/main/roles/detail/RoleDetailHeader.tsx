import React from 'react';
import gql from 'graphql-tag';
import { Avatar, Typography } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { MISSING_FIELD } from 'common/constants';
// eslint-disable-next-line no-unused-vars
import { RoleDetailHeaderFragment__data as DataType } from './__generated__/RoleDetailHeaderFragment__data';

type Props = {
  data: DataType;
};

const RoleDetail: React.FC<Props> = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
      <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
        <FuseAnimate animation="transition.expandIn" delay={300}>
          <Avatar className="w-96 h-96" alt={data.name}>
            {data.name[0]}
          </Avatar>
        </FuseAnimate>
        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
          <Typography className="md:ml-24" variant="h4" color="inherit">
            {data.name || MISSING_FIELD}
          </Typography>
        </FuseAnimate>
      </div>
    </div>
  );
};

export default RoleDetail;

export const RoleDetailHeaderFragment = {
  data: gql`
    fragment RoleDetailHeaderFragment__data on UserRole {
      name
    }
  `,
};
