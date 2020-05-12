import gql from 'graphql-tag';

export const RolePermissionCardFragment = {
  data: gql`
    fragment RolePermissionCardFragment__data on Module {
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
