import { useQuery } from "@tanstack/react-query";
import type { ProductsResponse } from "@/types/product";


export const useProducts = () => {
   return useQuery({
      queryKey: ["products"],
      queryFn: async () => {
         const response = await fetch("https://dummyjson.com/products");
         if (!response.ok) {
            throw new Error("Failed to fetch products");
         }
         return response.json() as Promise<ProductsResponse>;
      },
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
   });
};
