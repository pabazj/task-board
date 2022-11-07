import React, { useState, useRef, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { v4 as uuid } from "uuid"

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

import Task from './TaskList'

const StateListContainer = styled(List)({
    display: 'flex',
    flexDirection: 'row'
});

const StateListItemCard = styled(Card)({
    height: "500%",
    background: '#F0FFFF',
    margin: '10px',
    minWidth: '20%'
});

const SortIconWraperDiv = styled('div')(({ theme }) => ({
    float: 'right',
    paddingRight: '20px'
}));

const AddTaskButtonWraperDiv = styled('div')(({ theme }) => ({
    margin: '20px'
}));

const AddStateWraperDiv = styled('div')(({ theme }) => ({
    marginTop: '10px',
    marginLeft: '10px'
}));

const AddNewState = styled(TextField)({
    width: '150px',
    paddingRight: '10px'
});

export default function StateList(props) {

    const [selectedListId, setSelectedListId] = useState({})
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [selectedTask, setSelectedtask] = useState({})

    const newListTitleRef = useRef();

    useEffect(() => {

        if (isEdit) {
            setName(selectedTask[0].name)
            setDescription(selectedTask[0].description)
            setDeadline(selectedTask[0].deadline)
        }
    }, [isEdit, selectedTask]);

    const handleAddStateList = () => {
        const list = {
            id: uuid(),
            title: newListTitleRef.current.value,
            taskList: []
        };
        props.onAddList(list);
        newListTitleRef.current.value = "";

        setSelectedListId(list)
    }

    const handleAddTask = () => {
        console.log(deadline, '..deadline')
        const task = {
            id: isEdit ? selectedTask[0].id : uuid(),
            name: name,
            description: description,
            deadline: deadline,
            list: isEdit ? selectedTask[0].list : selectedListId
        };

        if (isEdit) {
            props.onEditTask(task, selectedListId)
            handleClose()
        }
        else {
            props.onAddTask(task, selectedListId)
            handleClose()
        }

    }

    const handleClickOpen = (id, status) => {
        status === 'edit' ? editHandler(id) : createHandler(id)
        setOpen(true);
    };

    const createHandler = (id) => {
        setIsEdit(false)
        resetTaskModal()
        setSelectedListId(id)
    }

    const editHandler = () => {
        setIsEdit(true)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteTask = (listId, taskId) => {
        props.onRemoveTask(listId, taskId)
    }

    const resetTaskModal = () => {
        setName('')
        setDescription('')
        setDeadline('')
    }

    const handleEditTask = (listId, taskId) => {
        let items = [...props.data];
        let selectedObj = items.find(item => item.id === listId)
        let filteredTask = selectedObj.taskList.filter(item => item.id === taskId)

        setSelectedtask(filteredTask)
        handleClickOpen(taskId, 'edit')
    }

    const handleSortTaskList = (id) => {
        props.onSortTasks(id)
    }

    return (
        <div >
            <StateListContainer>
                {props.data.map(list => (
                    <StateListItemCard key={list.id}>
                        <CardActionArea>
                            <ListItem key={list.id}>
                                <Typography variant="h5" gutterBottom>{list.title}</Typography>
                            </ListItem>

                            <List sx={{ width: '100%', maxWidth: 360 }}>
                                {list.taskList?.length > 0 ?
                                    <SortIconWraperDiv>
                                        <SortByAlphaIcon color="primary" fontSize="small" onClick={() => handleSortTaskList(list.id)} />
                                    </SortIconWraperDiv> : null}

                                {list.taskList.map((task) => (
                                    <ListItem alignItems="flex-start" key={task.id}>
                                        <Task
                                            task={task}
                                            onRemove={() => { handleDeleteTask(list.id, task.id) }}
                                            onEdit={() => { handleEditTask(list.id, task.id) }}
                                        />
                                    </ListItem >
                                ))}
                            </List>

                            <AddTaskButtonWraperDiv>
                                <Button variant="contained" onClick={() => { handleClickOpen(list.id, 'add') }}>Add Task</Button>
                            </AddTaskButtonWraperDiv>

                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>{isEdit ? 'Edit Task' : 'Create Task'} </DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Name"
                                        fullWidth
                                        variant="standard"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="description"
                                        label="Description"
                                        fullWidth
                                        variant="standard"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="date"
                                        type="date"
                                        disablePast={true}
                                        label="Deadline"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        variant="standard"
                                        fullWidth
                                        value={deadline}
                                        onChange={(e) => setDeadline(e.target.value)}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button variant="contained" onClick={handleClose}>Cancel</Button>
                                    <Button variant="contained" onClick={handleAddTask}>Save</Button>
                                </DialogActions>
                            </Dialog>
                        </CardActionArea>
                    </StateListItemCard>
                ))}

                <AddStateWraperDiv>
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
                        <AddNewState variant="standard" inputRef={newListTitleRef} placeholder="Add New State" />
                        <Button variant="contained" onClick={handleAddStateList}>Add</Button>
                    </Box>
                </AddStateWraperDiv>
            </StateListContainer >
        </div>
    )
}
