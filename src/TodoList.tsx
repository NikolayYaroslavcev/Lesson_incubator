import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValueType } from "./App";

type TodoListPropsType = {
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValueType;
  addTask: (title: string) => void;
  removeTask: (taskID: string) => void;
  changerFilter: (filter: FilterValueType) => void;
  changeTaskStatus: (taskID: string, isDone: boolean) => void;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

const TodoList = (props: TodoListPropsType) => {
  const [error, setError] = useState<boolean>(false);

  const onChangeHander = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    if (error) {
      setError(false);
    }
  };

  const [title, setTitle] = useState<string>("");
  const onClickAddTask = () => {
    const trimmedTitle = title.trim();
    if (Boolean(trimmedTitle)) {
      //0 , null ,undefined , "" , NaN, -0 -> false!!!
      // [] , {} -> true
      props.addTask(trimmedTitle);
    } else {
      setError(true);
    }
    setTitle("");
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickAddTask();
      setTitle("");
    }
  };

  const changeFilterHandler = (filter: FilterValueType) =>
    props.changerFilter(filter);

  const getTasksForRender = (
    tasks: Array<TaskType>,
    filter: FilterValueType
  ) => {
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
    return tasksForRender;
  };

  const tasksForRender: Array<TaskType> = getTasksForRender(
    props.tasks,
    props.filter
  );

  const tasksListItems = tasksForRender.length ? ( ///Проверка на ноль если получается ноль то выдает спан
    tasksForRender.map((t) => {
      const OnclickRemoveTask = () => props.removeTask(t.id);
      const onChangeChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(t.id, e.currentTarget.checked);
      };

      const taskClasses = t.isDone ? "us-done" : "";

      return (
        <div>
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.isDone}
              onChange={onChangeChangeStatus}
            />
            <span className={taskClasses}>{t.title}</span>
            <button onClick={OnclickRemoveTask}>X</button>
          </li>
        </div>
      );
    })
  ) : (
    <span>There are no tasks in the list with this filter value</span>
  );

  const allBtnClasses = props.filter === "all" ? "active-filter" : "";
  const activeBtnClasses = props.filter === "active" ? "active-filter" : "";
  const completedBtnClasses =
    props.filter === "completed" ? "active-filter" : "";
  const inputClasses = error ? "error" : "";

  return (
    <div>
      <div>
        <h3>{props.title}</h3>
      </div>
      <input
        value={title}
        onChange={onChangeHander}
        onKeyPress={onKeyPressHandler}
        className={inputClasses}
      />
      {/* e.currentTarget  - это input */}

      <button onClick={onClickAddTask}>+</button>
      {error && <div className={"error-message"}>Titile is required!</div>}
      <div>
        <ul>{tasksListItems}</ul>
        <button
          className={allBtnClasses}
          onClick={() => changeFilterHandler("all")}
        >
          All
        </button>
        <button
          className={activeBtnClasses}
          onClick={() => changeFilterHandler("active")}
        >
          Active
        </button>
        <button
          className={completedBtnClasses}
          onClick={() => changeFilterHandler("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;
