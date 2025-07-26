"use client";

import { Suspense } from "react";
import { DataTable } from "@/components/table/data-table";
import { productsColumns } from "@/components/table/data-table-row";
import { useProducts } from "@/hooks/use-products";
import { useDocumentTitle } from "@/hooks/use-document-title";

function ProductsTable() {
  const { data, isLoading, error } = useProducts();
  
  useDocumentTitle("All Products – MyShop");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4 sm:p-8 min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-sm sm:text-base">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 sm:p-8 min-h-[50vh]">
        <div className="text-center text-red-500">
          <p className="text-sm sm:text-base">Error loading products: {error.message}.</p>
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <div className="w-full space-y-4">
        <DataTable 
          columns={productsColumns}
          data={data.products}
          totalCount={data.total}
        />
      </div>
    );
  }

  return null;
}

export default function HomePage() {
  return (
    <main className=" w-full">
      <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <Suspense fallback={
          <div className="flex items-center justify-center p-4 sm:p-8 min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-sm sm:text-base">Loading...</p>
            </div>
          </div>
        }>
          <ProductsTable />
        </Suspense>
      </div>
    </main>
  );
}