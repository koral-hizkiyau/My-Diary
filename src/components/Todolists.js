import React from 'react';
import TodoList from '../todolist/ToDoList';
import "../css/todolist.css";
import Nav from '../Nav';

function Todolists() {
  return (
    <>
    
    <Nav/>
    <div className='todo-app'>
      <TodoList />
    </div>
    </>
  );
}

export default Todolists;

