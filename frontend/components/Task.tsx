import { useState, MouseEvent } from 'react';
import EditModal from './Modal/EditModal';
import Portal from './Modal/Portal';
import { Status, TaskType } from '@/types/Task';
import { COMPLETED, IN_PROGRESS, PENDING } from '@/constants';
import { mapStatusToColor, mapStatusToLabel } from '@/utils/statusMappers';
import { deleteTask, updateTask } from '@/lib/api/task';
import DeleteConfirmationModal from './Modal/DeleteConfirmationModal';
import HistoryModal from './Modal/HistoryModal';

type Props = TaskType & {
  getAllTasks: VoidFunction;
};

const Task = ({ title, description, status, id, getAllTasks }: Props) => {
  const [isEditionModalOpen, setisEditionModalOpen] = useState(false);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const openHistoryModal = () => setIsHistoryModalOpen(true);
  const closeHistoryModal = () => setIsHistoryModalOpen(false);

  const openDeleteConfirmationModal = () =>
    setIsDeleteConfirmationModalOpen(true);
  const closeDeleteConfirmationModal = () =>
    setIsDeleteConfirmationModalOpen(false);

  const openEditionModal = () => setisEditionModalOpen(true);
  const closeEditionModal = () => setisEditionModalOpen(false);

  const onUpdateTitleAndDescription = async (
    updatedDescription: string,
    updatedTitle: string,
  ) => {
    await updateTask({
      id,
      description: updatedDescription,
      title: updatedTitle,
      status,
    });

    getAllTasks();
    closeEditionModal();
  };

  const onUpdateStatus = async (e: MouseEvent<HTMLButtonElement>) => {
    const newStatus = (e.target as HTMLButtonElement).id as Status;

    if (!newStatus) {
      return;
    }
    await updateTask({
      id,
      description,
      title,
      status: newStatus,
    });

    getAllTasks();
  };

  const onDeleteTask = async () => {
    await deleteTask(id);

    getAllTasks();
    closeDeleteConfirmationModal();
  };

  return (
    <div
      id={id}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full"
    >
      <div>
        <div className="flex justify-between items-start">
          <div
            onClick={openEditionModal}
            className="w-full hover:cursor-pointer"
          >
            <h2 className="text-2xl mb-5 col-span-11 w-full">{title}</h2>
            <p className="text-base mb-5">{description}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={openHistoryModal}
              className="border-1 border-gray-300 text-white font-bold p-2 rounded-xl hover:cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="blue"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              className="justify-self-end hover:cursor-pointer border-1 border-gray-300 text-white font-bold p-2 rounded-xl"
              onClick={openDeleteConfirmationModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="red"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
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
      {isEditionModalOpen && (
        <Portal elementId="popup-root">
          <EditModal
            onClose={closeEditionModal}
            onUpdate={onUpdateTitleAndDescription}
            id={id}
            description={description}
            title={title}
          />
        </Portal>
      )}
      {isDeleteConfirmationModalOpen && (
        <Portal elementId="popup-root">
          <DeleteConfirmationModal
            onClose={closeDeleteConfirmationModal}
            onDelete={onDeleteTask}
          />
        </Portal>
      )}
      {isHistoryModalOpen && (
        <Portal elementId="popup-root">
          <HistoryModal onClose={closeHistoryModal} id={id} />
        </Portal>
      )}
    </div>
  );
};
export default Task;
