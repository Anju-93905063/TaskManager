import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter, Routes, Route
import TaskList from "./components/TaskList";
import Navbar from "./components/Navbar";
import ProgressChart from "./components/ProgressChart";
import TaskForm from "./components/TaskForm";
import About from "./pages/About"; // Import About.js
import Contact from "./pages/Contact"; // Import Contact.js

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(0);
  const [editingTask, setEditingTask] = useState(null); // State for editing task

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tasks");
        const data = await response.json();
        setTasks(data || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      const newTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const editTask = (task) => {
    setEditingTask(task); // Set task to edit
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${updatedTask._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        }
      );
      const updatedTaskData = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTaskData._id ? updatedTaskData : task
        )
      );
      setEditingTask(null); // Reset editing task after update
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const toggleCompletion = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${id}/toggle`,
        {
          method: "PUT",
        }
      );

      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const calculateProgress = useCallback(() => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    return (completedTasks / tasks.length) * 100;
  }, [tasks]);

  useEffect(() => {
    setProgress(calculateProgress());
  }, [tasks, calculateProgress]);

  return (
    <Router>
      <div className="container">
        <Navbar /> {/* Render Navbar */}
        <div className="my-4">
          <Routes>
            {/* Define Routes for About, Contact, and Home */}
            <Route
              path="/"
              element={
                <>
                  <h1 className="mb-4">Task Manager</h1>
                  <TaskForm onaddTask={addTask} />
                  <ProgressChart progress={progress} />
                  <TaskList
                    tasks={tasks}
                    deleteTask={deleteTask}
                    editTask={editTask}
                    toggleCompletion={toggleCompletion}
                  />
                  {editingTask && (
                    <TaskForm
                      task={editingTask}
                      onUpdateTask={updateTask} // Function to update task
                    />
                  )}
                </>
              }
            />
            <Route path="/about" element={<About />} /> {/* About Page */}
            <Route path="/contact" element={<Contact />} /> {/* Contact Page */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
