import gql from 'graphql-tag';

export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $taskId: Int!
    $name: String!
    $description: String!
    $deadline: String!
    $status: TaskState!
    $assigneeIds: [Int!]!
    $projectId: Int!
  ) {
    updateTask(
      taskId: $taskId
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
        email
      }
      project {
        id
        name
      }
    }
  }
`;
