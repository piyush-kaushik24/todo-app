import { useState } from "react";

import { iconCheck, iconCross } from "../assets";

import { ConfirmationModel } from "./ConfirmationModel";

import type { TodoProps } from "./Todo";

type TodoListsProps = {
  todo: TodoProps[];
  onDelete: (id: string) => void;
  onCheck: (id: string) => void;
  setTodo: React.Dispatch<React.SetStateAction<TodoProps[]>>;
};

export const TodoLists = ({
  todo,
  onDelete,
  onCheck,
  setTodo,
}: TodoListsProps) => {
  const [taskId, setTaskId] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const itemsLeft = todo.filter((item) => !item.completed).length;
  const hasCompletedTasks = todo.some((task) => task.completed);

  function handleDrop(dragId: string, targetId: string) {
    setTodo((prev) => {
      const newTodo = [...prev];

      const draggedIndex = newTodo.findIndex((task) => task.id === dragId);

      const targetIndex = newTodo.findIndex((task) => task.id === targetId);

      const draggedItem = newTodo.find((task) => task.id === dragId);

      if (draggedIndex === -1 || targetIndex === -1 || !draggedItem) {
        return prev;
      }

      if (draggedIndex === targetIndex) {
        return prev;
      }

      newTodo.splice(draggedIndex, 1);

      if (draggedIndex < targetIndex) {
        newTodo.splice(targetIndex - 1, 0, draggedItem);
      } else {
        newTodo.splice(targetIndex, 0, draggedItem);
      }

      return newTodo;
    });

    setDraggedId(null);
  }

  function handleClearCompleted() {
    setTodo((prev) => prev.filter((task) => !task.completed));
  }

  return (
    <div className="bg-surface border-border my-4 rounded-lg border">
      <ul className="custom-scrollbar max-h-113 overflow-y-auto rounded-t-lg">
        {todo.map(({ id, name, completed }) => (
          <li
            key={id}
            draggable
            onDragStart={() => setDraggedId(id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (draggedId) {
                handleDrop(draggedId, id);
              }
            }}
            className="border-border group flex items-center justify-between gap-4 border p-4"
            onClick={() => setTaskId(id)}
          >
            <div className="flex items-center gap-4">
              <div className="relative h-8 w-8 rounded-full">
                <label htmlFor={`todo-${id}`} className="sr-only">
                  {name}
                </label>

                <input
                  checked={completed}
                  onChange={() => onCheck(id)}
                  type="checkbox"
                  name="todo"
                  id={`todo-${id}`}
                  className={`border-border group-hover:border-check-end relative h-8 w-8 cursor-pointer appearance-none rounded-full border duration-800 ease-linear ${
                    id === taskId ? "border-check-end border" : ""
                  } ${
                    completed
                      ? "from-check-start to-check-end bg-linear-to-br"
                      : ""
                  }`}
                />

                <img
                  src={iconCheck}
                  alt=""
                  className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden transition-[width] duration-500 ease-linear ${
                    completed ? "w-3" : "w-0"
                  }`}
                />
              </div>

              <span className="group-hover:text-heading">
                {completed ? (
                  <del className="text-completed">{name}</del>
                ) : (
                  <span>{name}</span>
                )}
              </span>
            </div>

            <button
              type="button"
              aria-label={`Delete ${name}`}
              onClick={() => onDelete(id)}
            >
              <img
                src={iconCross}
                alt=""
                className={`transition-[width] duration-500 ease-linear group-focus-within:w-5 ${
                  taskId === id ? "w-5" : "w-0"
                }`}
              />
            </button>
          </li>
        ))}
      </ul>

      <span className="border-border *:hover:text-heading bottom-0 z-0 flex w-full justify-between border-t p-4 *:duration-500 sm:absolute">
        <span>{itemsLeft} items left</span>

        <button
          type="button"
          disabled={!hasCompletedTasks}
          onClick={() => setConfirmation(true)}
          className="cursor-pointer"
        >
          Clear Completed
        </button>
      </span>

      {confirmation && (
        <ConfirmationModel
          todo={todo}
          onClearCompleted={handleClearCompleted}
          onClose={() => setConfirmation(false)}
        />
      )}
    </div>
  );
};
