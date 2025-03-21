import { useState, MouseEvent } from "react";
import EditModal from "./Modal/EditModal";
import Portal from "./Modal/Portal";
import { Status, TaskType } from "@/types/Task";
import { COMPLETED, IN_PROGRESS, PENDING } from "@/constants";
import { mapStatusToColor, mapStatusToLabel } from "@/utils/statusMappers";
import { updateTask } from "@/lib/api/task";

type Props = TaskType & {
  onUpdate: (task: TaskType) => void;
};

const Task = ({ title, description, status, id, onUpdate }: Props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const onUpdateTitleAndDescription = async (
    updatedDescription: string,
    updatedTitle: string,
  ) => {
    const updatedTask = await updateTask({
      id,
      description: updatedDescription,
      title: updatedTitle,
      status,
    });

    onUpdate(updatedTask);
  };

  const onUpdateStatus = async (e: MouseEvent<HTMLButtonElement>) => {
    const newStatus = (e.target as HTMLButtonElement).id as Status;

    if (!newStatus) {
      return;
    }
    const updatedTask = await updateTask({
      id,
      description,
      title,
      status: newStatus,
    });

    onUpdate(updatedTask);
  };
  return (
    <div id={id} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex justify-between items-start">
        <h2 className="text-xl mb-5">{title}</h2>
        <button
          onClick={openPopup}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
          </svg>
        </button>
      </div>
      <p className="mb-5">{description}</p>

      <hr className="mb-5 border-gray-300" />
      <div className="flex justify-between gap-4">
        <button
          id={PENDING}
          onClick={onUpdateStatus}
          className={`${status !== PENDING ? "bg-gray-500" : mapStatusToColor[PENDING]} text-white font-bold py-2 px-4 rounded`}
        >
          {mapStatusToLabel[PENDING]}
        </button>
        <button
          id={IN_PROGRESS}
          onClick={onUpdateStatus}
          className={`${status !== IN_PROGRESS ? "bg-gray-500" : mapStatusToColor[IN_PROGRESS]} text-white font-bold py-2 px-4 rounded`}
        >
          {mapStatusToLabel[IN_PROGRESS]}
        </button>
        <button
          id={COMPLETED}
          onClick={onUpdateStatus}
          className={`${status !== COMPLETED ? "bg-gray-500" : mapStatusToColor[COMPLETED]} text-white font-bold py-2 px-4 rounded`}
        >
          {mapStatusToLabel[COMPLETED]}
        </button>
      </div>
      {isPopupOpen && (
        <Portal elementId="popup-root">
          <EditModal
            onClose={closePopup}
            onUpdate={onUpdateTitleAndDescription}
            id={id}
            description={description}
            title={title}
          />
        </Portal>
      )}
    </div>
  );
};
export default Task;
