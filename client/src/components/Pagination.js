import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Pagination({ totalItems, handlePage, selectedPage, ITEMS_PER_PAGE }) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <div className="flex items-center justify-between border-t border-gray-200 py-3 mt-6">
      <div className="flex gap-3 flex-1 justify-between sm:hidden select-none">
        <div
          className="relative inline-flex items-center border border-white px-4 py-2 text-sm font-medium cursor-pointer"
          onClick={() => {
            if (selectedPage > 1) {
              handlePage(selectedPage - 1);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          }}
        >
          Previous
        </div>
        <div
          className="relative inline-flex items-center border border-white px-4 py-2 text-sm font-medium cursor-pointer"
          onClick={() => {
            if (selectedPage < totalPages) {
              handlePage(selectedPage + 1);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          }}
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm">
            Showing{" "}
            <span className="font-medium">
              {(selectedPage - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(selectedPage * ITEMS_PER_PAGE, totalItems)}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px shadow-sm select-none"
            aria-label="Pagination"
          >
            <button
              className="relative inline-flex items-center px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-300 hover:text-[#333333]  disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit disabled:opacity-50"
              disabled={!(selectedPage > 1)}
              onClick={() => {
                if (selectedPage > 1) {
                  handlePage(selectedPage - 1);
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }
              }}
            >
              <AiOutlineDoubleLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            {Array.from({ length: totalPages }).map((el, index) => {
              const pageNo = index + 1;
              return (
                <div
                  key={index}
                  className={classNames(
                    selectedPage === pageNo
                      ? "bg-[#3498DB] hover:bg-[#3498DB] hover:text-inherit"
                      : "hover:bg-gray-300 hover:text-[#333333]",
                    "relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 cursor-pointer"
                  )}
                  onClick={() => {
                    handlePage(pageNo);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                >
                  {pageNo}
                </div>
              );
            })}
            <button
              className="relative inline-flex items-center px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-300 hover:text-[#333333] disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit disabled:opacity-50"
              disabled={!(selectedPage < totalPages)}
              onClick={() => {
                if (selectedPage < totalPages) {
                  handlePage(selectedPage + 1);
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }
              }}
            >
              <AiOutlineDoubleRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination