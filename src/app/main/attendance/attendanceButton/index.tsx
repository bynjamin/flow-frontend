import React, { useContext } from 'react';
import { AppContext } from 'app/AppContext';
import ArrivalButton from './ArrivalButton';
import LeaveButton from './LeaveButton';

const AttendanceButton: React.FC = () => {
  const { user } = useContext(AppContext);

  if (user?.workState) {
    switch (user.workState) {
      case 'WORK':
        return <LeaveButton />;
      case 'OUT_OF_WORK':
        return <ArrivalButton />;
      default:
        return null;
    }
  }
  return null;
};

export default AttendanceButton;
