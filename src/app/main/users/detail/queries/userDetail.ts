import gql from 'graphql-tag';
import { UserDetailHeaderFragment } from '../UserDetailHeader';
import { UserAboutFragment } from '../tabs/UserAbout';
import { UserPermissionsFragment } from '../tabs/permissions/UserPermissions';

export const USER_DETAIL = gql`
  query UserDetail($id: Int!) {
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
