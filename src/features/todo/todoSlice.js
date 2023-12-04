import { createSlice } from "@reduxjs/toolkit";

/**
 * getInitialTodo function retrieves an initial todo list from local storage.
 * If the todo list is found, it is parsed and returned.
 * If not found, an empty array is stored in local storage and returned.
 * returns {Array} The initial todo list.
 */

const getInitialTodo = () => {
  const localTodoList = localStorage.getItem("todoList");
  //   console.log(localTodoList);
  if (localTodoList) {
    // If todo list is found in local storage, parse and return it
    return JSON.parse(localTodoList);
  }
  // If todo list is not found, store an empty array in local storage and return it
  localStorage.setItem("todoList", JSON.stringify([]));
  return [];
};

const initialState = {
  todoList: getInitialTodo(),
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      // Add the new todo to the Redux state
      state.todoList.push(action.payload);
      // Retrieve the todoList from local storage or initialize an empty array
      const todoList = JSON.parse(localStorage.getItem("todoList") ?? "[]");
      // Add the new todo to the local storage todoList
      todoList.push(action.payload);
      // Update the local storage with the modified todoList
      localStorage.setItem("todoList", JSON.stringify(todoList));
    },
    deleteTodo: (state, action) => {
      // Retrieve the todoList from local storage or create an empty array if it doesn't exist
      const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
      // Use the filter method to create a new array excluding the todo item with the specified ID
      const updatedTodoList = todoList.filter(
        (todo) => todo.id !== action.payload
      );
      state.todoList = updatedTodoList;
      // Update the local storage with the modified todoList
      localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
    },

    editTodo: (state, action) => {
      // Retrieve the todoList from local storage or create an empty array if it doesn't exist
      const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
      // Find the index of the todo item in the todoList that matches the specified ID.
      const updatedTodoListIndex = todoList.findIndex(
        (todo) => todo.id === action.payload.id
      );
      // If a matching todo item is found, update it with the data from the action payload.
      if (updatedTodoListIndex >= 0) {
        todoList[updatedTodoListIndex] = action.payload;
      }
      // Update the Redux state with the modified todoList, creating a new array to maintain immutability.
      state.todoList = [...todoList];
      // Update the local storage with the latest todoList data.
      localStorage.setItem("todoList", JSON.stringify(todoList));
    },
    filterTodo: (state, action) => {
      const todoList = JSON.parse(localStorage.getItem("todoList") || []);
      // Check if the filter is set to "All Todo Tasks"
      if (action.payload.isDone === "All Todo Task") {
        state.todoList = todoList;
        return;
      }
      // Filter todoList based on the specified isDone status in the action payload
      const filteredTodo = todoList.filter(
        (todo) => todo.isDone === action.payload.isDone
      );
      // Update the Redux state with the filtered todoList
      state.todoList = filteredTodo;
    },
    isTodoStatus: (state, action) => {
      // Retrieve the current todoList from local storage or initialize an empty array
      const todoList = JSON.parse(localStorage.getItem("todoList") || []);
      // Find the index of the todo item with the specified ID in the todoList
      const setTodoStatus = todoList.findIndex(
        (todo) => todo.id === action.payload
      );
      // If the todo item is found in the todoList, toggle its isDone property
      if (setTodoStatus >= 0) {
        todoList[setTodoStatus].isDone = !todoList[setTodoStatus].isDone;
      }
      // Update the state with the modified todo list
      state.todoList = [...todoList];
      // Update the local storage with the updated todo list
      localStorage.setItem("todoList", JSON.stringify(todoList));
    },
  },
});

export const { addTodo, deleteTodo, editTodo, filterTodo, isTodoStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
