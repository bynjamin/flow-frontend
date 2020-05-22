import React, { useRef } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import TasksList from './TasksList';

const ProjectsApp: React.FC = () => {
  const pageLayout = useRef(null);

  return (
    <FusePageSimple
      classes={{
        contentWrapper: 'p-0 sm:p-24 pb-80 sm:pb-80 h-full',
        content: 'flex flex-col h-full',
        leftSidebar: 'w-256 border-0',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      // header={}
      // leftSidebarContent={}
      content={<TasksList />}
      sidebarInner
      ref={pageLayout}
      innerScroll
    />
  );
};

export default ProjectsApp;
