import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import {
  Tab,
  Tabs,
  // eslint-disable-next-line no-unused-vars
  Theme,
} from '@material-ui/core';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageSimple from '@fuse/core/FusePageSimple';
import RoleAbout from './tabs/RoleAbout';
import RoleDetailHeader from './RoleDetailHeader';
import RolePermissions from './tabs/permissions/RolePermissions';
import { AppContext } from 'app/AppContext';

import { ROLE_DETAIL } from './queries/roleDetial';
import {
  RoleDetail as DataType,
  RoleDetailVariables as InputType,
} from './queries/__generated__/RoleDetail';

const RoleDetail: React.FC = () => {
  const { user } = useContext(AppContext);
  const [selectedTab, setSelectedTab] = useState(0);
  const { id } = useParams();
  const { loading, error, data } = useQuery<DataType, InputType>(ROLE_DETAIL, {
    variables: { id: parseInt(id!, 10) },
  });

  const handleTabChange = (event: any, value: number) => {
    setSelectedTab(value);
  };

  const canUpdatePermissions = () => (user ? user.role.level < 3 : false);

  if (loading) return <FuseLoading />;
  if (error) return <p style={{ color: 'red' }}>{error.message}</p>;
  if (data) {
    return (
      <FusePageSimple
        classes={{
          toolbar: 'px-16 sm:px-24',
        }}
        header={<RoleDetailHeader data={data?.userRole} />}
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
            {selectedTab === 0 && <RoleAbout data={data?.userRole} />}
            {canUpdatePermissions() && selectedTab === 1 && (
              <RolePermissions data={data?.userRole} />
            )}
          </div>
        }
      />
    );
  }
  return <p>Something bad happend :D</p>;
};

export default RoleDetail;
