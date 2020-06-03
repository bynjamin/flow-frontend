import gql from 'graphql-tag';

export const CREATE_TASK = gql`
  mutation CreateTask(
    $name: String!
    $description: String!
    $deadline: String!
    $status: TaskState!
    $assigneeIds: [Int!]!
    $projectId: Int!
  ) {
    createTask(
      name: $name
      description: $description
      deadline: $deadline
      status: $status
      assigneeIds: $assigneeIds
      projectId: $projectId
    ) {
      id
      name
      description
      deadline
      status
      assignees {
        id
        fullName
      }
      project {
        id
        name
      }
    }
  }
`;
