import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// eslint-disable-next-line no-unused-vars
import { makeStyles, Theme } from '@material-ui/core/styles';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageSimple from '@fuse/core/FusePageSimple';
import UserDetailHeader, { UserDetailHeaderFragment } from './UserDetailHeader';
import UserAbout, { UserAboutFragment } from './tabs/UserAbout';
import UserPermissions, {
  UserPermissionsFragment,
} from './tabs/permissions/UserPermissions';
import {
  // eslint-disable-next-line no-unused-vars
  UserDetailQuery,
  // eslint-disable-next-line no-unused-vars
  UserDetailQueryVariables,
} from './__generated__/UserDetailQuery';

const useStyles = makeStyles((theme: Theme) => ({
  layoutHeader: {
    height: 320,
    minHeight: 320,
    [theme.breakpoints.down('md')]: {
      height: 240,
      minHeight: 240,
    },
    textDecoration: 'none',
  },
}));

const USER_DETAIL_QUERY = gql`
  query UserDetailQuery($id: Int!) {
    user(id: $id) {
      id
      fullName
      ...UserDetailHeaderFragment__data
      ...UserAboutFragment__data
      ...UserPermissionsFragment__data
    }
    userRoles {
      ...UserDetailHeaderFragment__roles
    }
  }
  ${UserDetailHeaderFragment.data}
  ${UserDetailHeaderFragment.roles}
  ${UserAboutFragment.data}
  ${UserPermissionsFragment.data}
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

  function handleTabChange(event: React.ChangeEvent<{}>, value: number) {
    setSelectedTab(value);
  }

  if (loading) return <FuseLoading />;
  if (error) return <p style={{ color: 'red' }}>{error.message}</p>;
  if (data?.user) {
    const { user, userRoles } = data;

    return (
      <FusePageSimple
        classes={{
          header: classes.layoutHeader,
          toolbar: 'px-16 sm:px-24',
        }}
        // todo: zinvestigovat preco nie je zapotreby null check pri UserGroup detaile
        header={<UserDetailHeader data={user} roles={userRoles} />}
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
            {selectedTab === 0 && <UserAbout data={user} />}
            {selectedTab === 1 && <UserPermissions data={user} />}
          </div>
        }
      />
    );
  }
  return <p>Something bad happend :D</p>;
};

export default ProfilePage;
