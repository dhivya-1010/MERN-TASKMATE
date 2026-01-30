import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./Components/Header";
import AddTask from "./Components/AddTask";
import ShowTask from "./Components/ShowTask";
import TaskChart from "./Components/TaskChart";

function App() {
  const [task, setTask] = useState("");
  const [tasklist, setTasklist] = useState([]);
  const [editid, setEditid] = useState(null);

  // FETCH
  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks")
      .then(res => setTasklist(res.data));
  }, []);

  // ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    const date = new Date();

    if (editid) {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${editid}`,
        { name: task }
      );

      setTasklist(tasklist.map(t =>
        t._id === editid ? res.data : t
      ));
      setEditid(null);
      setTask("");
      return;
    }

    const res = await axios.post(
      "http://localhost:5000/api/tasks",
      {
        name: task,
        time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`
      }
    );
    setTasklist([...tasklist, res.data]);
    setTask("");
  };

  // EDIT
  const handleEdit = (id) => {
    const selected = tasklist.find(t => t._id === id);
    setTask(selected.name);
    setEditid(id);
  };

  // DELETE
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    setTasklist(tasklist.filter(t => t._id !== id));
  };

  // CHECKBOX
  const toggleComplete = async (id) => {
    const current = tasklist.find(t => t._id === id);

    const res = await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      { completed: !current.completed }
    );

    setTasklist(tasklist.map(t =>
      t._id === id ? res.data : t
    ));
  };

  return (
    <div className="App medium">
      <div className="container">
        <Header>Taskmate</Header>

        <TaskChart tasklist={tasklist} />

        <AddTask
          handleSubmit={handleSubmit}
          editid={editid}
          task={task}
          setTask={setTask}
        />

        <ShowTask
          tasklist={tasklist}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          toggleComplete={toggleComplete}
        />
      </div>
    </div>
  );
}

export default App;
