"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "@/types/product";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import Image from "next/image";

export const productsColumns: ColumnDef<Product>[] = [
	{
		accessorKey: "id",
		header: "Id",
		cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
	},
	{
		accessorKey: "thumbnail",
		header: "Image",
		cell: ({ row }) => {
			const product = row.original;
			return (
				<div className="w-16 h-16 flex items-center justify-center relative">
					<Image
						src={product.thumbnail}
						alt={product.title}
						fill
						className="object-cover rounded-md"
					/>
				</div>
			);
		},
	},
	{
		accessorKey: "title",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Title" />
		),
		cell: ({ row }) => {
			const title = row.getValue("title");
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{String(title)}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "brand",
		header: "Brand",
		cell: ({ row }) => {
			const brand = row.getValue("brand");
			return (
				<div className="inline-flex text-foreground items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
					{String(brand) || 'not defined'}
				</div>
			);
		},
	},
	{
		accessorKey: "price",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Price" />
		),
		cell: ({ row }) => {
			const price = parseFloat(row.getValue("price"));
			return <div className="flex items-start font-medium">$ {price}</div>;
		},
	},
	{
		accessorKey: "rating",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Rating" />
		),
		cell: ({ row }) => {
			const rating = row.getValue("rating");
			return (
				<div className="flex items-center">
					<span className="text-yellow-500">★</span>
					<span className="ml-1">{Number(rating)}</span>
				</div>
			);
		},
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			const product = row.original;
			return (
				<DataTableRowActions
					row={product}
				/>
			);
		},
	},
];