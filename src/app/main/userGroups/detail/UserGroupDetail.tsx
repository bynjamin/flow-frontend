import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Avatar, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseAnimate from '@fuse/core/FuseAnimate';
import UserGroupContent, { UserGroupContentFragment } from './UserGroupContent';
import { MISSING_FIELD } from 'common/constants';
import {
  UserGroupDetailQuery,
  UserGroupDetailQueryVariables,
} from './__generated__/UserGroupDetailQuery';

const useStyles = makeStyles((theme: any) => ({
  layoutHeader: {
    height: 320,
    minHeight: 320,
    [theme.breakpoints.down('md')]: {
      height: 240,
      minHeight: 240,
    },
  },
}));

const USERGROUP_DETAIL_QUERY = gql`
  query UserGroupDetailQuery($id: Int!) {
    userGroup(groupId: $id) {
      name
      ...UserGroupContentFragment
    }
  }
  ${UserGroupContentFragment.data}
`;

const UserGroupDetail: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { loading, error, data } = useQuery<
    UserGroupDetailQuery,
    UserGroupDetailQueryVariables
  >(USERGROUP_DETAIL_QUERY, {
    variables: { id: parseInt(id!, 10) },
  });

  if (loading) return <FuseLoading />;
  if (error) return <p style={{ color: 'red' }}>{error.message}</p>;
  if (data) {
    return (
      <FusePageSimple
        classes={{
          header: classes.layoutHeader,
          toolbar: 'px-16 sm:px-24',
        }}
        header={
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
                  {data.userGroup.name || MISSING_FIELD}
                </Typography>
              </FuseAnimate>
            </div>

            <div className="flex items-center justify-end">
              <Button
                className="mr-8 normal-case"
                variant="contained"
                color="secondary"
                aria-label="Follow"
              >
                Send message
              </Button>
            </div>
          </div>
        }
        content={<UserGroupContent data={data.userGroup} />}
      />
    );
  }
  return <p>Something bad happend :D</p>;
};

export default UserGroupDetail;
