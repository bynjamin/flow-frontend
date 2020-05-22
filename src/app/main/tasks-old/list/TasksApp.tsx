import React, { useEffect, useRef } from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import TaskList from './TaskList';
import TasksToolbar from './TasksToolbar';
import TasksHeader from './TasksHeader';
import TasksSidebarHeader from './TasksSidebarHeader';
import TasksSidebarContent from './TasksSidebarContent';
// import TodoDialog from './TodoDialog';

const TasksApp: React.FC<any> = props => {
  const pageLayout = useRef(null);

  return (
    <>
      <FusePageCarded
        classes={{
          root: 'w-full',
          header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136',
        }}
        header={<TasksHeader pageLayout={pageLayout} />}
        contentToolbar={<TasksToolbar />}
        content={<TaskList />}
        leftSidebarHeader={<TasksSidebarHeader />}
        leftSidebarContent={<TasksSidebarContent />}
        ref={pageLayout}
        innerScroll
      />
      {/* <TodoDialog /> */}
    </>
  );
};

export default TasksApp;
