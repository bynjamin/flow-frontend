import gql from 'graphql-tag';
import { UserGroupAboutFragment } from '../tabs/UserGroupAbout';
import { UserGroupDetailHeaderFragment } from '../UserGroupDetailHeader';
import { UserGroupPermissionsFragment } from '../tabs/permissions/UserGroupPermissions';

export const USERGROUP_DETAIL = gql`
  query UserGroupDetail($id: Int!) {
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
