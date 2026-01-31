import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./Components/Header";
import AddTask from "./Components/AddTask";
import ShowTask from "./Components/ShowTask";
import TaskChart from "./Components/TaskChart";

// ✅ LIVE BACKEND URL
const API = "https://taskmate-backend-kox8.onrender.com/api/tasks";

function App() {
  const [task, setTask] = useState("");
  const [tasklist, setTasklist] = useState([]);
  const [editid, setEditid] = useState(null);

  // ✅ THEME STATE (RESTORED)
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme")) || "medium"
  );

  // FETCH
  useEffect(() => {
    axios.get(API)
      .then(res => setTasklist(res.data))
      .catch(err => console.error(err));
  }, []);

  // ✅ SAVE THEME TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  // ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    if (editid) {
      const res = await axios.put(
        `${API}/${editid}`,
        { name: task }
      );

      setTasklist(tasklist.map(t =>
        t._id === editid ? res.data : t
      ));
      setEditid(null);
      setTask("");
      return;
    }

    const res = await axios.post(API, { name: task });
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
    await axios.delete(`${API}/${id}`);
    setTasklist(tasklist.filter(t => t._id !== id));
  };

  // CHECKBOX
  const toggleComplete = async (id) => {
    const current = tasklist.find(t => t._id === id);

    const res = await axios.put(
      `${API}/${id}`,
      { completed: !current.completed }
    );

    setTasklist(tasklist.map(t =>
      t._id === id ? res.data : t
    ));
  };

  return (
    // ✅ USE THEME HERE
    <div className={"App " + theme}>
      <div className="container">
        {/* ✅ PASS THEME PROPS TO HEADER */}
        <Header theme={theme} setTheme={setTheme}>
          Taskmate
        </Header>

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
