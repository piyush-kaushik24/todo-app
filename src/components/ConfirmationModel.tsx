import { type SetStateAction } from "react";
import type { TodoProps } from "./Todo";

type ConfirmationModelProps = {
  setTodo: React.Dispatch<SetStateAction<TodoProps[]>>;
  todo: TodoProps[];
  setConfirmation: React.Dispatch<SetStateAction<boolean>>;
};
export const ConfirmationModel = ({
  todo,
  setTodo,
  setConfirmation,
}: ConfirmationModelProps) => {
  let completedTasks = todo.filter((task) => task.completed).length;
  return (
    <div className="bg-surface border-border absolute top-1/2 left-1/2 z-30 w-[90%] max-w-80 -translate-x-1/2 rounded-xl border-2 -translate-y-1/2">
      <span className="block p-6 text-center">
        Are you sure u want to delete{" "}
        <span className="text-primary"> {completedTasks} </span>Completed{" "}
        <span>{completedTasks > 1 ? "Tasks" : "Task"} ?</span>
      </span>
      <span className="border-border flex justify-center gap-20 border-t p-6 font-bold">
        <button
          type="button"
          onClick={() => {
            setTodo(todo.filter((task) => !task.completed));
            setConfirmation(false);
          }}
          className="hover:text-primary duration-500"
        >
          Yes
        </button>

        <button
          type="button"
          onClick={() => setConfirmation(false)}
          className="hover:text-primary  duration-500"
        >
          Cancel
        </button>
      </span>
    </div>
  );
};
