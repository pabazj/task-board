import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import {
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import StateList from './components/StateList'
import './app.css';

const HeaderWrapperDiv = styled('div')(({ theme }) => ({
  display: 'flex', 
  justifyContent: 'center',
  paddingTop:'2rem',
  color: 'blue'
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

  const removeTypes = (id) => {
    let items = [...lists];
    let filteredTypes = items.filter(item => item.id !== id)
    items =[...filteredTypes]
    setListsState(items)
    localStorage.setItem("lists", JSON.stringify(items));
  }

  return (
    <div className='app' 
    >
      <Router>
        <HeaderWrapperDiv>
          <div className="container">
            <div className="text">
              <span className="--i:1">M</span>
              <span className="--i:2">y</span>
              <span className="--i:3"></span>
              <span className="--i:4">T</span>
              <span className="--i:5">a</span>
              <span className="--i:6">s</span>
              <span className="--i:7">k</span>
              <span className="--i:8">s</span>
              <span className="--i:9"></span>
            </div>
          </div>
        </HeaderWrapperDiv>
        <StateList
          data={lists}
          onAddList={addList}
          onAddTask={addTask}
          onRemoveTask={removeTask}
          onEditTask={editTask}
          onSortTasks={sortTasks}
          onRemoveTypes={removeTypes}
        />
        <Routes>
        </Routes>
      </Router>
      </div>
  );
}

export default App;
