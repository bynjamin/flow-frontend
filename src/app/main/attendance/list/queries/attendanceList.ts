import gql from 'graphql-tag';

export const ATTENDANCE_LIST = gql`
  query AttendanceList(
    $first: Int
    $skip: Int
    $orderBy: String
    $orderDirection: String
    $userId: Int
  ) {
    attendances(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      userId: $userId
    ) {
      count
      items {
        start
        end
        user {
          id
          fullName
        }
      }
    }
  }
`;
