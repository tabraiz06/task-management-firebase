import React, { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import { useNavigate } from "react-router-dom";

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask, existingTask, setExistingTask } =
    useContext(TaskContext);
const navigate= useNavigate()
  const handleEdit = () => {
    setExistingTask(task)
navigate('/create-task')
    // const updatedTitle = prompt("Enter new title", task.title);
    // const updatedDescription = prompt(
    //   "Enter new description",
    //   task.description
    // );
    // if (updatedTitle) {
    //   updateTask(task.id, {
    //     title: updatedTitle,
    //     description: updatedDescription,
    //   });
    // }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure?")) deleteTask(task.id);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-200 w-[25rem] min-h-[15rem] ">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h3>
      <p className="text-gray-600 mb-4">{task.description}</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
