import gql from 'graphql-tag';

import { ProjectDetailHeaderFragment } from '../ProjectDetailHeader';
import { ProjectAboutFragment } from '../tabs/ProjectAbout';
import { ProjectTasksFragment } from '../tabs/ProjectTasks';

export const PROJECT_DETAIL = gql`
  query ProjectDetail($id: Int!) {
    project(id: $id) {
      id
      name
      ...ProjectDetailHeaderFragment__data
      ...ProjectAboutFragment__data
      ...ProjectTasksFragment__data
    }
  }
  ${ProjectDetailHeaderFragment.data}
  ${ProjectAboutFragment.data}
  ${ProjectTasksFragment.data}
`;
