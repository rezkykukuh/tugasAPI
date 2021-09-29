import { createSlice } from "@reduxjs/toolkit";


const todoSlice= createSlice({
    name: "todos",
    initialState: [
        {
        "id": 1,
        "title": "task1",
        "quantity": 1,
        "price":10000,
        "status": true
        },{
        "id": 2,
        "title": "task2",
        "quantity": 2,
        "price": 10000,
        "status": true
    }
    
    ], reducers:{
        addTodo:(state, action)=>{
            const newTodo ={
                id: state.length+1 ,
                title:action.payload.title,
                quantity:action.payload.quantity,
                price : action.payload.price,
            };
            state.push(newTodo);
        },
        updateTodo: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            state[index].title = action.payload.title;
            state[index].quantity = action.payload.quantity;
            state[index].price = action.payload.price;
          },
        deleteTodo: (state, action) => {
            return state.filter((todo)=> todo.id !== action.payload.id);
        },
    }
})

export const {addTodo, updateTodo, deleteTodo} = todoSlice.actions;


export default todoSlice.reducer;