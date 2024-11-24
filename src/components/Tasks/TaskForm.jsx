import React, { useState, useEffect, useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import { useNavigate } from "react-router-dom";

const TaskForm = () => {
 const { addTask, existingTask, setExistingTask, updateTask } =
   useContext(TaskContext);
 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
const navigate= useNavigate()
  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [existingTask]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (existingTask) {
      updateTask(existingTask.id, {
        title,
        description
      });
      setExistingTask(null)
    }else{
        addTask({ title, description });
    }
    
    setTitle("");
    setDescription("");
    navigate("/tasks");
  };
const onClose=()=>{
    navigate('/tasks')
}
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          {existingTask ? "Edit Task" : "Add New Task"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2 h-24"
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              {existingTask ? "Update Task" : "Add Task"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
