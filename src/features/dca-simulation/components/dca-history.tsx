import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import { Badge } from "@/shared/components/ui/badge";

import { ScrollArea } from "@/shared/components/ui/scroll-area";

import type { DCATimelinePoint } from "../types/domain.types";
import { formatUnits, formatUsd } from "../utils/format";

interface Props {
  timeline: DCATimelinePoint[];
  symbol: string;
}

export function DCAHistoryTable({ timeline, symbol }: Props) {
  const [rows, setRows] = useState("10");

  // Hanya titik pembelian, terbaru di atas
  const purchases = timeline.filter((p) => p.bought).reverse();
  const visible = purchases.slice(0, Number(rows));

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <CardTitle>
            Purchase History
          </CardTitle>

          <CardDescription>
            Historical DCA transaction records
            and portfolio accumulation.
          </CardDescription>
        </div>

        <div className="w-[120px]">
          <Select value={rows} onValueChange={setRows}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="10">
                10 rows
              </SelectItem>

              <SelectItem value="25">
                25 rows
              </SelectItem>

              <SelectItem value="50">
                50 rows
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="w-full">
          <div className="min-w-[900px]">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead>
                    Date
                  </TableHead>

                  <TableHead>
                    {symbol} Price
                  </TableHead>

                  <TableHead>
                    USD Invested
                  </TableHead>

                  <TableHead>
                    {symbol} Bought
                  </TableHead>

                  <TableHead>
                    Total {symbol}
                  </TableHead>

                  <TableHead>
                    Portfolio Value
                  </TableHead>

                  <TableHead>
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {visible.map((item) => {
                  const profit =
                    item.portfolioValue >= item.totalInvested;

                  return (
                    <TableRow
                      key={item.timestamp}
                      className="border-border/50"
                    >
                      <TableCell className="font-medium">
                        {item.date}
                      </TableCell>

                      <TableCell>
                        {formatUsd(item.price)}
                      </TableCell>

                      <TableCell>
                        {formatUsd(item.amountInvested)}
                      </TableCell>

                      <TableCell>
                        {formatUnits(item.unitsBought)}
                      </TableCell>

                      <TableCell>
                        {formatUnits(item.totalUnits)}
                      </TableCell>

                      <TableCell className="font-semibold">
                        {formatUsd(item.portfolioValue)}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            profit
                              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                              : "border-red-500/20 bg-red-500/10 text-red-500"
                          }
                        >
                          {profit ? "Profit" : "Loss"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="mt-6 flex flex-col gap-4 border-t border-border/50 pt-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            Showing {visible.length} of {purchases.length} DCA
            purchases
          </p>

          <div className="flex items-center gap-2">
            <span>
              Historical simulation powered by
              CoinGecko API
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
