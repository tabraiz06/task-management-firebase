import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
const [existingTask, setExistingTask] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    const taskSnapshot = await getDocs(collection(db, "tasks"));
    const taskList = taskSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTasks(taskList);
    setLoading(false);
  };

  const addTask = async (task) => {
    const docRef = await addDoc(collection(db, "tasks"), task);
    setTasks((prev) => [...prev, { id: docRef.id, ...task }]);
  };

  const updateTask = async (id, updatedTask) => {
    const taskDoc = doc(db, "tasks", id);
    await updateDoc(taskDoc, updatedTask);
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  const deleteTask = async (id) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        loading,
        existingTask,
        setExistingTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
