import React from 'react';
import PermissionsContent from 'app/main/admin/permissions/PermissionsContent';

const PermissionsTab: React.FC = () => {
  return (
    <div className="md:flex">
      <div className="flex flex-col flex-1 md:pr-32">
        <PermissionsContent />
      </div>
    </div>
  );
};

export default PermissionsTab;
