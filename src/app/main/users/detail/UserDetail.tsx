import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Avatar, Button, Tab, Tabs, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { AboutTab, PermissionsTab } from './tabs';
import { AboutTabFragment } from './tabs/AboutTab';
import { MISSING_FIELD } from 'common/constants';
import {
  UserDetailQuery,
  UserDetailQueryVariables,
} from './__generated__/UserDetailQuery';

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

const USER_DETAIL_QUERY = gql`
  query UserDetailQuery($id: Int!) {
    user(id: $id) {
      id
      fullName
      ...AboutTabFragment__data
    }
  }
  ${AboutTabFragment.data}
`;

const ProfilePage: React.FC = () => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  const { id } = useParams();
  const { loading, error, data } = useQuery<
    UserDetailQuery,
    UserDetailQueryVariables
  >(USER_DETAIL_QUERY, {
    variables: { id: parseInt(id!, 10) },
  });

  // @ts-ignore
  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

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
                  {data?.user?.fullName || MISSING_FIELD}
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
        contentToolbar={
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="off"
            classes={{
              root: 'h-64 w-full border-b-1',
            }}
          >
            {/*
            <Tab
              classes={{
                root: 'h-64',
              }}
              label="Timeline"
            />
            */}
            <Tab
              classes={{
                root: 'h-64',
              }}
              label="About"
            />
            <Tab
              classes={{
                root: 'h-64',
              }}
              label="Permissions"
            />
            {/*
            <Tab
              classes={{
                root: 'h-64',
              }}
              label="Photos & Videos"
            />
            */}
          </Tabs>
        }
        content={
          <div className="p-16 sm:p-24">
            {/* selectedTab === 0 && <TimelineTab /> */}
            {/* todo: nonnullable */}
            {selectedTab === 0 && data?.user && <AboutTab data={data?.user} />}
            {selectedTab === 1 && <PermissionsTab />}
            {/* selectedTab === 2 && <PhotosVideosTab /> */}
          </div>
        }
      />
    );
  }
  return <p>Something bad happend :D</p>;
};

export default ProfilePage;
