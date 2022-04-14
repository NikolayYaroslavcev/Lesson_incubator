import React from "react";
import { FilterValueType } from "./App";

type TodoListPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskID: number) => void;
  changerFilter: (filter: FilterValueType) => void;
};

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

const TodoList = (props: TodoListPropsType) => {
  const tasksListItems = props.tasks.map((t) => {
    const onClickremoveTask = () => props.removeTask(t.id);

    return (
      <li key={t.id}>
        <input type="checkbox" checked={t.isDone} />
        <span>{t.title}</span>
        <button onClick={onClickremoveTask}>X</button>
      </li>
    );
  });
  return (
    <div>
      <div>
        <h3>{props.title}</h3>
      </div>
      <input />
      <button>+</button>
      <ul>{tasksListItems}</ul>
      <div>
        <button onClick={() => props.changerFilter("all")}>All</button>
        <button onClick={() => props.changerFilter("active")}>Active</button>
        <button onClick={() => props.changerFilter("completed")}>
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;
