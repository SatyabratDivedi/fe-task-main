import type { ProductsResponse } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const getAllProducts = async (): Promise<ProductsResponse> => {
   const response = await fetch(`https://dummyjson.com/products?limit=0`);
   if (!response.ok) {
      throw new Error("Failed to fetch products");
   }
   return response.json() as Promise<ProductsResponse>;
};

export const useProducts = () => {
   // Fetch all products once
   const { data: allProductsData, isLoading, error } = useQuery({
      queryKey: ["products", "all"],
      queryFn: getAllProducts,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
   });

   // Return all data directly - let TanStack Table handle pagination
   const data = useMemo(() => {
      if (!allProductsData) return undefined;

      return {
         products: allProductsData.products, // Return ALL products
         total: allProductsData.total,
         skip: 0,
         limit: allProductsData.products.length, // Total length
      };
   }, [allProductsData]);

   return {
      data,
      isLoading,
      error,
   };
};