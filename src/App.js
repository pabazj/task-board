import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import {
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import StateList from './components/StateList'
import Typography from '@mui/material/Typography';

const HeaderWrapperDiv = styled('div')(({ theme }) => ({
  display: 'flex', 
  justifyContent: 'center'
}));


function App() {

  const [lists, setListsState] = useState([]);

  useEffect(() => {
  }, [lists]);

  useEffect(() => {
    if (localStorage.getItem("lists")) {
      setListsState(JSON.parse(localStorage.getItem("lists")));
    }
  }, [])

  const addList = (list) => {
    setListsState([...lists, list]);
  }

  const addTask = (task, id) => {

    let selectedObjIndex = lists.findIndex(item => item.id === id)
    let items = [...lists];
    items[selectedObjIndex] = { ...items[selectedObjIndex], taskList: [...items[selectedObjIndex].taskList, task] }
    setListsState(items)
    localStorage.setItem("lists", JSON.stringify(items));
  }

  const removeTask = (listId, taskId) => {

    let items = [...lists];
    let selectedObj = items.find(item => item.id === listId)
    let selectedObjIndex = lists.findIndex(item => item.id === listId)

    let filteredTask = selectedObj.taskList.filter(item => item.id !== taskId)
    items[selectedObjIndex] = { ...items[selectedObjIndex], taskList: filteredTask }
    setListsState(items)
    localStorage.setItem("lists", JSON.stringify(items));

  }

  const editTask = (task, id) => {

    let items = [...lists];
    let selectedObj = items.find(item => item.id === task.list)
    let selectedObjIndex = lists.findIndex(item => item.id === task.list)

    let filteredTasks = selectedObj.taskList.filter(item => item.id !== task.id)
    let modifiedTasks = filteredTasks.concat(task)
    items[selectedObjIndex] = { ...items[selectedObjIndex], taskList: modifiedTasks }
    setListsState(items)
    localStorage.setItem("lists", JSON.stringify(items));
  }

  const sortTasks = (listId) => {

    let items = [...lists];
    let selectedObj = items.find(item => item.id === listId)
    let selectedObjIndex = items.findIndex(item => item.id === listId)

    let sortedTaskList = selectedObj.taskList.sort((a, b) => {
      return a.name > b.name ? 1 : -1
    })

    items[selectedObjIndex] = { ...items[selectedObjIndex], taskList: sortedTaskList }
    setListsState(items)
    localStorage.setItem("lists", JSON.stringify(items));

  }

  return (
    <>
      <Router>
        <HeaderWrapperDiv>
          <Typography variant="h3" gutterBottom>Task Board</Typography>
        </HeaderWrapperDiv>
        <StateList
          data={lists}
          onAddList={addList}
          onAddTask={addTask}
          onRemoveTask={removeTask}
          onEditTask={editTask}
          onSortTasks={sortTasks}
        />
        <Routes>
        </Routes>
      </Router>
    </>
  );
}

export default App;
