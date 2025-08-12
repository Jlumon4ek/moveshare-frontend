import { ChevronLeft, ChevronRight } from 'lucide-react';
import cn from 'classnames';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null; // Не отображаем пагинацию, если страниц меньше или одна
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  // Создаем массив номеров страниц для отображения
  const getPageNumbers = () => {
    const pages = [];
    // Логика для отображения ограниченного числа страниц, например: [1, '...', 4, 5, 6, '...', 10]
    // Для простоты пока отобразим все страницы
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    return pages;
  }

  const pages = getPageNumbers();

  return (
    <nav className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 sm:py-3 rounded-2xl border border-gray-200 shadow-sm mt-4 mb-4">
      <div className="flex flex-1 justify-between sm:hidden">
        <button 
          onClick={handlePrevious} 
          disabled={currentPage === 1} 
          className="relative inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </button>
        <span className="flex items-center text-sm text-gray-500 font-medium">
          {currentPage} of {totalPages}
        </span>
        <button 
          onClick={handleNext} 
          disabled={currentPage === totalPages} 
          className="relative inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <div className="isolate inline-flex -space-x-px rounded-lg shadow-sm" aria-label="Pagination">
            <button 
              onClick={handlePrevious} 
              disabled={currentPage === 1} 
              className="relative inline-flex items-center rounded-l-lg px-3 py-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-gray-700 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={cn("relative inline-flex items-center px-3 py-2 text-sm font-semibold transition-colors", {
                        'z-10 bg-primary text-white ring-1 ring-inset ring-primary hover:bg-primary/90': currentPage === page,
                        'text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:z-20 focus:outline-offset-0': currentPage !== page
                    })}
                >
                    {page}
                </button>
            ))}
            <button 
              onClick={handleNext} 
              disabled={currentPage === totalPages} 
              className="relative inline-flex items-center rounded-r-lg px-3 py-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-gray-700 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};