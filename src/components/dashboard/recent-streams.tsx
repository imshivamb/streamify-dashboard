"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { fetchRecentStreams } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export function RecentStreamsTable() {
  const { recentStreams, setRecentStreams } = useStore((state) => ({
    recentStreams: state.recentStreams,
    setRecentStreams: state.setRecentStreams,
  }));

  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    setIsLoading(true);
    fetchRecentStreams().then((streams) => {
      setRecentStreams(streams);
      setIsLoading(false);
    });
  }, [setRecentStreams]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredStreams = recentStreams.filter(
    (stream) =>
      stream.songName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stream.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stream.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStreams = [...filteredStreams].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn as keyof typeof a];
    const bValue = b[sortColumn as keyof typeof b];
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedStreams = sortedStreams.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedStreams.length / itemsPerPage);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Streams</CardTitle>
        <CardDescription>
          All the recent stream data. Click on individual table headers to sort
          them in asc or desc order.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search by song, artist, or user ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                onClick={() => handleSort("songName")}
                className="cursor-pointer flex items-center font-bold"
              >
                Song Name <ArrowUpDown className="ml-1 h-4 w-4" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("artist")}
                className="cursor-pointer  font-bold"
              >
                Artist
              </TableHead>
              <TableHead
                onClick={() => handleSort("dateStreamed")}
                className="cursor-pointer flex items-center font-bold"
              >
                Date Streamed <ArrowUpDown className="ml-1 h-4 w-4" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("streamCount")}
                className="cursor-pointer font-bold"
              >
                Stream Count
              </TableHead>
              <TableHead
                onClick={() => handleSort("userId")}
                className="cursor-pointer flex items-center font-bold"
              >
                User ID <ArrowUpDown className="ml-1 h-4 w-4" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: itemsPerPage }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 5 }).map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : paginatedStreams.map((stream, index) => (
                  <TableRow key={index}>
                    <TableCell>{stream.songName}</TableCell>
                    <TableCell>{stream.artist}</TableCell>
                    <TableCell>
                      {new Date(stream.dateStreamed).toLocaleString()}
                    </TableCell>
                    <TableCell>{stream.streamCount}</TableCell>
                    <TableCell>{stream.userId}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end gap-5 mt-4">
          <Button
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 " />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
