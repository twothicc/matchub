import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type PaginationProp = {
  total: number,
  curr: number,
  pageUrl: string,
  updatePage: (page: number) => void
}

const size = parseInt(process.env.REACT_APP_PAGE_SIZE === undefined ? "5" : process.env.REACT_APP_PAGE_SIZE);

const Pagination = ({ total, curr, pageUrl, updatePage }: PaginationProp) => {
  const [pages, setPages] = useState(0);
  const [start, setStart] = useState(curr);

  useEffect(() => {
    const result = Math.ceil(total / size);
    if (result > 0) {
      setPages(result);
    }
  }, [total])

  useEffect(() => {
    setStart(curr);
  }, [curr])

  const handleBackwards = () => {
    let newVal = start - size;
    if (newVal < 0) {
      newVal = 0;
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
    <div className="sticky bottom-2 z-50 hidden flex-col sm:flex sm:flex-1 sm:items-center sm:justify-end">
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
              Array.from({length: 5}).map((_, i) => {
                if (start + i < pages) {
                  return (
                    <Link
                      key={pageUrl + (start + i)}
                      to={pageUrl + (start + i)}
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 bg-gray-50 focus:z-20 focus:outline-offset-0"
                      onClick={() => {updatePage(start + i)}}
                    >
                      {start + i}
                    </Link>
                  )
                } else {
                  return (
                    <button
                      key={"invalid_page_" + (start + i)}
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-300 ring-1 ring-inset ring-gray-300 bg-gray-50 focus:z-20 focus:outline-offset-0"
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