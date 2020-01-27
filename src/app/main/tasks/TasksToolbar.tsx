import React from 'react';
import {
  Icon,
  IconButton,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';

const TasksToolbar: React.FC<any> = props => {
  const orderBy = '';
  const orderDescending = false;

  const handleOrderChange = (ev: any) => {
    console.log('change ordering');
  };

  return (
    <div className="flex justify-between w-full">
      <div className="flex" />
      <div className="flex items-center">
        <FormControl className="">
          <Select
            value={orderBy}
            onChange={handleOrderChange}
            displayEmpty
            name="filter"
            className=""
          >
            <MenuItem value="">
              <em>Order by</em>
            </MenuItem>
            <MenuItem value="startDate">Start Date</MenuItem>
            <MenuItem value="dueDate">Due Date</MenuItem>
            <MenuItem value="title">Title</MenuItem>
          </Select>
        </FormControl>
        <IconButton onClick={() => console.log('change order direction')}>
          <Icon
            style={{ transform: orderDescending ? 'scaleY(-1)' : 'scaleY(1)' }}
          >
            sort
          </Icon>
        </IconButton>
      </div>
    </div>
  );
};

export default TasksToolbar;
