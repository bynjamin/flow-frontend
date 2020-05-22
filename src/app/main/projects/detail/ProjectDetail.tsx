import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageSimple from '@fuse/core/FusePageSimple';
import ProjectDetailHeader, {
  ProjectDetailHeaderFragment,
} from './ProjectDetailHeader';
import ProjectAbout, { ProjectAboutFragment } from './tabs/ProjectAbout';
import ProjectTasks, { ProjectTasksFragment } from './tabs/ProjectTasks';
import {
  ProjectDetailQuery as DataType,
  ProjectDetailQueryVariables as InputType,
} from './__generated__/ProjectDetailQuery';

const PROJECT_DETAIL_QUERY = gql`
  query ProjectDetailQuery($id: Int!) {
    project(id: $id) {
      id
      name
      ...ProjectDetailHeaderFragment__data
      ...ProjectAboutFragment__data
      tasks {
        ...ProjectTasksFragment__data
      }
    }
  }
  ${ProjectDetailHeaderFragment.data}
  ${ProjectAboutFragment.data}
  ${ProjectTasksFragment.data}
`;

const ProjectDetail: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { id } = useParams();
  const { loading, error, data } = useQuery<DataType, InputType>(
    PROJECT_DETAIL_QUERY,
    {
      variables: { id: parseInt(id!, 10) },
    },
  );

  function handleTabChange(event: React.ChangeEvent<{}>, value: number) {
    setSelectedTab(value);
  }

  if (loading) return <FuseLoading />;
  if (error) return <p style={{ color: 'red' }}>{error.message}</p>;
  if (data?.project) {
    const { project } = data;

    return (
      <FusePageSimple
        classes={{
          toolbar: 'px-16 sm:px-24',
        }}
        header={<ProjectDetailHeader data={project} />}
        contentToolbar={
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="off"
            classes={{
              root: 'h-64 w-full border-b-1',
            }}
          >
            {/*
            <Tab
              classes={{
                root: 'h-64',
              }}
              label="Timeline"
            />
            */}
            <Tab
              classes={{
                root: 'h-64',
              }}
              label="About"
            />
            <Tab
              classes={{
                root: 'h-64',
              }}
              label={
                <Badge badgeContent={project.tasks.length} color="secondary">
                  Tasks
                </Badge>
              }
            />
            {/*
            <Tab
              classes={{
                root: 'h-64',
              }}
              label="Photos & Videos"
            />
            */}
          </Tabs>
        }
        content={
          <div className="p-16 sm:p-24">
            {/* selectedTab === 0 && <TimelineTab /> */}
            {/* todo: nonnullable */}
            {selectedTab === 0 && <ProjectAbout data={project} />}
            {selectedTab === 1 && <ProjectTasks data={project.tasks} />}
          </div>
        }
      />
    );
  }
  return <p>Something bad happend :D</p>;
};

export default ProjectDetail;
