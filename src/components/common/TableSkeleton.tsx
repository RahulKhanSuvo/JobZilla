import { TableRow, TableCell } from "@/components/ui/table";

type TableSkeletonProps = {
    rows?: number;
    columns?: number;
};

export default function TableSkeleton({
    rows = 5,
    columns = 5,
}: TableSkeletonProps) {
    return (
        <>
            {Array.from({ length: rows }).map((_, i) => (
                <TableRow key={i} className="border-b border-border/50">
                    {Array.from({ length: columns }).map((_, j) => (
                        <TableCell key={j}>
                            <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );
}