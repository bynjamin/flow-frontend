/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UsersList
// ====================================================

export interface UsersList_users_items_role {
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

export interface UsersList_users_items_groups {
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

export interface UsersList_users_items {
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
  role: UsersList_users_items_role;
  /**
   * User groups
   */
  groups: (UsersList_users_items_groups | null)[];
}

export interface UsersList_users {
  __typename: "UserPagination";
  /**
   * Total user count
   */
  count: number;
  /**
   * List of users
   */
  items: UsersList_users_items[];
}

export interface UsersList {
  /**
   * Get all users
   */
  users: UsersList_users;
}

export interface UsersListVariables {
  first?: number | null;
  skip?: number | null;
  orderBy?: string | null;
  orderDirection?: string | null;
  search?: string | null;
}
