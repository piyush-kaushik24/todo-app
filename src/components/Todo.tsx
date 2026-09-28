import { useState } from "react";
import { todosPreview } from "../data/todosPreview";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { TasksFilter } from "./TasksFilter";
import { TodoAdd } from "./TodoAdd";
import { TodoLists } from "./TodoLists";
export type TodoProps = {
  id: string;
  name: string;
  completed: boolean;
};

export const Todo = () => {
  const [todo, setTodo] = useLocalStorage<TodoProps[] | []>(
    "todos",
    todosPreview,
  );
  const [taskFilter, setTaskFilter] = useState("All");
  function handleOnDelete(id: string) {
    setTodo((prev) => prev.filter((task) => task.id !== id));
  }
  function handleOnCheck(id: string) {
    setTodo((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }
  function handleOnAdd(newTask: {
    id: string;
    name: string;
    completed: boolean;
  }) {
    setTodo((prev) => [...prev, newTask]);
  }
  function handleOnFilter(name: string) {
    setTaskFilter(name);
  }

  const filteredTasks = todo.filter((task) => {
    if (taskFilter === "All") {
      return true;
    } else if (taskFilter === "Active") {
      return !task.completed;
    }
    return task.completed;
  });
  return (
    <div className="relative">
      <TodoAdd onAdd={handleOnAdd} />
      <TodoLists
        todo={filteredTasks}
        onDelete={handleOnDelete}
        onCheck={handleOnCheck}
        setTodo={setTodo}
      />
      <TasksFilter onFilterTask={handleOnFilter} taskFilter={taskFilter} />
    </div>
  );
};
