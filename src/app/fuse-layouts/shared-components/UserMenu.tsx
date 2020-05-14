import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { logout } from 'app/auth/jwtService/jwtService2';
import { AppContext } from 'app/AppContext';
import ColorAvatar from 'app/components/ColorAvatar';

const UserMenu: React.FC = () => {
  const { user, setLoading, setActionFeedback } = useContext(AppContext);

  const [userMenu, setUserMenu] = useState<HTMLElement | null>(null);

  const userMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  const logoutFailed = () => {
    setActionFeedback({ severity: 'error', message: 'Unable to logout' });
  };

  return (
    <>
      <Button className="h-64" onClick={userMenuClick}>
        {user?.photoURL ? (
          <Avatar className="" alt="user photo" src={user.photoURL} />
        ) : (
          <ColorAvatar colorString={user?.email}>
            {user?.fullName[0]}
          </ColorAvatar>
        )}

        <div className="hidden md:flex flex-col mx-12 items-start">
          <Typography component="span" className="normal-case font-600 flex">
            {user?.fullName}
          </Typography>
          <Typography className="text-11 capitalize" color="textSecondary">
            {user?.role.name}
          </Typography>
        </div>

        <Icon className="text-16 hidden sm:flex">keyboard_arrow_down</Icon>
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: 'py-8',
        }}
      >
        <>
          <MenuItem
            component={Link}
            to={`/users/detail/${user?.id}`}
            onClick={userMenuClose}
            role="button"
          >
            <ListItemIcon className="min-w-40">
              <Icon>account_circle</Icon>
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </MenuItem>
          <MenuItem
            // component={Link}
            // to="/login"
            role="button"
            onClick={() => {
              logout({ setLoading, onError: logoutFailed });
              userMenuClose();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>exit_to_app</Icon>
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </>
      </Popover>
    </>
  );
};

export default UserMenu;
