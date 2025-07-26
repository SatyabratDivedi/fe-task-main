"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product } from "@/types/product";

async function fetchProduct(id: string): Promise<Product> {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return response.json() as Promise<Product>;
}

// Function to search for product in TanStack Query cache
function findProductInCache(queryClient: ReturnType<typeof useQueryClient>, productId: string): Product | null {
  const allProductsData = queryClient.getQueryData(["products", "all"]);
  
  if (!allProductsData || typeof allProductsData !== 'object' || !('products' in allProductsData)) {
    return null;
  }
  const productsData = allProductsData as { products: Product[]; total: number };
  
  // Search for the product by ID
  const foundProduct = productsData.products.find(
    (product: Product) => product.id.toString() === productId
  );
  
  if (foundProduct) {
    return foundProduct;
  }
  
  return null;
}

export function useProduct(id: string) {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      // Always check cache first - this ensures updated products are prioritized
      const cachedProduct = findProductInCache(queryClient, id);
      if (cachedProduct) {
        return cachedProduct;
      }
      
      // If not in cache, fetch from API
      return await fetchProduct(id);
    },
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    initialData: () => findProductInCache(queryClient, id) ?? undefined,
    initialDataUpdatedAt: () => {
      const cached = findProductInCache(queryClient, id);
      return cached ? Date.now() : 0;
    },
  });
}
