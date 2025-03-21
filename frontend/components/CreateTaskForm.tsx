import { createTask } from '@/lib/api/task';
import { FormEvent } from 'react';

type Props = {
  refetchAllTasks: VoidFunction;
};

const TITLE_INPUT_ID = 'title';
const DESCRIPTION_INPUT_ID = 'description';

const CreateTaskForm = ({ refetchAllTasks }: Props) => {
  const onCreateTaskClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const titleInput = document.getElementById(
      TITLE_INPUT_ID,
    ) as HTMLInputElement;
    const descriptionInput = document.getElementById(
      DESCRIPTION_INPUT_ID,
    ) as HTMLInputElement;
    const title = titleInput.value;
    const description = descriptionInput.value;

    if (!title || !description) {
      return;
    }

    await createTask(title, description);

    titleInput.value = '';
    descriptionInput.value = '';
    refetchAllTasks();
  };
  return (
    <form
      onSubmit={onCreateTaskClick}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full"
    >
      <h2 className="text-2xl font-bold mb-5 text-center">Create Task</h2>
      <div className="grid gap-3">
        <label htmlFor={TITLE_INPUT_ID} className="text-lg">
          Title
        </label>
        <input
          id={TITLE_INPUT_ID}
          required
          type="text"
          placeholder="Title"
          className="block w-full rounded-md border shadow-sm p-3 focus:border-blue-300 text-gray-800 placeholder-gray-500 focus:ring-blue-300 text-lg"
        />
        <label htmlFor={DESCRIPTION_INPUT_ID} className="text-lg">
          Description
        </label>
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
        className="bg-blue-300 text-white font-bold py-2 px-4 rounded hover:cursor-pointer w-full"
      >
        Create
      </button>
    </form>
  );
};

export default CreateTaskForm;
