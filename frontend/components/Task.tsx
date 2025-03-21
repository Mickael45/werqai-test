import { useState, MouseEvent } from 'react';
import EditModal from './Modal/EditModal';
import Portal from './Modal/Portal';
import { Status, TaskType } from '@/types/Task';
import { COMPLETED, IN_PROGRESS, PENDING } from '@/constants';
import { mapStatusToColor, mapStatusToLabel } from '@/utils/statusMappers';
import { updateTask } from '@/lib/api/task';

type Props = TaskType & {
  onUpdate: (task: TaskType) => void;
};

const Task = ({ title, description, status, id, onUpdate }: Props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

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
    <div
      id={id}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full"
    >
      <div className="hover:cursor-pointer" onClick={openPopup}>
        <h2 className="text-2xl mb-5">{title}</h2>
        <p className="text-base mb-5">{description}</p>
      </div>

      <hr className="mb-5 border-gray-300" />
      <div className="flex justify-between gap-4">
        <button
          id={PENDING}
          onClick={onUpdateStatus}
          className={`${status !== PENDING ? 'bg-gray-500' : mapStatusToColor[PENDING]} hover:cursor-pointer text-white font-bold py-2 px-4 rounded`}
        >
          {mapStatusToLabel[PENDING]}
        </button>
        <button
          id={IN_PROGRESS}
          onClick={onUpdateStatus}
          className={`${status !== IN_PROGRESS ? 'bg-gray-500' : mapStatusToColor[IN_PROGRESS]} hover:cursor-pointer text-white font-bold py-2 px-4 rounded`}
        >
          {mapStatusToLabel[IN_PROGRESS]}
        </button>
        <button
          id={COMPLETED}
          onClick={onUpdateStatus}
          className={`${status !== COMPLETED ? 'bg-gray-500' : mapStatusToColor[COMPLETED]} hover:cursor-pointer text-white font-bold py-2 px-4 rounded`}
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
