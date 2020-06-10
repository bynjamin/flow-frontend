import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import ArrivalIcon from '@material-ui/icons/WorkOutline';
import { AppContext } from 'app/AppContext';

import { ARRIVAL } from './mutations/arrival';
import { Arrival as ResponseType } from './mutations/__generated__/Arrival';

const ArrivalButton: React.FC = () => {
  const { setActionFeedback, setLoading } = useContext(AppContext);
  const [arrival] = useMutation<ResponseType>(ARRIVAL);

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
      const { data, errors } = await arrival({
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
    <Button
      onClick={handleSubmit}
      color="secondary"
      startIcon={<ArrivalIcon />}
      variant="contained"
      disableElevation
    >
      Arrival
    </Button>
  );
};

export default ArrivalButton;
