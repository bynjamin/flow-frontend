import React, { useState } from 'react';
import {
  Icon,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from '@material-ui/core';

function ContactsMultiSelectMenu(props: any) {
  const selectedContactIds = [1];

  const [anchorEl, setAnchorEl] = useState<any>(null);

  function openSelectedContactMenu(event: any) {
    setAnchorEl(event.currentTarget);
  }

  function closeSelectedContactsMenu() {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        className="p-0"
        aria-owns={anchorEl ? 'selectedContactsMenu' : undefined}
        aria-haspopup="true"
        onClick={openSelectedContactMenu}
      >
        <Icon>more_horiz</Icon>
      </IconButton>
      <Menu
        id="selectedContactsMenu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeSelectedContactsMenu}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              console.log('delete');
              closeSelectedContactsMenu();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>delete</Icon>
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              console.log('star');
              closeSelectedContactsMenu();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>star</Icon>
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              console.log('unstar');
              closeSelectedContactsMenu();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>star_border</Icon>
            </ListItemIcon>
            <ListItemText primary="Unstarred" />
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

export default ContactsMultiSelectMenu;
