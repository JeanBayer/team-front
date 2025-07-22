import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

const ROWS = new Array(10).fill(null);

export const TableBodyLoader = () => {
  return (
    <>
      {ROWS.map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="h-4 w-30" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-36" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-16" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-16" />
          </TableCell>
          <TableCell>
            <div className="flex justify-center">
              <Skeleton className="h-8 w-4" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
