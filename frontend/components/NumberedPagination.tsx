type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const NumberedPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="w-full pagination flex gap-2 justify-center">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${page === currentPage ? 'bg-blue-300' : 'bg-gray-300'} text-white font-bold py-2 px-4 rounded hover:cursor-pointer`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default NumberedPagination;
