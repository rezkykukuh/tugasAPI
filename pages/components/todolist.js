
import ToDo from './todo';
import React, { useState } from "react";
import { useSelector } from 'react-redux';

const ToDoList = (props) => {
    const { handleEdit, handleDelete } = props;
    const todos =useSelector((state)=>state.todos);



    return (
       <div className="container">
           {todos.map((todo => (
                   <ToDo 
                   todo={todo } 
                   handleEdit={handleEdit}
                   handleDelete={handleDelete}
                   key={todo.id}
                    />
               )))}
               
       </div>
   );
};
 
export default ToDoList;