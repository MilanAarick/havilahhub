"use client";

import * as React from "react";
import { formatDate } from "date-fns";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActivityLog, Question, Test, TestAttempt } from "@prisma/client";
import { TestWithAttempts } from "@/constants/global";

interface TestWithDetails {
  data: TestWithAttempts[] | null;
}

export const columns: ColumnDef<TestWithAttempts>[] = [
  {
    accessorKey: "completedAt",
    header: "Date Completed",
    cell: ({ row }) => {
      const date = row.original?.completedAt;
      return (
        <div className="lowercase text-left">
          {date ? formatDate(new Date(date), "MMMM dd, yyyy") : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "testId",
    header: "Test ID",
    cell: ({ row }) => (
      <div className="lowercase text-left">{row.getValue("testId")}</div>
    ),
  },
  {
    accessorKey: "test",
    header: "Level",
    cell: ({ row }) => {
      const level = row.original?.test?.schoolLevel;
      return <div className="lowercase text-left">{level}</div>;
    },
  },
  {
    accessorKey: "test",
    header: "Subject",
    cell: ({ row }) => {
      const subject = row.original?.test?.subjectArea;
      return <div className="lowercase text-left">{subject}</div>;
    },
  },
  {
    accessorKey: "score",
    header: "Cut off Score",
    cell: ({ row }) => {
      const passingScore = row.original?.test?.passingScore;
      return <div className="lowercase text-left">{passingScore}%</div>;
    },
  },
  {
    accessorKey: "score",
    header: "Test Score",
    cell: ({ row }) => {
      const questionLength = row.original?.test?.questions?.length;
      const percentage = ((row.original.score ?? 0) / questionLength) * 100;
      const formatted = percentage.toFixed(1);
      return (
        <div className="lowercase text-left">
          {row.getValue("score")} / {questionLength}{" "}
          <span className="font-semibold"> ({formatted}%) </span>
        </div>
      );
    },
  },
  {
    accessorKey: "test",
    header: "Test Question",
    cell: ({ row }) => {
      const title = row.original?.test?.title;
      return <div className="lowercase text-left">{title}</div>;
    },
  },
];

export function TestTable({ data }: TestWithDetails) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: data ? data : [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      {/* <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div> */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
