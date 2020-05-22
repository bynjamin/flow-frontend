import React, { useEffect, useState } from 'react';
import { orderBy } from 'lodash';
import { List, Typography } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseUtils from '@fuse/utils';
import TaskListItem from './TaskListItem';
import { tasksMockData } from './TasksMockData';

const TaskList: React.FC = props => {
  const { tasks } = tasksMockData;
  const searchText = 'aaa';

  if (!tasks) {
    return null;
  }

  if (tasks.length === 0) {
    return (
      <FuseAnimate delay={100}>
        <div className="flex flex-1 items-center justify-center h-full">
          <Typography color="textSecondary" variant="h5">
            There are no tasks!
          </Typography>
        </div>
      </FuseAnimate>
    );
  }

  return (
    <List className="p-0">
      <FuseAnimateGroup
        enter={{
          animation: 'transition.slideUpBigIn',
        }}
      >
        {tasks.map(task => (
          <TaskListItem task={task} key={task.id} />
        ))}
      </FuseAnimateGroup>
    </List>
  );
};

export default TaskList;
