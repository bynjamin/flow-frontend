import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import CriticalButton from 'common/components/CriticalButton';
import LeavelIcon from '@material-ui/icons/WorkOffOutlined';
import { AppContext } from 'app/AppContext';

import { LEAVE } from './mutations/leave';
import { Leave as ResponseType } from './mutations/__generated__/Leave';

const LeaveButton: React.FC = () => {
  const { setActionFeedback, setLoading } = useContext(AppContext);
  const [leave] = useMutation<ResponseType>(LEAVE);

  const onError = () => {
    setActionFeedback({
      message: 'Something went wrong',
      severity: 'error',
    });
  };

  const onSuccess = () => {
    // todo: refactor - bud manazovat usera v apolle
    // @ts-ignore
    // setUser({ ...user, workState: 'WORK' });
    setActionFeedback({
      message: 'Attendance was recorded',
      severity: 'success',
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data, errors } = await leave({
        refetchQueries: ['CurrentUserQuery', 'AttendanceList'],
      });
      setLoading(false);

      if (errors) {
        onError();
      }

      if (data) {
        onSuccess();
      }
    } catch {
      setLoading(false);
      onError();
    }
  };

  return (
    <CriticalButton
      onClick={handleSubmit}
      startIcon={<LeavelIcon />}
      variant="contained"
      disableElevation
    >
      Leave
    </CriticalButton>
  );
};

export default LeaveButton;
