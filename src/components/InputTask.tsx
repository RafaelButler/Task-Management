import { useState } from "react";
import { api } from "../http/api";

export function InputTask({ storeTask }: any) {
  const [taskName, setTaskName] = useState<String>("");

  const handleKeyPress = async (event: { key: string }) => {
    if (event.key === "Enter") {
      const data = await api.post("create/task", {
        taskName,
      });

      storeTask(data.data.data);
    }
  };

  return (
    <div className="flex items-center pl-6">
      <input
        type="text"
        placeholder="Insira uma tarefa"
        onChange={(e) => setTaskName(e.target.value)}
        onKeyDown={(e) => handleKeyPress(e)}
        className="ml-2 bg-transparent py-3 pl-0 pr-3 text-xl focus:outline-none"
      />
    </div>
  );
}
