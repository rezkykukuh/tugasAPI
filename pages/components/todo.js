import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../redux/todoslice'; 

const ToDo = (props) => {
    const dispatch = useDispatch();
    const { todo, handleEdit,  } = props;
  
    const handleDelete =()=>{
        dispatch(deleteTodo({id:todo.id}),
        alert("berhasil menghapus " + todo.title));
    }
  
    return (
       <div className="todo">
           <div className="todo-kiri">
                <a>{todo.title}</a><br/>
                {todo.quantity}<br/>
                {todo.price}
           </div>
           <div className="todo-kanan">
            <button className="edit" onClick={()=> handleEdit(todo)} >Edit</button>
            <button className="delete" onClick={()=> handleDelete(todo)} >Delete</button>
       </div> 
       </div>
   );
};
 
export default ToDo;