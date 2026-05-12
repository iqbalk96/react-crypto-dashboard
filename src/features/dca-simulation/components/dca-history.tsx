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

const purchaseHistory = [
  {
    date: "2025-05-18",
    btcPrice: "$65,049",
    invested: "$100",
    btcBought: "0.001537",
    totalBTC: "0.283152",
    portfolioValue: "$18,420",
    status: "Profit",
  },
  {
    date: "2025-05-11",
    btcPrice: "$61,302",
    invested: "$100",
    btcBought: "0.001632",
    totalBTC: "0.281615",
    portfolioValue: "$18,320",
    status: "Profit",
  },
  {
    date: "2025-05-04",
    btcPrice: "$59,127",
    invested: "$100",
    btcBought: "0.001691",
    totalBTC: "0.279983",
    portfolioValue: "$18,214",
    status: "Profit",
  },
  {
    date: "2025-04-27",
    btcPrice: "$63,556",
    invested: "$100",
    btcBought: "0.001573",
    totalBTC: "0.278292",
    portfolioValue: "$18,104",
    status: "Profit",
  },
  {
    date: "2025-04-20",
    btcPrice: "$64,821",
    invested: "$100",
    btcBought: "0.001542",
    totalBTC: "0.276719",
    portfolioValue: "$17,999",
    status: "Loss",
  },
];

export function DCAHistoryTable() {
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
          <Select defaultValue="10">
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
                    BTC Price
                  </TableHead>

                  <TableHead>
                    USD Invested
                  </TableHead>

                  <TableHead>
                    BTC Bought
                  </TableHead>

                  <TableHead>
                    Total BTC
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
                {purchaseHistory.map(
                  (item, index) => (
                    <TableRow
                      key={index}
                      className="border-border/50"
                    >
                      <TableCell className="font-medium">
                        {item.date}
                      </TableCell>

                      <TableCell>
                        {item.btcPrice}
                      </TableCell>

                      <TableCell>
                        {item.invested}
                      </TableCell>

                      <TableCell>
                        {item.btcBought}
                      </TableCell>

                      <TableCell>
                        {item.totalBTC}
                      </TableCell>

                      <TableCell className="font-semibold">
                        {
                          item.portfolioValue
                        }
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            item.status ===
                            "Profit"
                              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                              : "border-red-500/20 bg-red-500/10 text-red-500"
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="mt-6 flex flex-col gap-4 border-t border-border/50 pt-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            Showing 1–5 of 120 DCA
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