import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';

const ActionIconWrapper = styled('div')(({ theme }) => ({
  float: 'right'
}));

const DeadlineWrapper = styled('div')(({ theme }) => ({
  float: 'left'
}));

export default function TaskList(props) {

  const removeHandler = () => {
    return props.onRemove();
  }

  const editHandler = () => {
    return props.onEdit();
  }

  return (

    <Box
      component="form"
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        minWidth: 200,
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h6">{props.task.name}</Typography>
      <Typography variant="caption" >{props.task.description}</Typography>
      <div>
      <DeadlineWrapper>
      <Typography variant="overline">{props.task.deadline}</Typography>
      </DeadlineWrapper>
      <ActionIconWrapper>
        <DeleteIcon onClick={removeHandler} />
        <EditIcon onClick={editHandler} />
      </ActionIconWrapper>
      </div>
    </Box>

  )
}
