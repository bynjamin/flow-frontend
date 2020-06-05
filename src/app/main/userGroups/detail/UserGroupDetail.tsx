import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Tab, Tabs } from '@material-ui/core';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageSimple from '@fuse/core/FusePageSimple';
import UserGroupAbout from './tabs/UserGroupAbout';
import UserGroupDetailHeader from './UserGroupDetailHeader';
import UserGroupPermissions from './tabs/permissions/UserGroupPermissions';
import { AppContext } from 'app/AppContext';

import { USERGROUP_DETAIL } from './queries/userGroupDetail';
import {
  UserGroupDetail as DataType,
  UserGroupDetailVariables as InputType,
} from './queries/__generated__/UserGroupDetail';

const UserGroupDetail: React.FC = () => {
  const { permissions } = useContext(AppContext);
  const [selectedTab, setSelectedTab] = useState(0);
  const { id } = useParams();
  const { loading, error, data } = useQuery<DataType, InputType>(
    USERGROUP_DETAIL,
    {
      variables: { id: parseInt(id!, 10) },
    },
  );

  const canUpdatePermissions = () => permissions.Permission.basic.update;

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
            {canUpdatePermissions() && (
              <Tab
                classes={{
                  root: 'h-64',
                }}
                label="Permissions"
              />
            )}
          </Tabs>
        }
        content={
          <div className="p-16 sm:p-24">
            {selectedTab === 0 && data?.userGroup && (
              <UserGroupAbout data={data?.userGroup} />
            )}
            {canUpdatePermissions() && selectedTab === 1 && (
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
