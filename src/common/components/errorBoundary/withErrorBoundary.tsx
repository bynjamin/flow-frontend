import * as React from 'react';
import ErrorBoundary from './ErrorBoundary';

const withErrorBoundary = <Props extends object>(
  Component: React.ComponentType<Props>,
): React.FC<Props> => (props: Props) => {
  return (
    <ErrorBoundary>
      <Component {...(props as Props)} />
    </ErrorBoundary>
  );
};

export default withErrorBoundary;
