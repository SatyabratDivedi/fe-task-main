import type { ProductsResponse } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

interface GetProductsParams {
   limit?: number;
   skip?: number;
}
interface UseProductsParams {
   page?: number;
   limit?: number;
}
const getProducts = async (params: GetProductsParams = {}): Promise<ProductsResponse> => {
   const { limit = 10, skip = 0 } = params;
   const response = await fetch(`https://dummyjson.com/products?skip=${skip}&limit=${limit}`);
   if (!response.ok) {
      throw new Error("Failed to fetch products");
   }
   return response.json() as Promise<ProductsResponse>;
};

export const useProducts = (params: UseProductsParams = {}) => {
   const { page = 1, limit = 10 } = params;
   const skip = (page - 1) * limit;

   return useQuery({
      queryKey: ["products", { page, limit }],
      queryFn: () => getProducts({ limit, skip }),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
   });
};