/* eslint-disable react/prop-types */
import Checkbox from "antd/es/checkbox/Checkbox";
import { Button, Tooltip } from "antd";
import { formatDistanceToNow } from "date-fns";
import { deleteTodo, isTodoStatus } from "../features/todo/todoSlice";
import { useDispatch } from "react-redux";
import TodoModal from "./TodoModal";
import { useState } from "react";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

const Task = ({ todo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // The useDispatch hook provides a reference to the Redux store's dispatch function.
  // useDispatch hook is assinged to varible which will be tigger an action
  const dispatch = useDispatch();

  // function to handle delete action for task when user click the delete button
  /**
   * Handles the deletion of the current todo item.
   * Dispatches the 'deleteTodo' action from todoSlice to remove the todo from the Redux state.
   */
  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  // Function to handle the dispatch and toggle isDone
  //it handles action when a task has been completed
  const toggleTodoStatus = () => {
    // Dispatch the handleStatus action with the todoId
    dispatch(isTodoStatus(todo.id));
  };

  // Function to set the state and open the modal when called,
  // displaying modal content and actions in the User.
  const showModal = () => {
    setIsModalOpen(true);
  };

  // function to format the time a task was created
  /**
   * Returns a human-readable relative time string indicating the time difference
   * between the provided 'time' and the current date, formatted with 'date-fns'.
   *
   * param {string | number | Date} time - The timestamp or Date object to calculate relative time for.
   * returns {string} - A string representation of the relative time, e.g., "2 hours ago".
   */
  const RelativeTime = ({ time }) => {
    const relativeTime = formatDistanceToNow(new Date(time), {
      addSuffix: true,
    });
    return relativeTime;
  };

  return (
    <>
      <div className=" text p-4 even:bg-cyan-50 odd:bg-stone-50 rounded-xl mx-2 my-2">
        <div className="flex flex-wrap justify-between items-center sm:justify-between my-4 rounded-lg sm:flex-row ">
          {/* This div represents a task item container, displaying a checkbox along with the task description. The checkbox serves as a toggle for marking the task as done or undone, triggering the toggleTodoStatus function. The task description is displayed with an optional line-through decoration based on its completion status. */}
          <div className="flex justify-center items-center align-middle">
            <Checkbox
              style={{
                fontSize: 24,
                textDecoration: todo.isDone ? "line-through" : "none",
              }}
              checked={todo.isDone}
              onChange={toggleTodoStatus}
            >
              <p className="max-w-[10rem]  text-xl">{todo.description}</p>
            </Checkbox>
          </div>
          {/* Time created paragraph is here -- it render a  functional component named relativeTime with passed-in prop time created. It displays the creation timestamp of the todo item with a faded appearance */}
          <p className="opacity-30 sm:inline-block hidden">
            Created at <RelativeTime time={todo.timeCreated} />
          </p>

          <div className="flex justify-around gap-8 align-middle">
            {/* Checked task completed button is here
            Render a Button component for task complted, displayed conditionally based on the task's completion status. - The button triggers the showModal function on click.
            - The button is disabled if the task is already marked as done.
            */}
            <Tooltip title="task completed" placement="bottomRight">
              <Button
                className="border-0 text-lg h-full !text-green-300  "
                disabled={todo.isDone}
                style={{
                  display: todo.isDone ? "inline-block" : "none",
                }}
              >
                <CheckCircleOutlined />
              </Button>
            </Tooltip>

            {/*Edit task button is here
            Edit Task Button: Render a Button component for editing a task, displayed conditionally based on the task's completion status. - The button triggers the showModal function on click.
            - The button is disabled if the task is already marked as done*/}
            <Button
              className="h-full border-0 text-blue-800 text-xl"
              onClick={showModal}
              disabled={todo.isDone}
              style={{
                display: todo.isDone ? "none" : "inline-block",
              }}
            >
              <EditOutlined />
            </Button>

            {/* delete button is here 
            Delete Task Button: - The Button component renders a clickable button. - onClick and onKeyDown event handlers trigger the handleDelete function. - The className sets the styling for the button, including height, border, and text color. - The DeleteOutlined component renders an icon within the button.
            */}
            <Tooltip title="delete Task" color="red" placement="bottomLeft">
              <Button
                onClick={handleDelete}
                onKeyDown={handleDelete}
                className="border-0 text-red-600 text-xl"
              >
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/*
       Render a TodoModal component with the following props:
      `visible`: Controls the visibility of the modal, derived from the state `isModalOpen`.
      `setIsModalOpen`: Callback function to update the `isModalOpen` state and control modal visibility.
      `title`: Specifies the title of the modal, indicating it's intended for updating todo data.
      `todo`: Passes the current `todo` object to the modal for editing or updating. */}
      <TodoModal
        visible={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={"Update"}
        todo={todo}
        modalActionButton={"Update Task"}
      />
    </>
  );
};

export default Task;
