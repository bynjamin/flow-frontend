import gql from 'graphql-tag';
import { RolePermissionCardFragment } from '../RolePermissionCardFragment';

export const UPDATE_ROLE_PERMISSIONS = gql`
  mutation UpdateRolePermissions(
    $roleId: Int!
    $model: String!
    $permissions: AccessInput!
  ) {
    updateUserRolePermissions(
      roleId: $roleId
      model: $model
      permissions: $permissions
    ) {
      id
      permissions {
        ...RolePermissionCardFragment__data
      }
    }
  }
  ${RolePermissionCardFragment.data}
`;
