import React, { useState } from "react";
import "./App.css";
import TodoList from "./TodoList";

export type FilterValueType = "all" | "active" | "completed";

function App() {
  console.log("App relo");

  const todoListTitle: string = "What to lear";
  let [tasks, setTasks] = useState([
    { id: 1, title: "HTML", isDone: true },
    { id: 2, title: "CSS", isDone: true },
    { id: 3, title: "JS/TS", isDone: false },
  ]);
  const removeTask = (taskID: number) => {
    //получаем новый массив без одной таски
    const filteredTasks = tasks.filter((t) => t.id !== taskID);
    setTasks(tasks.filter((t) => t.id !== taskID));
  };

  const [filter, setFilter] = useState<FilterValueType>("all");
  const changerFilter = (filter: FilterValueType) => {
    setFilter(filter);
    console.log(filter);
  };
  //UI
  let tasksForRender;
  switch (filter) {
    case "completed":
      tasksForRender = tasks.filter((t) => t.isDone === true);
      break;
    case "active":
      tasksForRender = tasks.filter((t) => t.isDone === false);
      break;
    default:
      tasksForRender = tasks;
  }
  return (
    <div className="App">
      <TodoList
        title={todoListTitle}
        tasks={tasksForRender}
        removeTask={removeTask}
        changerFilter={changerFilter}
      />
    </div>
  );
}

export default App;
