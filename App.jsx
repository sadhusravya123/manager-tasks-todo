import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("managerTasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [task, setTask] = useState("");
  const [employee, setEmployee] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    localStorage.setItem("managerTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task === "" || employee === "" || deadline === "") {
      alert("Please fill all fields");
      return;
    }

    const newTask = {
      id: Date.now(),
      task,
      employee,
      deadline,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setTask("");
    setEmployee("");
    setDeadline("");
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  return (
    <div className="app">
      <h1>Manager Task Assignment</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <input
          type="text"
          placeholder="Employee name"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <button onClick={addTask}>Assign Task</button>
      </div>

      <h2>Assigned Tasks</h2>

      {tasks.length === 0 ? (
        <p className="empty">No tasks assigned yet.</p>
      ) : (
        tasks.map((item) => (
          <div
            className={item.completed ? "task completed" : "task"}
            key={item.id}
          >
            <div>
              <h3>{item.task}</h3>
              <p>
                <b>Employee:</b> {item.employee}
              </p>
              <p>
                <b>Deadline:</b> {item.deadline}
              </p>
              <p>
                <b>Status:</b>{" "}
                {item.completed ? "Completed" : "Pending"}
              </p>
            </div>

            <div>
              <button onClick={() => completeTask(item.id)}>
                {item.completed ? "Undo" : "Complete"}
              </button>

              <button
                className="delete"
                onClick={() => deleteTask(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;