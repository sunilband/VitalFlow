import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableRowData {
  [key: string]: string | number;
}

interface TableProps {
  data: TableRowData[];
  columns: string[];
}

//   Reuseable table component
export default function DonationsTable({ data, columns }: TableProps) {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Donations</CardTitle>
        <CardDescription>
          Review your past donations and their status.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className={index > 0 ? "hidden sm:table-cell" : ""}
                >
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className={"hover:bg-accent"}>
                {columns.map((column, columnIndex) => (
                  <TableCell
                    key={columnIndex}
                    className={columnIndex > 0 ? "hidden sm:table-cell" : ""}
                  >
                    {row[column]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
