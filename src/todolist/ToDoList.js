import React, { useEffect, useState } from 'react';
import ToDoListForm from './ToDoListForm';
import ToDo from './ToDo';
import { apiUrl, doApiGet } from '../services/apiService';
import jwt_decode from "jwt-decode";
import { addNewTodolist, addRemoveUpdateTodolist } from '../js/data';
import { useNavigate } from "react-router-dom";

function ToDoList() {
  const navi = useNavigate();
  const [todos, setTodos] = useState([]);
  const [userT , setUserT] = useState(); 

  useEffect(()=> {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navi("/");
    }
      else{
        let userToken = jwt_decode(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
        setUserT(userToken);
    let allTodo = apiUrl + "todolist";
    doApiGet(allTodo)
    .then(data => {
      let arr = data.filter(item => item.user_id === userToken._id);
      if(arr.length > 0){
        if(arr[0].todolist.length > 0){
          updateTodo(arr[0].todolist[0].id, arr[0].todolist[0].text);
        setTodos(arr[0].todolist)      }}
      else{
        newUser(userToken);
      }
    })
  }
  },[])

  
  const newUser = (userToken) => {
    let newUserA = {user_id: userToken._id,
    "todolist": []}
    addNewTodolist(newUserA);

  }


  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    addRemoveUpdateTodolist(newTodos,userT._id)
    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    let newTodo = todos.map(item => (item.id === todoId ? newValue : item));
    
addRemoveUpdateTodolist(newTodo, userT._id)
    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);
    addRemoveUpdateTodolist(removedArr,userT._id)
    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    
    addRemoveUpdateTodolist(updatedTodos, userT._id)
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>To-Do Lists</h1>
      <ToDoListForm onSubmit={addTodo} />
      <ToDo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default ToDoList;
