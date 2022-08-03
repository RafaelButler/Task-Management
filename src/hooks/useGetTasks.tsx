import { useEffect, useState } from "react";
import { api } from "../http/api";

export interface Task {
  id: string;
  taskName: string;
  deletedAt?: string | null;
  isChecked: boolean;
  createdAt: string;
  storeTask: () => void;
}

export function useTasks(props?: Task): Task[] {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getAllTasks() {
      const response = await api.get("tasks");
      const arrayTasks = response.data;
      setTasks(arrayTasks);
    }

    getAllTasks();
  }, [props]);

  return tasks;
}
