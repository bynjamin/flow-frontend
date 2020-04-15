import gql from 'graphql-tag';
import { UserPermissionCardFragment } from '../UserPermissionCardFragment';

export const UPDATE_USER_PERMISSIONS = gql`
  mutation UpdateUserPermissions(
    $userId: Int!
    $model: String!
    $permissions: AccessInput!
  ) {
    updateUserPermissions(
      userId: $userId
      model: $model
      permissions: $permissions
    ) {
      id
      permissions {
        ...UserPermissionCardFragment__data
      }
    }
  }
  ${UserPermissionCardFragment.data}
`;
