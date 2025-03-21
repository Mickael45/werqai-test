import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  title: string;
  description: string;
  id: string;
  onClose: VoidFunction;
  onUpdate: (updatedDescription: string, updatedTitle: string) => Promise<void>;
};

const TITLE_INPUT_ID = "title";
const DESCRIPTION_INPUT_ID = "description";

function EditModal({ onClose, onUpdate, title, description }: Props) {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [isUpdateButtonDisabled, setIsUpdateButtonDisabled] = useState(true);

  useEffect(() => {
    setIsUpdateButtonDisabled(!updatedTitle || !updatedDescription);
  }, [updatedTitle, updatedDescription]);

  const handleUpdateButtonClick = () => {
    onUpdate(updatedDescription, updatedTitle);
    onClose();
  };

  const handleTitleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUpdatedTitle(e.target.value);
  const handleDescriptionInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUpdatedDescription(e.target.value);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md relative">
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
        <h2>Update Task</h2>
        <input
          id={TITLE_INPUT_ID}
          className="text-xl font-bold mb-4"
          defaultValue={title}
          onChange={handleTitleInputChange}
          value={updatedTitle}
        />
        <input
          id={DESCRIPTION_INPUT_ID}
          className="mb-4"
          defaultValue={description}
          onChange={handleDescriptionInputChange}
          value={updatedDescription}
        />
        <button
          disabled={isUpdateButtonDisabled}
          onClick={handleUpdateButtonClick}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Update
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditModal;
