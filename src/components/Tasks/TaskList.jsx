import React, { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import { AuthContext } from "../../context/AuthContext";
import TaskItem from "./TaskItem";
import { Link, useNavigate } from "react-router-dom";

const TaskList = () => {
  const { tasks, loading } = useContext(TaskContext);
  const { logout } = useContext(AuthContext); // Access logout from AuthContext
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  // Filter tasks based on the search query
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(filter.toLowerCase()) ||
      task.description.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) return <p>Loading tasks...</p>;

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); // Redirect to login page
    } catch (error) {
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Task List</h1>
        <div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
          <Link
            to="/create-task"
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Create Task
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search tasks..."
        className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Task List */}
      <div className="flex flex-wrap gap-4 ">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          <p className="text-gray-500">No tasks match your search.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
