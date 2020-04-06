import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  Avatar,
  Button,
  Tab,
  Tabs,
  Typography,
  // eslint-disable-next-line no-unused-vars
  Theme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseAnimate from '@fuse/core/FuseAnimate';
import AboutTab, { AboutTabFragment } from './tabs/AboutTab';
import UserGroupDetailHeader, {
  UserGroupDetailHeaderFragment,
} from './UserGroupDetailHeader';
import PermissionsTab from './tabs/PermissionsTab';
import CriticalButton from 'common/components/CriticalButton';
import { MISSING_FIELD } from 'common/constants';
import {
  // eslint-disable-next-line no-unused-vars
  UserGroupDetailQuery,
  // eslint-disable-next-line no-unused-vars
  UserGroupDetailQueryVariables,
} from './__generated__/UserGroupDetailQuery';

const useStyles = makeStyles((theme: Theme) => ({
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
      ...UserGroupDetailHeaderFragment
      ...AboutTabFragment
    }
  }
  ${AboutTabFragment.data}
  ${UserGroupDetailHeaderFragment.data}
`;

const UserGroupDetail: React.FC = () => {
  const classes = useStyles();
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
          header: classes.layoutHeader,
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
              <AboutTab data={data?.userGroup} />
            )}
            {selectedTab === 1 && <PermissionsTab />}
          </div>
        }
      />
    );
  }
  return <p>Something bad happend :D</p>;
};

export default UserGroupDetail;
