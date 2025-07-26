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
      <div className="flex items-center justify-center p-8 max-h-[70vh] min-h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 max-h-[70vh] min-h-[70vh]">
        <div className="text-center text-red-500">
          <p>Error loading products: {error.message}.</p>
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <div className="space-y-4">
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
    <main className="">
      <div className="container mx-auto py-8 ">
        <Suspense fallback={
          <div className="flex items-center justify-center p-8 max-h-[70vh] min-h-[70vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading...</p>
            </div>
          </div>
        }>
          <ProductsTable />
        </Suspense>
      </div>
    </main>
  );
}