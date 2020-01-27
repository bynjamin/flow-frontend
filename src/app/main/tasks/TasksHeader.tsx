import React from 'react';
import { Hidden, Icon, IconButton, Input, Paper } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { useSelector } from 'react-redux';

type Props = {
  pageLayout: any;
};

const TasksHeader: React.FC<Props> = ({ pageLayout }) => {
  const searchText = 'aaa';
  // @ts-ignore
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

  return (
    <ThemeProvider theme={mainTheme}>
      <div className="flex flex-1">
        <Paper
          className="flex items-center w-full h-48 sm:h-56 p-16 ltr:pl-4 lg:ltr:pl-16 rtl:pr-4 lg:rtl:pr-16 rounded-8"
          elevation={1}
        >
          <Hidden lgUp>
            <IconButton
              onClick={ev => pageLayout.current.toggleLeftSidebar()}
              aria-label="open left sidebar"
            >
              <Icon>menu</Icon>
            </IconButton>
          </Hidden>

          <Icon color="action">search</Icon>

          <Input
            placeholder="Search"
            className="px-16"
            disableUnderline
            fullWidth
            value={searchText}
            inputProps={{
              'aria-label': 'Search',
            }}
            onChange={ev => console.log(ev.target.value)}
          />
        </Paper>
      </div>
    </ThemeProvider>
  );
};

export default TasksHeader;
