import gql from 'graphql-tag';

export const UserGroupPermissionCardFragment = {
  data: gql`
    fragment UserGroupPermissionCardFragment__data on Module {
      model
      actions {
        basic {
          create
          read
          update
          delete
        }
        global {
          read
          update
          delete
        }
      }
    }
  `,
};
