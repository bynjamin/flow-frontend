import gql from 'graphql-tag';

import { RoleAboutFragment } from '../tabs/RoleAbout';
import { RoleDetailHeaderFragment } from '../RoleDetailHeader';
import { RolePermissionsFragment } from '../tabs/permissions/RolePermissions';

export const ROLE_DETAIL = gql`
  query RoleDetail($id: Int!) {
    userRole(roleId: $id) {
      ...RoleDetailHeaderFragment__data
      ...RoleAboutFragment__data
      ...RolePermissionsFragment__data
    }
  }
  ${RoleAboutFragment.data}
  ${RolePermissionsFragment.data}
  ${RoleDetailHeaderFragment.data}
`;
