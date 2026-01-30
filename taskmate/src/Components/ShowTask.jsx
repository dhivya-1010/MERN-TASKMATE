const ShowTask = ({
  tasklist,
  setTasklist,
  handleEdit,
  handleDelete,
  toggleComplete,
}) => {
  return (
    <section className="showTask">
      <p className="head">
        <span>
          <span className="title">TO DO LIST</span>
          <span className="count">{tasklist.length}</span>
        </span>
        <br />
        <br />
        <span
          className="clearAll"
          onClick={() => setTasklist([])}
        >
          Clear All
        </span>
      </p>

      <ul>
        {tasklist.map((task) => (
          <li key={task._id}>
            {/* ✅ CHECKBOX */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task._id)}
            />

            {/* ✅ TASK CONTENT */}
            <p className={task.completed ? "completed" : ""}>
              <span className="name">{task.name}</span>
              <span className="time">{task.time}</span>
            </p>

            {/* ✏️ EDIT */}
            <i
              className="bi bi-pencil-square"
              onClick={() => handleEdit(task._id)}
            ></i>

            {/* 🗑️ DELETE */}
            <i
              className="bi bi-trash"
              onClick={() => handleDelete(task._id)}
            ></i>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ShowTask;
