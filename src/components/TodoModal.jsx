/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, editTodo } from "../features/todo/todoSlice";
import { nanoid } from "@reduxjs/toolkit";
import validator from "validator";
import { Select, Modal, Input, message } from "antd";

const TodoModal = ({ visible, setIsModalOpen, title, todo, inputFocus }) => {
  const [description, setDescription] = useState(todo?.description || "");
  const [isDone, setIsDone] = useState(todo?.isDone || false);
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch(); // dispatch some action from our todoSlice

  const handleCancel = () => {
    setDescription(todo?.description);
    setIsDone(false);
    setIsModalOpen(false);
  };

  const handleOk = () => {
    if (description) {
      if (title.toLowerCase().includes("update")) {
        dispatch(
          editTodo({
            ...todo,
            id: todo.id,
            description,
            isDone,
          })
        );
        handleCancel(); // Close the modal
        return;
      }

      dispatch(
        addTodo({
          id: nanoid(),
          description,
          isDone,
          timeCreated: new Date().toLocaleString(),
        })
      );
    }

    if (validator.isEmpty(description)) {
      messageApi.open({
        type: "error",
        content: "Please provide a todo Task",
      });
      return;
    }

    messageApi.open({
      type: "success",
      content: "Todo Task added successfully",
    });
    setDescription(" ");
    setIsModalOpen(false); // close the modal
  };

  return (
    <>
      <Modal
        title={`${title} Todo Task`}
        onOk={handleOk}
        onCancel={handleCancel}
        open={visible}
        focusTriggerAfterClose={false}
      >
        {contextHolder}
        <div className="space-y-2 text-xl">
          <label className="text-lg">Title</label>
          <Input
            ref={inputFocus}
            placeholder="Write your task here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="grid space-y-2 my-4">
          <label>Status</label>
          <Select
            className="w-full"
            size="large"
            defaultValue={false}
            id="isDone"
            value={isDone}
            onChange={(value) => setIsDone(value)}
            options={[
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
      </Modal>
    </>
  );
};
export default TodoModal;
