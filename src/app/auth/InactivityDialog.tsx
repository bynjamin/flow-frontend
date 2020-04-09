import React, { useEffect } from 'react';
import Dialog from 'common/components/Dialog';
// eslint-disable-next-line no-unused-vars
import { Theme, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import useCounter from 'app/hooks/useCounter';

const SECONDS_TO_LOGOUT = 60;

const WarningButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.warning.main,
  },
}))(Button);

type Props = {
  onLogout: () => void;
  onConfirm: () => void;
};

const InactivityDialog: React.FC<Props> = ({ onLogout, onConfirm }) => {
  const [secondsLeft, timeouted] = useCounter({ seconds: SECONDS_TO_LOGOUT });

  useEffect(() => {
    if (timeouted) {
      onLogout();
    }
  }, [onLogout, timeouted]);

  return (
    <Dialog
      title="Your session is about to expire"
      contentText="You've been inactive for a while. For your security, we will log you
                  out automatically. To continue with your session, press &quot;I'M HERE&quot;."
      content={`Your session will expire in ${secondsLeft} seconds`}
      actions={
        <>
          <WarningButton onClick={onLogout} color="primary">
            Log out
          </WarningButton>
          <Button onClick={onConfirm} color="primary">
            I'm here
          </Button>
        </>
      }
    />
  );
};

export default InactivityDialog;
