import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { Link } from "react-router-dom";

type PaginationProp = {
  total: number,
  size: number,
  curr: number,
  updatePage: (page: number) => void
}

const Pagination = ({ total, size, curr, updatePage }: PaginationProp) => {
  const [pages, setPages] = useState(1);
  const [start, setStart] = useState(curr);

  useEffect(() => {
    const result = Math.floor(total / size);
    if (result > 0) {
      setPages(result);
    }
  }, [total, size])

  const handleBackwards = () => {
    let newVal = start - size;
    if (newVal < 1) {
      newVal = 1;
    }
    setStart(newVal);
  }

  const handleForwards = () => {
    let newVal = start + size;
    if (newVal > pages) {
      newVal = pages;
    }
    setStart(newVal);
  }

  return (
    <div className="sticky bottom-2 z-50 hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={handleBackwards}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {
              Array.from({length: 7}).map((_, i) => {
                if (start + i <= pages) {
                  return (
                    <Link
                      to={"/Clubs/" + (start + i)}
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 bg-gray-50 focus:z-20 focus:outline-offset-0"
                      onClick={() => {updatePage(start + i)}}
                    >
                      {start + i}
                    </Link>
                  )
                } else {
                  return (
                    <button
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-300 ring-1 ring-inset ring-gray-300 bg-gray-50 focus:z-20 focus:outline-offset-0"
                      value={start + i}
                      disabled={true}
                    >
                      {start + i}
                    </button>
                  )
                }
              })
            }
            <button
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={handleForwards}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
  )
};

export default Pagination;