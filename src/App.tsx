import React, { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import TodoList, { TaskType } from "./TodoList";

export type FilterValueType = "all" | "active" | "completed";

function App() {
  const todoListTitle: string = "What to lear?";
  let [tasks, setTasks] = useState([
    { id: v1(), title: "HTML", isDone: true },
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS/TS", isDone: false },
  ]);
  const removeTask = (taskID: string) => {
    //получаем новый массив без одной таски
    const filteredTasks = tasks.filter((t) => t.id !== taskID);
    setTasks(tasks.filter((t) => t.id !== taskID));
  };

  const addTask = (title: string) => {
    //  const newTask: TaskType = {
    //    id: v1(),
    //    title: title,
    //    isDone: false,
    //  };
    //  const copyTasks = [...tasks];
    //  copyTasks.push(newTask);
    //  setTasks(copyTasks);

    /// Полное сокращение записи выше
    //1) setTasks  сэтаем новый массив [...tasks] в новый массив кладем содержимое старого массива
    // то есть делаем его копию
    //2) в начале массива создаем новый обьект с [{}...tasks] в него закидываем значения [{ id: v1(), title: title, isDone: false }, ...tasks]

    setTasks([{ id: v1(), title: title, isDone: false }, ...tasks]);

    // Вариан который мне нрав

    //1) Cоздаем новую таску
    //2) setTasks  сэтаем новый массив [...tasks] в новый массив кладем содержимое старого массива
    // 3)  в начале массива создаем новый обьект с [{}...tasks] в него закидываем значения newTask ([newTask, ...tasks])

    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const changeTaskStatus = (taskID: string, isDone: boolean) => {
    const upDateTasks = tasks.map((t) =>
      t.id === taskID ? { ...t, isDone } : t
    );
    setTasks(upDateTasks);
  };

  const [filter, setFilter] = useState<FilterValueType>("all");
  const changerFilter = (filter: FilterValueType) => {
    setFilter(filter);
  };

  //UI

  return (
    <div className="App">
      <TodoList
        filter={filter}
        title={todoListTitle}
        tasks={tasks}
        addTask={addTask}
        removeTask={removeTask}
        changerFilter={changerFilter}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  );
}

export default App;
