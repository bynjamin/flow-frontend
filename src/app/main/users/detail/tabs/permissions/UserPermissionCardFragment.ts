import gql from 'graphql-tag';

export const UserPermissionCardFragment = {
  data: gql`
    fragment UserPermissionCardFragment__data on Module {
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
