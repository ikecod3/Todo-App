import { Button, Select } from "antd";
import TodoModal from "./TodoModal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterTodo } from "../features/todo/todoSlice";
import { PlusCircleOutlined } from "@ant-design/icons";

const AddTask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterIsDone, setFilterIsDone] = useState("All Todo Task");
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  // This useEffect runs whenever the filterIsDone state variable changes.
  // The filterTodo action is dispatched with the updated isDone value to update the displayed todos.
  useEffect(() => {
    dispatch(filterTodo({ isDone: filterIsDone }));
  }, [filterIsDone, dispatch]);

  return (
    <div className="flex items-center justify-between p-4 mx-2 my-8 sm:mx-4">
      <Button type="primary" onClick={showModal} onKeyDown={showModal}>
        <PlusCircleOutlined />
        Add Task
      </Button>
      <div className="align-middle">
        <span className="text-xl mx-2 text-slate-500 align-middle">
          Filter:
        </span>
        <Select
          placeholder="All Task"
          size="middle"
          id="isDone"
          value={filterIsDone}
          defaultValue="All"
          onChange={(value) => setFilterIsDone(value)}
          options={[
            {
              value: "All Todo Task",
              label: "All Todo Task",
            },
            {
              value: false,
              label: "Pending",
            },
            {
              value: true,
              label: "Completed",
            },
          ]}
        />
      </div>

      {/* Use the TodoModal component */}
      {/*  Render a TodoModal component with the following props: 
      `visible`: Controls the visibility of the modal, derived from the state `isModalOpen`.
      `setIsModalOpen`: Callback function to update the `isModalOpen` state and control modal visibility. 
      `title`: Specifies the title of the modal, indicating it's intended for Add a todo task.  */}
      <TodoModal
        visible={isModalOpen}
        title={"Add"}
        setIsModalOpen={setIsModalOpen}
        modalActionButton={"Add Task"}
      />
    </div>
  );
};

export default AddTask;
