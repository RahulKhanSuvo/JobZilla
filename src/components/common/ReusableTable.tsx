import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface ReusableTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function ReusableTable<T>({
  columns,
  data,
  isLoading = false,
  emptyMessage = "No results found.",
  className,
}: ReusableTableProps<T>) {
  if (isLoading) {
    return (
      <div className={`overflow-x-auto ${className || ""}`}>
        <Table className="w-full text-left border-collapse min-w-[1000px]">
          <TableHeader>
            <TableRow className="border-b border-slate-100 hover:bg-transparent">
              {columns.map((col, index) => (
                <TableHead
                  key={index}
                  className={`px-8 py-5 h-auto text-[11px] font-bold text-slate-400 uppercase tracking-widest ${col.className || ""}`}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-50">
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="border-none hover:bg-transparent"
              >
                {columns.map((col, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={`px-8 py-4 ${col.className || ""}`}
                  >
                    <Skeleton className="h-4 w-[80%]" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto ${className || ""}`}>
      <Table className="w-full text-left border-collapse min-w-[1000px]">
        <TableHeader>
          <TableRow className="border-b border-slate-100 hover:bg-transparent">
            {columns.map((col, index) => (
              <TableHead
                key={index}
                className={`px-8 py-5 h-auto text-[11px] font-bold text-slate-400 uppercase tracking-widest ${col.className || ""}`}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-slate-50">
          {data && data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="group hover:bg-slate-50/50 transition-colors border-none"
              >
                {columns.map((col, colIndex) => {
                  let cellContent: React.ReactNode = null;

                  if (col.cell) {
                    cellContent = col.cell(row);
                  } else if (col.accessorKey) {
                    cellContent = row[col.accessorKey] as React.ReactNode;
                  }

                  return (
                    <TableCell
                      key={colIndex}
                      className={`px-8 py-6 ${col.className || ""}`}
                    >
                      {cellContent}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent border-none">
              <TableCell
                colSpan={columns.length}
                className="px-8 py-10 text-center text-slate-500 font-medium"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
