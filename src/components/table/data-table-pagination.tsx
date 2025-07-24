import { type Table } from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  manualPagination?: boolean;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  totalCount?: number;
}

export function DataTablePagination<TData>({
  table,
  manualPagination = false,
  onPageChange,
  onPageSizeChange,
  totalCount,
}: DataTablePaginationProps<TData>) {
  const [pageInput, setPageInput] = useState<string>("");
  const [isFirstPopoverOpen, setFirstPopoverOpen] = useState(false);
  const [isSecondPopoverOpen, setSecondPopoverOpen] = useState(false);
  const [secondPageInput, setSecondPageInput] = useState<string>("");

  const currentPage = table.getState().pagination.pageIndex + 1;
  const pageSize = table.getState().pagination.pageSize;
  const totalPages = manualPagination && totalCount
    ? Math.ceil(totalCount / pageSize)
    : table.getPageCount();
  const canPreviousPage = manualPagination ? currentPage > 1 : table.getCanPreviousPage();
  const canNextPage = manualPagination ? currentPage < totalPages : table.getCanNextPage();

  const handleSetPage = () => {
    const pageIndex = Number(pageInput) - 1;
    if (manualPagination && onPageChange) {
      if (pageIndex >= 0 && pageIndex < (totalCount ? Math.ceil(totalCount / table.getState().pagination.pageSize) : table.getPageCount())) {
        onPageChange(pageIndex + 1);
      }
    } else {
      if (pageIndex >= 0 && pageIndex < table.getPageCount()) {
        table.setPageIndex(pageIndex);
      }
    }
    setPageInput("");
    setFirstPopoverOpen(false);
  };

  const handleSecondSetPage = () => {
    const pageIndex = Number(secondPageInput) - 1;
    if (manualPagination && onPageChange) {
      if (pageIndex >= 0 && pageIndex < (totalCount ? Math.ceil(totalCount / table.getState().pagination.pageSize) : table.getPageCount())) {
        onPageChange(pageIndex + 1);
      }
    } else {
      if (pageIndex >= 0 && pageIndex < table.getPageCount()) {
        table.setPageIndex(pageIndex);
      }
    }
    setSecondPageInput("");
    setSecondPopoverOpen(false);
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            const newPageSize = Number(value);
            if (manualPagination && onPageSizeChange) {
              onPageSizeChange(newPageSize);
            } else {
              table.setPageSize(newPageSize);
            }
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      {totalCount && (
        <div className="text-sm text-gray-600 mb-2">
          Total products: {totalCount} (Page {currentPage} of {Math.ceil(totalCount / pageSize)})
        </div>
      )}
      </div>


      <div className="flex items-center gap-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (manualPagination && onPageChange) {
                    if (canPreviousPage) {
                      onPageChange(currentPage - 1);
                    }
                  } else {
                    table.previousPage();
                  }
                }}
                className={
                  !canPreviousPage
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>

            {/* First page */}
            {totalPages > 0 && (
              <PaginationItem>
                <PaginationLink
                  isActive={table.getState().pagination.pageIndex === 0}
                  onClick={() => {
                    if (manualPagination && onPageChange) {
                      onPageChange(1);
                    } else {
                      table.setPageIndex(0);
                    }
                  }}
                >
                  1
                </PaginationLink>
              </PaginationItem>
            )}

            {/* First ellipsis */}
            {table.getState().pagination.pageIndex > 2 && totalPages > 4 && (
              <PaginationItem>
                <Popover
                  open={isFirstPopoverOpen}
                  onOpenChange={setFirstPopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-9 w-9 cursor-pointer p-0"
                    >
                      <PaginationEllipsis />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-44 p-3">
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="Page"
                        value={pageInput}
                        onChange={(e) => setPageInput(e.target.value)}
                        className="h-8"
                      />
                      <Button size="sm" className="h-8" onClick={handleSetPage}>
                        Go
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </PaginationItem>
            )}

            {/* Current page and surrounding pages */}
            {totalPages > 1 &&
              Array.from({ length: Math.min(3, totalPages - 2) }).map(
                (_, i) => {
                  const pageIndex = table.getState().pagination.pageIndex;
                  let page;

                  if (pageIndex <= 2) {
                    page = i + 1;
                  } else if (pageIndex >= totalPages - 3) {
                    page = totalPages - 3 + i;
                  } else {
                    page = pageIndex - 1 + i;
                  }

                  // Skip if this would duplicate first or last page
                  if (page === 0 || page === totalPages - 1)
                    return null;

                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={pageIndex === page}
                        onClick={() => {
                          if (manualPagination && onPageChange) {
                            onPageChange(page + 1);
                          } else {
                            table.setPageIndex(page);
                          }
                        }}
                      >
                        {page + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                },
              )}

            {/* Second ellipsis */}
            {table.getState().pagination.pageIndex <
              totalPages - 3 && totalPages > 4 && (
                <PaginationItem>
                  <Popover
                    open={isSecondPopoverOpen}
                    onOpenChange={setSecondPopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-9 w-9 cursor-pointer p-0"
                      >
                        <PaginationEllipsis />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-44 p-3">
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          placeholder="Page"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleSecondSetPage();
                            }
                          }}
                          value={secondPageInput}
                          onChange={(e) => setSecondPageInput(e.target.value)}
                          className="h-8"
                        />
                        <Button
                          size="sm"
                          className="h-8"
                          onClick={handleSecondSetPage}
                        >
                          Go
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </PaginationItem>
              )}

            {/* Last page */}
            {totalPages > 1 && (
              <PaginationItem>
                <PaginationLink
                  isActive={
                    table.getState().pagination.pageIndex ===
                    totalPages - 1
                  }
                  onClick={() => {
                    if (manualPagination && onPageChange) {
                      onPageChange(totalPages);
                    } else {
                      table.setPageIndex(table.getPageCount() - 1);
                    }
                  }}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (manualPagination && onPageChange) {
                    if (canNextPage) {
                      onPageChange(currentPage + 1);
                    }
                  } else {
                    table.nextPage();
                  }
                }}
                className={
                  !canNextPage
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
