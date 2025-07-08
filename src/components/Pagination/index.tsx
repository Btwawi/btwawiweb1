import { Loader2 } from "lucide-react";
import Button from "../../base-components/Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  isLoading?: boolean;
  pageParamName?: string;
  itemsPerPageParamName?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  isLoading = false,
}: PaginationProps) {
  // Calculate the range of items being shown
  const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate visible page numbers
  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else if (currentPage <= 3) {
      // Show first 5 pages when near the start
      for (let i = 1; i <= maxVisible; i++) {
        visiblePages.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      // Show last 5 pages when near the end
      for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        visiblePages.push(i);
      }
    }

    return visiblePages;
  };

  return (
    <div className="flex flex-col items-center mt-4 sm:flex-row sm:justify-between">
      {/* {onItemsPerPageChange && (
        <div className="mb-2 sm:mb-0">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              const newItemsPerPage = Number(e.target.value);
              onItemsPerPageChange(newItemsPerPage);
              onPageChange(1);
            }}
            className="w-20 form-select"
            disabled={isLoading}
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="ml-2 text-sm text-gray-600">per page</span>
        </div>
      )} */}
      <div></div>

      <div className="flex items-center space-x-1">
        <Button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1 || isLoading}
          variant="outline-secondary"
          className="w-10 h-10 p-0"
          title="First page"
        >
          «
        </Button>

        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          variant="outline-secondary"
          className="w-10 h-10 p-0"
          title="Previous page"
        >
          ‹
        </Button>

        {getVisiblePages().map((pageNum) => (
          <Button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            variant={currentPage === pageNum ? "primary" : "outline-secondary"}
            className="w-10 h-10 p-0"
            disabled={isLoading}
          >
            {isLoading && currentPage === pageNum ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              pageNum
            )}
          </Button>
        ))}

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          variant="outline-secondary"
          className="w-10 h-10 p-0"
          title="Next page"
        >
          ›
        </Button>

        <Button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || isLoading}
          variant="outline-secondary"
          className="w-10 h-10 p-0"
          title="Last page"
        >
          »
        </Button>
      </div>

      <div className="mt-2 sm:mt-0 text-sm text-gray-600">
        Showing {startItem} to {endItem} of {totalItems} items
      </div>
    </div>
  );
}
