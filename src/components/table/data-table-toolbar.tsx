"use client"

import { type Table } from "@tanstack/react-table"
import { X } from "lucide-react"
import { useState, useEffect, useRef } from "react"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { DataTableViewOptions } from "./data-table-view-options"
import { AddProductDialog } from "../add-product-dialog"

interface FilterOption {
  columnId: string;
  title: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filters?: FilterOption[];
}

export function DataTableToolbar<TData>({
  table,
  filters = [],
}: DataTableToolbarProps<TData>) {
  const [searchValue, setSearchValue] = useState("")
  const debounceRef = useRef<NodeJS.Timeout>()
  const isFiltered = table.getState().columnFilters.length > 0

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    
    debounceRef.current = setTimeout(() => {
      table.getColumn("title")?.setFilterValue(value)
    }, 500)
  }
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [])

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter products by title..."
          value={searchValue}
          onChange={(event) => handleSearchChange(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters()
              setSearchValue("")
              if (debounceRef.current) {
                clearTimeout(debounceRef.current)
              }
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <AddProductDialog />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
