"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import Image from "next/image";
import { ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/hooks/use-product";
import { useDocumentTitle } from "@/hooks/use-document-title";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter();
  const { id } = use(params);

  const { data: product, isLoading, error } = useProduct(id);

  const title = product 
    ? `${product.title} – MyShop`
    : isLoading 
      ? "Loading Product – MyShop" 
      : "Product Not Found – MyShop";
  
  useDocumentTitle(title);

  if (isLoading) {
    return (
      <main className=" overflow-auto">
        <div className="container mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center p-4 sm:p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-sm sm:text-base">Loading product details...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className=" overflow-auto">
        <div className="container mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center p-4 sm:p-8">
            <div className="text-center text-red-500">
              <p className="text-sm sm:text-base mb-4">Product not found or failed to load.</p>
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className=" w-full">
      <div className="container mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Back Button */}
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="mb-4 sm:mb-6 w-full sm:w-auto"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-20">
          <div className="space-y-4 flex flex-col items-center lg:items-end">
            {/* Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden border w-[50%]">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 35vw"
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-4 md:space-y-6">
            {/* Title and Category */}
            <div>
              <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                {product.category.toUpperCase()}
              </span>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1 leading-tight">
                {product.title}
              </h1>
              {product.brand && (
                <div className="text-sm sm:text-base lg:text-lg text-gray-600 mt-1 dark:text-gray-400 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span>by {product.brand}</span>
                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">
                        {product.rating.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      ({Math.floor(Math.random() * 100) + 10} reviews)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Description</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed dark:text-gray-300">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
