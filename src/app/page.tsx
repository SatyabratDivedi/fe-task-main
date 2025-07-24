"use client";

import { DataTable } from "@/components/table/data-table";
import { productsColumns } from "@/components/table/data-table-row";
import { useProducts } from "@/hooks/use-products";
import Navbar from "@/components/navbar";

export default function HomePage() {
  const { data, isLoading, error } = useProducts();

  return (
    <main className="min-h-screen overflow-auto">
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground mt-2">
            Manage your products inventory
          </p>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading products...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center p-8">
            <div className="text-center text-red-500">
              <p>Error loading products: {error.message}.</p>
            </div>
          </div>
        )}

        {data && (
          <DataTable 
            columns={productsColumns}
            data={data.products} 
          />
        )}
      </div>
    </main>
  );
}