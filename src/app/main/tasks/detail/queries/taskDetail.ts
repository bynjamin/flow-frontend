import gql from 'graphql-tag';
import { TaskDetailHeaderFragment } from '../TaskDetailHeader';
import { TaskAboutFragment } from '../tabs/TaskAbout';

export const TASK_DETAIL = gql`
  query TaskDetail($id: Int!) {
    task(id: $id) {
      id
      name
      ...TaskDetailHeaderFragment__data
      ...TaskAboutFragment__data
    }
  }
  ${TaskDetailHeaderFragment.data}
  ${TaskAboutFragment.data}
`;
