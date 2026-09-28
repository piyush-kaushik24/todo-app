import { useEffect, useRef } from "react";

import type { TodoProps } from "./Todo";

type ConfirmationModelProps = {
  todo: TodoProps[];
  onClearCompleted: () => void;
  onClose: () => void;
};

export const ConfirmationModel = ({
  todo,
  onClearCompleted,
  onClose,
}: ConfirmationModelProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const completedTasks = todo.filter((task) => task.completed).length;

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="bg-surface border-border m-auto w-[90%] max-w-80 rounded-xl border-2 p-0 text-inherit backdrop:bg-black/50"
    >
      <span className="block p-6 text-center">
        Are you sure u want to delete{" "}
        <span className="text-primary">{completedTasks}</span> Completed{" "}
        <span>{completedTasks > 1 ? "Tasks" : "Task"}?</span>
      </span>

      <form
        className="border-border flex justify-center gap-20 border-t p-6 font-bold"
        method="dialog"
      >
        <button
          type="submit"
          onClick={onClearCompleted}
          className="hover:text-primary duration-500"
        >
          Yes
        </button>

        <button type="submit" className="hover:text-primary duration-500">
          Cancel
        </button>
      </form>
    </dialog>
  );
};
