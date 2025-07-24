"use client";

import { DataTable } from "@/components/table/data-table";
import { productsColumns } from "@/components/table/data-table-row";
import { useProducts } from "@/hooks/use-products";
import Navbar from "@/components/navbar";
import { useState } from "react";

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, error } = useProducts({
    page: currentPage,
    limit: pageSize,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  return (
    <main className="">
      <Navbar />
      <div className="container mx-auto py-8 ">
        {isLoading && (
          <div className="flex items-center justify-center p-8 max-h-[70vh] min-h-[70vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading products...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center p-8 max-h-[70vh] min-h-[70vh]">
            <div className="text-center text-red-500">
              <p>Error loading products: {error.message}.</p>
            </div>
          </div>
        )}

          {data && (
          <div className="space-y-4">
            <DataTable 
              columns={productsColumns}
              data={data.products}
              manualPagination={true}
              totalCount={data.total}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        )}
      </div>
    </main>
  );
}