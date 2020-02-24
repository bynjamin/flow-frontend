import React from 'react';
import {
  Icon,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Button,
} from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { makeStyles } from '@material-ui/styles';
import { tasksMockData } from './TasksMockData';

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
      fontSize: 16,
      width: 16,
      height: 16,
      marginRight: 16,
    },
  },
  listSubheader: {
    paddingLeft: 24,
  },
  listWrapper: {},
}));

const TasksSidebarContent: React.FC = props => {
  const { labels } = tasksMockData;
  const { folders } = tasksMockData;
  const { filters } = tasksMockData;

  const classes = useStyles(props);

  return (
    <FuseAnimate animation="transition.slideUpIn" delay={400}>
      <div className="flex-auto border-l-1 border-solid">
        <div className="p-24">
          <Button
            onClick={() => {
              console.log('open create dialog');
            }}
            variant="contained"
            color="primary"
            className="w-full"
          >
            ADD TASK
          </Button>
        </div>

        <div className={classes.listWrapper}>
          <List>
            {folders.length > 0 &&
              folders.map(folder => (
                <ListItem
                  button
                  // @ts-ignore
                  component={NavLinkAdapter}
                  to={'/tasks/' + folder.handle}
                  key={folder.id}
                  activeClassName="active"
                  className={classes.listItem}
                >
                  <Icon className="list-item-icon" color="action">
                    {folder.icon}
                  </Icon>
                  <ListItemText
                    primary={folder.title}
                    disableTypography={true}
                  />
                </ListItem>
              ))}
          </List>

          <List>
            <ListSubheader className={classes.listSubheader} disableSticky>
              FILTERS
            </ListSubheader>

            {filters.length > 0 &&
              filters.map(filter => (
                <ListItem
                  button
                  // @ts-ignore
                  component={NavLinkAdapter}
                  to={'/tasks/filter/' + filter.handle}
                  activeClassName="active"
                  className={classes.listItem}
                  key={filter.id}
                >
                  <Icon className="list-item-icon" color="action">
                    {filter.icon}
                  </Icon>
                  <ListItemText
                    primary={filter.title}
                    disableTypography={true}
                  />
                </ListItem>
              ))}
          </List>

          <List>
            <ListSubheader className={classes.listSubheader} disableSticky>
              LABELS
            </ListSubheader>

            {labels.length > 0 &&
              labels.map(label => (
                <ListItem
                  button
                  // @ts-ignore
                  component={NavLinkAdapter}
                  to={'/tasks/label/' + label.handle}
                  key={label.id}
                  className={classes.listItem}
                >
                  <Icon
                    className="list-item-icon"
                    style={{ color: label.color }}
                    color="action"
                  >
                    label
                  </Icon>
                  <ListItemText
                    primary={label.title}
                    disableTypography={true}
                  />
                </ListItem>
              ))}
          </List>
        </div>
      </div>
    </FuseAnimate>
  );
};

export default TasksSidebarContent;
