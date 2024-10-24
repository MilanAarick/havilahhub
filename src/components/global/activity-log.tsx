"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { ActivityLog } from "@prisma/client";
import { getServiceTitle } from "@/constants/global";
import { formatDate } from "date-fns";

type Props = {
  data: ActivityLog[] | undefined;
};

export default function ActivityLogTable({ data }: Props) {
  const getServiceTypeBadge = (type: ActivityLog["serviceType"]) => {
    if (getServiceTitle(type) === "writing") {
      return <Badge variant="secondary">Writing</Badge>;
    } else if (getServiceTitle(type) === "tutoring") {
      return <Badge variant="default">Tutoring</Badge>;
    } else {
      return <Badge variant="secondary">Writing</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>A list of recent activity logs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <Button variant="ghost">
                Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Service Detail</TableHead>
            <TableHead>
              <Button variant="ghost">
                Type
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Reference ID</TableHead>
            <TableHead className="text-right">
              <Button variant="ghost">
                Amount
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-medium">
                {log?.createdAt
                  ? formatDate(new Date(log.createdAt), "MMMM d, yyyy")
                  : ""}
              </TableCell>
              <TableCell>{log.serviceDetail}</TableCell>
              <TableCell>{getServiceTypeBadge(log.serviceType)}</TableCell>
              <TableCell>{log.referenceId}</TableCell>
              <TableCell className="text-right">
                ${log.amount.toFixed(2)}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
