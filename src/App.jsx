import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AuthProvider, { AuthContext } from "./context/AuthContext";

import TaskList from "./components/Tasks/TaskList"; // Task listing page
import TaskForm from "./components/Tasks/TaskForm"; // Create/Edit task page
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import { TaskProvider } from "./context/TaskContext";

const PrivateRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);

  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <TaskList />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-task"
              element={
                <PrivateRoute>
                  <TaskForm />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
