import React from 'react';
import {
  Avatar,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FuseAnimate from '@fuse/core/FuseAnimate';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';

const useStyles = makeStyles((theme: any) => ({
  listItem: {
    color: 'inherit!important',
    textDecoration: 'none!important',
    height: 40,
    width: 'calc(100% - 16px)',
    borderRadius: '0 20px 20px 0',
    paddingLeft: 24,
    paddingRight: 12,
    '&.active': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText + '!important',
      pointerEvents: 'none',
      '& .list-item-icon': {
        color: 'inherit',
      },
    },
    '& .list-item-icon': {
      marginRight: 16,
    },
  },
}));

const ClientsSidebarContent: React.FC<any> = props => {
  const user = { name: 'Franchesco Pentagielli', avatar: '' };

  const classes = useStyles(props);

  return (
    <div className="p-0 lg:p-24 lg:pr-4">
      <FuseAnimate animation="transition.slideLeftIn" delay={200}>
        <Paper className="rounded-0 shadow-none lg:rounded-8 lg:shadow-1">
          <div className="p-24 flex items-center">
            <Avatar className="mr-12" alt={user.name} src={user.avatar} />
            <Typography>{user.name}</Typography>
          </div>
          <Divider />
          <List>
            <ListItem
              button
              // @ts-ignore
              component={NavLinkAdapter}
              to="/clients/all"
              activeClassName="active"
              className={classes.listItem}
            >
              <Icon className="list-item-icon text-16" color="action">
                people
              </Icon>
              <ListItemText
                className="truncate pr-0"
                primary="All contacts"
                disableTypography={true}
              />
            </ListItem>
            <ListItem
              button
              // @ts-ignore
              component={NavLinkAdapter}
              to="/clients/starred"
              activeClassName="active"
              className={classes.listItem}
            >
              <Icon className="list-item-icon text-16" color="action">
                star
              </Icon>
              <ListItemText
                className="truncate pr-0"
                primary="Starred contacts"
                disableTypography={true}
              />
            </ListItem>
          </List>
        </Paper>
      </FuseAnimate>
    </div>
  );
};

export default ClientsSidebarContent;
