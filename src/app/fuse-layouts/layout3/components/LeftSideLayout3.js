import React from 'react';
import { FuseShortcuts, FuseSidePanel } from '@fuse';

function LeftSideLayout3() {
  return (
    <>
      <FuseSidePanel>
        <FuseShortcuts className="py-16 px-8" variant="vertical" />
      </FuseSidePanel>
    </>
  );
}

export default LeftSideLayout3;
