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
import { deleteTokens } from 'app/auth/jwtService/jwtService2';
import { UserContext } from 'app/UserContext';

const UserMenu: React.FC = () => {
  const { user } = useContext(UserContext);

  const [userMenu, setUserMenu] = useState<HTMLElement | null>(null);

  const userMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  return (
    <>
      <Button className="h-64" onClick={userMenuClick}>
        {user.photoURL ? (
          <Avatar className="" alt="user photo" src={user.photoURL} />
        ) : (
          <Avatar className="">{user.fullName[0]}</Avatar>
        )}

        <div className="hidden md:flex flex-col mx-12 items-start">
          <Typography component="span" className="normal-case font-600 flex">
            {user.fullName}
          </Typography>
          <Typography className="text-11 capitalize" color="textSecondary">
            {user.role.toString()}
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
            to="/users/detail/1"
            onClick={userMenuClose}
            role="button"
          >
            <ListItemIcon className="min-w-40">
              <Icon>account_circle</Icon>
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </MenuItem>
          <MenuItem
            component={Link}
            to="/login"
            role="button"
            onClick={() => {
              deleteTokens();
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
