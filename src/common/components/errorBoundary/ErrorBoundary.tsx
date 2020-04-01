import React from 'react';
// import * as Sentry from '@sentry/browser';
import { Alert, AlertTitle } from '@material-ui/lab';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

type ErrorInfo = {
  componentStack: string;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ hasError: true });
    // Sentry.captureException(error, { extra: info });
  }

  render() {
    if (this.state.hasError) {
      const message =
        'There was an error while processing your request. Try to refresh page.';
      return (
        <Alert severity="error">
          <AlertTitle>Something went wrong.</AlertTitle>
          {message}
        </Alert>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
