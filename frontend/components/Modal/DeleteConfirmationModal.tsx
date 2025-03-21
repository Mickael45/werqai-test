import Portal from './Portal';

type Props = {
  onClose: VoidFunction;
  onDelete: VoidFunction;
};

const DeleteConfirmationModal = ({ onClose, onDelete }: Props) => {
  return (
    <Portal>
      <div className="fixed text-black top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
        <div className="bg-white p-6 w-3/4 max-w-md rounded-md shadow-md relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-transparent border-none text-gray-600 hover:text-gray-800 cursor-pointer text-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-center mb-4">
            Confirm Deletion
          </h2>
          <p className="grid gap-3">Do you really want to delete this task?</p>
          <hr className="my-5 border border-t-0 border-gray-300 w-full" />
          <div className="flex justify-between gap-4">
            <button
              onClick={onDelete}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default DeleteConfirmationModal;
