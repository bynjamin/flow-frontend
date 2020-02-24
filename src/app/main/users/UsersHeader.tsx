import React, { useState } from 'react';
import {
  Hidden,
  Icon,
  IconButton,
  Input,
  Paper,
  Typography,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useDispatch, useSelector } from 'react-redux';

function UsersHeader(props: any) {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState<string>('');
  // @ts-ignore
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

  return (
    <div className="flex flex-1 items-center justify-between p-8 sm:p-24">
      <div className="flex flex-shrink items-center sm:w-224">
        <Hidden lgUp>
          <IconButton
            onClick={ev => {
              props.pageLayout.current.toggleLeftSidebar();
            }}
            aria-label="open left sidebar"
          >
            <Icon>menu</Icon>
          </IconButton>
        </Hidden>

        <div className="flex items-center">
          <FuseAnimate animation="transition.expandIn" delay={300}>
            <Icon className="text-32 mr-12">person</Icon>
          </FuseAnimate>
          <FuseAnimate animation="transition.slideLeftIn" delay={300}>
            <Typography variant="h6" className="hidden sm:flex">
              Users
            </Typography>
          </FuseAnimate>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">
        <ThemeProvider theme={mainTheme}>
          <FuseAnimate animation="transition.slideLeftIn" delay={300}>
            <Paper
              className="flex p-4 items-center w-full max-w-512 px-8 py-4"
              elevation={1}
            >
              <Icon className="mr-8" color="action">
                search
              </Icon>

              <Input
                placeholder="Search for anything"
                className="flex flex-1"
                disableUnderline
                fullWidth
                value={searchText}
                inputProps={{
                  'aria-label': 'Search',
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchText(e.target.value);
                }}
              />
            </Paper>
          </FuseAnimate>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default UsersHeader;
