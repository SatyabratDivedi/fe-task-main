"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { Product } from "@/types/product";

interface UpdateProductData {
  title: string;
  price: number;
  brand: string;
  rating: number;
  thumbnail: string;
  description: string;
  category: string;
}

// API function to update product
const updateProduct = async (productId: number, data: UpdateProductData): Promise<Product> => {
  const response = await fetch(`https://dummyjson.com/products/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update product');
  }

  return response.json() as Promise<Product>;
};

// API function to delete product
const deleteProduct = async (productId: number): Promise<{ id: number; isDeleted: boolean }> => {
  const response = await fetch(`https://dummyjson.com/products/${productId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete product');
  }

  return response.json() as Promise<{ id: number; isDeleted: boolean }>;
};

export function useProductOperations() {
  const queryClient = useQueryClient();

  const updateProductMutation = useMutation({
    mutationFn: ({ productId, data }: { productId: number; data: UpdateProductData }) => 
      updateProduct(productId, data),
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(["products", "all"], (oldData: { products: Product[]; total: number } | undefined) => {
        if (!oldData) return oldData;
        
        const productIndex = oldData.products.findIndex(p => p.id === updatedProduct.id);
        if (productIndex === -1) return oldData;
        
        const newProducts = [...oldData.products];
        newProducts[productIndex] = updatedProduct;
        
        return {
          ...oldData,
          products: newProducts,
        };
      });

      queryClient.setQueryData(["product", updatedProduct.id.toString()], updatedProduct);

      toast.success("Product updated successfully!");
    },
    onError: (error) => {
      console.error('Update product error:', error);
      toast.error("Failed to update product. Please try again.");
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (productId: number) => deleteProduct(productId),
    onSuccess: (_, productId) => {
      queryClient.setQueryData(["products", "all"], (oldData: { products: Product[]; total: number } | undefined) => {
        if (!oldData) return oldData;
        
        const filteredProducts = oldData.products.filter((p: Product) => p.id !== productId);
        
        const wasProductRemoved = filteredProducts.length < oldData.products.length;
        
        return {
          ...oldData,
          products: filteredProducts,
          total: wasProductRemoved ? Math.max(0, oldData.total - 1) : oldData.total,
        };
      });

      queryClient.removeQueries({ 
        queryKey: ["product", productId.toString()],
        exact: true 
      });

      toast.success("Product deleted successfully!");
    },
    onError: (error) => {
      console.error('Delete product error:', error);
      toast.error("Failed to delete product. Please try again.");
    },
  });

  return {
    updateProduct: updateProductMutation,
    deleteProduct: deleteProductMutation,
  };
}
