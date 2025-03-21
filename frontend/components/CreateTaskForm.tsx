import { createTask } from "@/lib/api/task";
import { TaskType } from "@/types/Task";
import { FormEvent } from "react";

type Props = {
  onCreate: (task: TaskType) => void;
};

const TITLE_INPUT_ID = "title";
const DESCRIPTION_INPUT_ID = "description";

const CreateTaskForm = ({ onCreate }: Props) => {
  const onCreateTaskClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = (document.getElementById(TITLE_INPUT_ID) as HTMLInputElement)
      .value;
    const description = (
      document.getElementById(DESCRIPTION_INPUT_ID) as HTMLInputElement
    ).value;

    if (!title || !description) {
      return;
    }

    const newTask = await createTask(title, description);

    onCreate(newTask);
  };
  return (
    <form
      onSubmit={onCreateTaskClick}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full"
    >
      <h2 className="text-xl mb-5">Create Task</h2>
      <div className="grid gap-3">
        <input
          id={TITLE_INPUT_ID}
          required
          type="text"
          placeholder="Title"
          className="block w-full rounded-md border shadow-sm p-3 focus:border-blue-300 text-gray-800 placeholder-gray-500 focus:ring-blue-300 text-lg"
        />
        <input
          id={DESCRIPTION_INPUT_ID}
          required
          type="text"
          placeholder="Description"
          className="block w-full rounded-md border shadow-sm p-3 focus:border-blue-300 text-gray-800 placeholder-gray-500 focus:ring-blue-300 text-lg"
        />
      </div>
      <hr className="my-5 border border-t-0 border-gray-300 w-full " />
      <button
        type="submit"
        className="bg-blue-300 text-white font-bold py-2 px-4 rounded"
      >
        Create
      </button>
    </form>
  );
};

export default CreateTaskForm;
