import { Calendar, Pencil, Trash } from "phosphor-react";
import { ChangeEvent, useState } from "react";
import { Task } from "../hooks/useGetTasks";
import { api } from "../http/api";

interface TaskStore {
  id: string;
  taskName: string;
  deletedAt?: string | null;
  isChecked: boolean;
  createdAt: string;
  storeTask: (props: Task) => void;
}

export function Tasks({
  taskName,
  isChecked,
  createdAt,
  deletedAt,
  storeTask,
}: TaskStore): JSX.Element {
  // Formata os dados
  const date = new Date(createdAt);
  const createdDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  const createdHour = date.getHours() + ":" + date.getMinutes();
  var period = date.getHours() >= 12 ? "pm" : "am";

  const [currentCheck, setIsChecked] = useState<boolean>(isChecked);
  const [edit, setIsEditing] = useState<boolean>(false);
  const [newNameTask, setNewNameTask] = useState<string>(taskName);

  // Faz a requisição para trocar se foi feito ou nao
  const handleChecked = async (e: ChangeEvent<HTMLInputElement>) => {
    if (taskName === e.target.value) {
      const response = await api.put(
        `/edit/ischecked/${e.target.value}/${!currentCheck}`
      );
    }
    setIsChecked(currentCheck ? false : true);
  };

  // Edita o nome da tarefa
  const handleWhenEdit = async (event: { key: string }) => {
    if (event.key === "Enter") {
      const response = await api.put(`/edit/task/${taskName}/${newNameTask}`);
      storeTask(response.data.data);
      setIsEditing(false);
    }
  };

  // Deleta a tarefa
  const handleDeleteTask = async () => {
    const response = await api.delete(`/delete/task/${taskName}`);
    storeTask(response.data.data);
  };

  return (
    <div
      className={`mt-5 w-full rounded-md bg-white py-6 px-6 shadow ${
        deletedAt !== null ? "hidden" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className="const
        createdHour = flex  w-1/2 items-center"
        >
          {!edit ? (
            <>
              <input
                id={taskName}
                type="checkbox"
                value={taskName}
                checked={currentCheck}
                onChange={(e) => handleChecked(e)}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-orange focus:ring-2 focus:ring-orange dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-orange"
              />
              <label
                htmlFor={taskName}
                className="ml-2 text-lg font-normal text-sub"
              >
                {taskName}
              </label>
            </>
          ) : (
            ""
          )}
          {edit ? (
            <input
              type="text"
              placeholder="Editar..."
              onChange={(e) => setNewNameTask(e.target.value)}
              onKeyDown={(e) => handleWhenEdit(e)}
              className="ml-2 bg-transparent py-2 pl-0 pr-3 text-xl focus:outline-none"
            />
          ) : (
            ""
          )}
        </div>

        <div
          className={`text-sm ${
            currentCheck ? "text-green-400" : "text-orange"
          } `}
        >
          {currentCheck ? "Completado" : "Ativo"}
        </div>

        <div className="ml-5 mt-2 flex items-center gap-1">
          <Calendar />
          <span className="text-sm">{createdDate}</span>
          <span className="text-sm uppercase">
            {createdHour} {period}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Pencil
            size={18}
            className="cursor-pointer text-sub"
            onClick={() => setIsEditing(!edit)}
          />
          <Trash
            size={18}
            className="cursor-pointer text-sub"
            color="red"
            onClick={() => handleDeleteTask()}
          />
        </div>
      </div>
    </div>
  );
}
