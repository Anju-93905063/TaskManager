import React, { useState } from "react";
import { FaSave, FaTrash, FaEdit, FaCheckCircle } from "react-icons/fa";
import "../styles/TaskItem.css"; // Importing custom CSS for styling

const TaskItem = ({ task, deleteTask, toggleCompletion, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({ ...task });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const handleSave = () => {
    editTask(updatedTask);
    setIsEditing(false);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <div className="edit-task-form">
          <h5>Edit Task</h5>
          <div className="mb-3">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={updatedTask.title}
              onChange={handleEditChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Description:</label>
            <textarea
              name="description"
              value={updatedTask.description}
              onChange={handleEditChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Due Date:</label>
            <input
              type="date"
              name="dueDate"
              value={updatedTask.dueDate}
              onChange={handleEditChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Due Time:</label>
            <input
              type="time"
              name="dueTime"
              value={updatedTask.dueTime}
              onChange={handleEditChange}
              className="form-control"
            />
          </div>
          <button className="btn btn-success" onClick={handleSave}>
            <FaSave /> Save
          </button>
        </div>
      ) : (
        <div className="task-details">
          <h5 className={task.completed ? "completed-task" : ""}>
            {task.title}
          </h5>
          <p>{task.description}</p>
          <p>
            <strong>Due:</strong> {task.dueDate} <strong>Time:</strong>{" "}
            {task.dueTime}
          </p>
          <div className="task-actions d-flex justify-content-between align-items-center">
            {/* Toggle completion */}
            <button
              className={`btn ${
                task.completed ? "btn-success" : "btn-outline-success"
              }`}
              onClick={() => toggleCompletion(task._id)}
            >
              <FaCheckCircle color={task.completed ? "green" : "grey"} />
            </button>

            {/* Delete task */}
            <button
              className="btn btn-outline-danger"
              onClick={() => deleteTask(task._id)}
            >
              <FaTrash />
            </button>

            {/* Edit task */}
            <button
              className="btn btn-outline-primary"
              onClick={() => setIsEditing(true)}
            >
              <FaEdit />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
