"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

type PaginationUpdater = (prev: PaginationState) => PaginationState;

interface UsePaginationOptions {
  defaultPageSize?: number;
}

export function useUrlPagination({ defaultPageSize = 10 }: UsePaginationOptions = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get initial values from URL or defaults
  const getInitialPageIndex = useCallback(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      const page = parseInt(pageParam, 10);
      return page > 0 ? page - 1 : 0; // Convert to 0-based index
    }
    return 0;
  }, [searchParams]);

  const getInitialPageSize = useCallback(() => {
    const sizeParam = searchParams.get("size");
    if (sizeParam) {
      const size = parseInt(sizeParam, 10);
      return [10, 20, 30, 40, 50].includes(size) ? size : defaultPageSize;
    }
    return defaultPageSize;
  }, [searchParams, defaultPageSize]);

  const [pagination, setPagination] = useState({
    pageIndex: getInitialPageIndex(),
    pageSize: getInitialPageSize(),
  });

  const updateUrl = useCallback((pageIndex: number, pageSize: number) => {
    const params = new URLSearchParams(searchParams.toString());
    
    const pageNumber = pageIndex + 1;
    params.set("page", pageNumber.toString());
    
    if (pageSize === defaultPageSize) {
      params.delete("size");
    } else {
      params.set("size", pageSize.toString());
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : "";
    router.replace(newUrl, { scroll: false });
  }, [router, searchParams, defaultPageSize]);

  // Handle pagination change
  const onPaginationChange = useCallback((updater: PaginationState | PaginationUpdater) => {
    setPagination((prev) => {
      const newPagination = typeof updater === "function" ? updater(prev) : updater;
      
      // Update URL with new pagination
      updateUrl(newPagination.pageIndex, newPagination.pageSize);
      
      return newPagination;
    });
  }, [updateUrl]);

  // Initialize pagination from URL on mount
  useEffect(() => {
    const initialPageIndex = getInitialPageIndex();
    const initialPageSize = getInitialPageSize();
    
    setPagination({
      pageIndex: initialPageIndex,
      pageSize: initialPageSize,
    });
  }, [getInitialPageIndex, getInitialPageSize]);

  return {
    pagination,
    onPaginationChange,
  };
}
