import React, { useState, useEffect, useRef } from 'react';
import jwt_decode from "jwt-decode";
import { apiUrl, doApiGet } from '../services/apiService';

function ToDoListForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();

  


  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    let arr = {
      id: Math.floor(Math.random() * 10000),
      text: input
    }
    props.onSubmit(arr);
    setInput('');

  }




  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a new to-do'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add to-do
          </button>
        </>
      )}
    </form>
  );
}

export default ToDoListForm;
