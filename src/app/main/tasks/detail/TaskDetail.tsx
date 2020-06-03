import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageSimple from '@fuse/core/FusePageSimple';
import TaskDetailHeader from './TaskDetailHeader';
import TaskAbout from './tabs/TaskAbout';

import { TASK_DETAIL } from './queries/taskDetail';
import {
  TaskDetail as DataType,
  TaskDetailVariables as InputType,
} from './queries/__generated__/TaskDetail';

const TaskDetail: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { id } = useParams();
  const { loading, error, data } = useQuery<DataType, InputType>(TASK_DETAIL, {
    variables: { id: parseInt(id!, 10) },
  });

  function handleTabChange(event: React.ChangeEvent<{}>, value: number) {
    setSelectedTab(value);
  }

  if (loading) return <FuseLoading />;
  if (error) return <p style={{ color: 'red' }}>{error.message}</p>;
  if (data?.task) {
    const { task } = data;

    return (
      <FusePageSimple
        classes={{
          toolbar: 'px-16 sm:px-24',
        }}
        header={<TaskDetailHeader data={task} />}
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
            <Tab
              classes={{
                root: 'h-64',
              }}
              label="About"
            />
          </Tabs>
        }
        content={
          <div className="p-16 sm:p-24">
            {selectedTab === 0 && <TaskAbout data={task} />}
          </div>
        }
      />
    );
  }
  return <p>Something bad happend :D</p>;
};

export default TaskDetail;
