import { useState } from "react";
import type { TodoProps } from "./Todo";

type TodoAddProps = {
  onAdd: (newTask: TodoProps) => void;
};

export const TodoAdd = ({ onAdd }: TodoAddProps) => {
  const [addTodo, setAddTodo] = useState({
    id: "",
    name: "",
    completed: false,
  });

  function addTask() {
    if (addTodo.name.trim().length < 1) {
      return;
    }
    const newTask = {
      id: crypto.randomUUID(),
      name: addTodo.name,
      completed: false,
    };

    onAdd(newTask);

    setAddTodo({
      id: "",
      name: "",
      completed: false,
    });
  }

  return (
    <div className="relative">
      <span className="border-border absolute top-1/2 left-0 inline-block h-8 w-8 translate-x-1/2 -translate-y-1/2 rounded-full border"></span>
      <form
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <label htmlFor="add-todo"></label>

        <input
          type="text"
          enterKeyHint="go"
          name="add-todo"
          value={addTodo.name}
          id="add-todo"
          placeholder="Create a new todo..."
          onChange={(e) => setAddTodo({ ...addTodo, name: e.target.value })}

          className="bg-surface border-border w-full appearance-none rounded-lg border p-4 pl-16"
        />
        <button type="submit" className="sr-only">
          Add Todo
        </button>
      </form>
    </div>
  );
};
