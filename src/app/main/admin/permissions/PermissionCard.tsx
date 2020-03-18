import React, { useState } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Skeleton from '@material-ui/lab/Skeleton';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles, fade, Theme } from '@material-ui/core/styles';

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
  modelName: string;
};

const PermissionCard: React.FC<Props> = ({ modelName }) => {
  const classes = useStyles();
  const [isEdit, setEdit] = useState<boolean>(false);
  const [state, setState] = React.useState({
    create: true,
    read: true,
    update: false,
    delete: true,
    readGlobal: true,
    updateGlobal: false,
    deleteGlobal: false,
  });

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

  const handleSave = () => {
    setEdit(false);
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-8">
      <Card>
        <CardHeader
          title={modelName}
          action={
            isEdit ? (
              <Button
                className="my-6 mr-6"
                variant="contained"
                color="secondary"
                onClick={handleSave}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
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
                  <Checkbox
                    checked={true}
                    value={null}
                    disabled={true}
                    indeterminate
                  />
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

export default PermissionCard;
