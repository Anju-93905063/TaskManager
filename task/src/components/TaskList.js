import React from "react";
import TaskItem from "./TaskItem"; // Import TaskItem component

const TaskList = ({ tasks, deleteTask, toggleCompletion, editTask }) => {
  return (
    <div className="container mt-4">
      {tasks.length === 0 ? (
        <p className="text-center">No tasks available</p>
      ) : (
        <div className="row">
          {tasks.map((task) => (
            <div key={task._id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <TaskItem
                    task={task}
                    deleteTask={deleteTask} // Pass deleteTask function
                    toggleCompletion={toggleCompletion} // Pass toggleCompletion function
                    editTask={editTask} // Pass editTask function
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
