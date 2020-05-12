import gql from 'graphql-tag';
import { UserGroupPermissionCardFragment } from '../UserGroupPermissionCardFragment';

export const UPDATE_USER_GROUP_PERMISSIONS = gql`
  mutation UpdateUserGroupPermissions(
    $groupId: Int!
    $model: String!
    $permissions: AccessInput!
  ) {
    updateUserGroupPermissions(
      groupId: $groupId
      model: $model
      permissions: $permissions
    ) {
      id
      permissions {
        ...UserGroupPermissionCardFragment__data
      }
    }
  }
  ${UserGroupPermissionCardFragment.data}
`;
