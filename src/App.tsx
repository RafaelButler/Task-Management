import { useState } from "react";
import { InputTask } from "./components/InputTask";
import { Tasks } from "./components/Tasks";
import { Task, useTasks } from "./hooks/useGetTasks";

function App() {
  const [taskCreated, setTaskCreated] = useState<Task>();
  const some = useTasks(taskCreated);

  const handleTaskCreated = (task: Task) => setTaskCreated(task);
  return (
    <div className="mx-48 text-center">
      <div className="mx-48 my-20">
        <h3 className="text-normal mt-3 text-left text-2xl text-sub">
          Insira items na lista
        </h3>

        <div className="mt-10 text-left">
          <InputTask storeTask={handleTaskCreated} />

          <div>
            {some.map((task) => (
              <Tasks
                key={task.id}
                taskName={task.taskName}
                isChecked={task.isChecked}
                id={task.id}
                createdAt={task.createdAt}
                deletedAt={task.deletedAt}
                storeTask={handleTaskCreated}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
