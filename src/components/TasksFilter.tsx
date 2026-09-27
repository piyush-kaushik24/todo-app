type TasksFilterProps = {
  onFilterTask: (name: string) => void;
  taskFilter: string;
};
export const TasksFilter = ({ onFilterTask, taskFilter }: TasksFilterProps) => {
  const status = ["All", "Active", "Completed"];

  return (
    <div className="bg-surface border-border flex justify-center gap-4 rounded-lg border p-4">
      {status.map((status) => (
        <button
          key={status}
          type="button"
          aria-pressed={status === taskFilter}
          onClick={() => {
            onFilterTask(status);
          }}
          className={`${status === taskFilter ? "text-primary" : "hover:text-heading"} relative z-20 cursor-pointer duration-800`}
        >
          {status}
        </button>
      ))}
    </div>
  );
};
