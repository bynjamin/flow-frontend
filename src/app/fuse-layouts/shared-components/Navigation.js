import React from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { FuseNavigation } from '@fuse';

function Navigation(props) {
  const navigation = useSelector(({ fuse }) => fuse.navigation);

  return (
    <FuseNavigation
      className={clsx('navigation', props.className)}
      navigation={navigation}
      layout={props.layout}
      dense={props.dense}
    />
  );
}

Navigation.defaultProps = {
  layout: 'vertical',
};

export default Navigation;
