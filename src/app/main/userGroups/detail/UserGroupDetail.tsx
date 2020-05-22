import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Tab, Tabs } from '@material-ui/core';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageSimple from '@fuse/core/FusePageSimple';
import UserGroupAbout, { UserGroupAboutFragment } from './tabs/UserGroupAbout';
import UserGroupDetailHeader, {
  UserGroupDetailHeaderFragment,
} from './UserGroupDetailHeader';
import UserGroupPermissions, {
  UserGroupPermissionsFragment,
} from './tabs/permissions/UserGroupPermissions';
import {
  // eslint-disable-next-line no-unused-vars
  UserGroupDetailQuery,
  // eslint-disable-next-line no-unused-vars
  UserGroupDetailQueryVariables,
} from './__generated__/UserGroupDetailQuery';

const USERGROUP_DETAIL_QUERY = gql`
  query UserGroupDetailQuery($id: Int!) {
    userGroup(groupId: $id) {
      ...UserGroupDetailHeaderFragment__data
      ...UserGroupAboutFragment__data
      ...UserGroupPermissionsFragment__data
    }
  }
  ${UserGroupAboutFragment.data}
  ${UserGroupPermissionsFragment.data}
  ${UserGroupDetailHeaderFragment.data}
`;

const UserGroupDetail: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { id } = useParams();
  const { loading, error, data } = useQuery<
    UserGroupDetailQuery,
    UserGroupDetailQueryVariables
  >(USERGROUP_DETAIL_QUERY, {
    variables: { id: parseInt(id!, 10) },
  });

  const handleTabChange = (event: any, value: number) => {
    setSelectedTab(value);
  };

  if (loading) return <FuseLoading />;
  if (error) return <p style={{ color: 'red' }}>{error.message}</p>;
  if (data) {
    return (
      <FusePageSimple
        classes={{
          toolbar: 'px-16 sm:px-24',
        }}
        header={<UserGroupDetailHeader data={data?.userGroup} />}
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
          </Tabs>
        }
        content={
          <div className="p-16 sm:p-24">
            {selectedTab === 0 && data?.userGroup && (
              <UserGroupAbout data={data?.userGroup} />
            )}
            {selectedTab === 1 && (
              <UserGroupPermissions data={data?.userGroup} />
            )}
          </div>
        }
      />
    );
  }
  return <p>Something bad happend :D</p>;
};

export default UserGroupDetail;
