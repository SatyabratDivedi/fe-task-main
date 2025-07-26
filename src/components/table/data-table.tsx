"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useReactTable } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useUrlPagination } from "@/hooks/use-url-pagination";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface FilterOption {
  columnId: string;
  title: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filters?: FilterOption[];
  totalCount?: number;
}export function DataTable<TData, TValue>({
  columns,
  data,
  filters,
  totalCount,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const { pagination, onPaginationChange } = useUrlPagination({ defaultPageSize: 10 });
  
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    autoResetPageIndex: false,
  });

  return (
    <div className="w-full space-y-4">
      <DataTableToolbar table={table} filters={filters} />
      <div className="rounded-md border w-full overflow-hidden">
        <div className="max-h-[60vh] lg:max-h-[70vh] min-h-[50vh] overflow-auto">
          <Table className="relative">
            <TableHeader className="sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead 
                      key={header.id} 
                      colSpan={header.colSpan}
                      className={
                        header.column.id === "actions" 
                          ? "sticky right-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-l shadow-lg min-w-[120px] max-w-[120px]" 
                          : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => {
                      const product = row.original as { id: number };
                      if (product?.id) {
                        router.push(`/products/${product.id}`);
                      }
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell 
                        key={cell.id}
                        className={
                          cell.column.id === "actions" 
                            ? "sticky right-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-l shadow-lg min-w-[120px] max-w-[120px]" 
                            : ""
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <DataTablePagination 
        table={table}
        totalCount={totalCount}
      />
    </div>
  );
}
