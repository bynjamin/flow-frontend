import React, { useState, useContext, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { AppContext } from 'app/AppContext';
// eslint-disable-next-line no-unused-vars
import { makeStyles, Theme } from '@material-ui/core/styles';
import { UPDATE_USER_PERMISSIONS } from './mutations/updateUserPermissionMutation';
import {
  // eslint-disable-next-line no-unused-vars
  UserPermissionCardFragment__data as DataType,
} from './__generated__/UserPermissionCardFragment__data';
import {
  // eslint-disable-next-line no-unused-vars
  UpdateUserPermissions as ResponseType,
  // eslint-disable-next-line no-unused-vars
  UpdateUserPermissionsVariables as InputType,
} from './mutations/__generated__/UpdateUserPermissions';
// eslint-disable-next-line no-unused-vars
import { AccessInput } from 'app/__generated__/globalTypes';

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: theme.palette.primary.dark,
  },
  title: {
    color: theme.palette.common.white,
  },
  formControl: {
    margin: theme.spacing(1),
  },
}));

type Props = {
  data: DataType;
  userId: number;
};

const UserPermissionCard: React.FC<Props> = ({ data, userId }) => {
  const { actions, model } = data;
  const classes = useStyles();
  const [isEdit, setEdit] = useState<boolean>(false);
  const [state, setState] = React.useState({
    create: actions.basic.create || false, // todo: odstranit null check
    read: actions.basic.read || false,
    update: actions.basic.update || false,
    delete: actions.basic.delete || false,
    readGlobal: actions.global.read || false,
    updateGlobal: actions.global.update || false,
    deleteGlobal: actions.global.delete || false,
  });

  const { setActionFeedback } = useContext(AppContext);
  const [updateUserPermissions, { loading }] = useMutation<
    ResponseType,
    InputType
  >(UPDATE_USER_PERMISSIONS);

  const getGlobalAction = (key: string): string | null => {
    switch (key) {
      case 'read':
        return 'readGlobal';
      case 'update':
        return 'updateGlobal';
      case 'delete':
        return 'deleteGlobal';
      default:
        return null;
    }
  };

  const handleChange = (action: string) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked } = event.target;
    const globalAction = getGlobalAction(action);

    if (!checked && globalAction) {
      setState({ ...state, [action]: checked, [globalAction]: checked });
    } else {
      setState({ ...state, [action]: checked });
    }
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = async () => {
    setEdit(false);
    const permissions: AccessInput = {
      basic: {
        create: state.create,
        read: state.read,
        update: state.update,
        delete: state.delete,
      },
      global: {
        create: false,
        read: state.readGlobal,
        update: state.updateGlobal,
        delete: state.deleteGlobal,
      },
    };
    const variables = {
      userId,
      model,
      permissions,
    };
    const { data: response, errors } = await updateUserPermissions({
      variables,
    });

    if (response) {
      if (response.updateUserPermissions) {
        dispatchSuccessFeedback();
      } else {
        dispatchErrorFeedback();
      }
    }

    if (errors) {
      dispatchErrorFeedback();
    }
  };

  const reset = () => {
    setState({
      create: actions.basic.create || false, // todo: odstranit null check
      read: actions.basic.read || false,
      update: actions.basic.update || false,
      delete: actions.basic.delete || false,
      readGlobal: actions.global.read || false,
      updateGlobal: actions.global.update || false,
      deleteGlobal: actions.global.delete || false,
    });
  };
  useEffect(reset, [data]);

  const handleCancel = () => {
    setEdit(false);
    reset();
  };

  const dispatchErrorFeedback = () => {
    setActionFeedback({
      message: `Unable to update ${model} Permissions`,
      severity: 'error',
    });
  };

  const dispatchSuccessFeedback = () => {
    setActionFeedback({
      message: `${model} Permissions was succesfully updated`,
      severity: 'success',
    });
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-8">
      <Card>
        <CardHeader
          title={model}
          action={
            isEdit ? (
              <ButtonGroup
                size="small"
                variant="contained"
                className="mt-10 mb-8 mr-6"
              >
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave} startIcon={<SaveIcon />}>
                  Save
                </Button>
              </ButtonGroup>
            ) : (
              <IconButton
                aria-label="settings"
                color="secondary"
                onClick={handleEdit}
              >
                <EditIcon />
              </IconButton>
            )
          }
          classes={{
            root: classes.header,
            title: classes.title,
          }}
        />
        <CardContent className={classes.content}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Basic permissions</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.create}
                    onChange={handleChange('create')}
                    value="create"
                    disabled={!isEdit}
                  />
                }
                label="Create"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.read}
                    onChange={handleChange('read')}
                    value="read"
                    disabled={!isEdit}
                  />
                }
                label="Read"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.update}
                    onChange={handleChange('update')}
                    value="update"
                    disabled={!isEdit}
                  />
                }
                label="Update"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.delete}
                    onChange={handleChange('delete')}
                    value="delete"
                    disabled={!isEdit}
                  />
                }
                label="Delete"
              />
            </FormGroup>
            <FormHelperText>
              Can perform actions on assigned records
            </FormHelperText>
          </FormControl>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Global permissions</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={true} disabled={true} indeterminate />
                }
                label="Create"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.readGlobal}
                    onChange={handleChange('readGlobal')}
                    value="readGlobal"
                    disabled={!isEdit || !state.read}
                  />
                }
                label="Read"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.updateGlobal}
                    onChange={handleChange('updateGlobal')}
                    value="updateGlobal"
                    disabled={!isEdit || !state.update}
                  />
                }
                label="Update"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.deleteGlobal}
                    onChange={handleChange('deleteGlobal')}
                    value="deleteGlobal"
                    disabled={!isEdit || !state.delete}
                  />
                }
                label="Delete"
              />
            </FormGroup>
            <FormHelperText>Can perform actions on all records</FormHelperText>
          </FormControl>
          {/*
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
          */}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPermissionCard;
