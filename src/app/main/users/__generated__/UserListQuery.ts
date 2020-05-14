/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserListQuery
// ====================================================

export interface UserListQuery_users_items_role {
  __typename: "UserRole";
  /**
   * User role ID
   */
  id: number;
  /**
   * User role name
   */
  name: string;
}

export interface UserListQuery_users_items_groups {
  __typename: "UserGroup";
  /**
   * User group ID
   */
  id: number;
  /**
   * User group name
   */
  name: string;
}

export interface UserListQuery_users_items {
  __typename: "User";
  /**
   * User ID
   */
  id: number;
  /**
   * User title
   */
  title: string;
  /**
   * User first name
   */
  firstName: string;
  /**
   * User last name
   */
  lastName: string;
  /**
   * User email
   */
  email: string;
  /**
   * User phone
   */
  phone: string;
  /**
   * User role
   */
  role: UserListQuery_users_items_role;
  /**
   * User groups
   */
  groups: (UserListQuery_users_items_groups | null)[];
}

export interface UserListQuery_users {
  __typename: "UserPagination";
  /**
   * Total user count
   */
  count: number;
  /**
   * List of users
   */
  items: UserListQuery_users_items[];
}

export interface UserListQuery {
  /**
   * Get all users
   */
  users: UserListQuery_users;
}

export interface UserListQueryVariables {
  first?: number | null;
  skip?: number | null;
  orderBy?: string | null;
  orderDirection?: string | null;
  search?: string | null;
}
