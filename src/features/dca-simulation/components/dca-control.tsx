import { useState } from "react";

import { CalendarIcon, Play } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/components/ui/card";

import { Input } from "@/shared/components/ui/input";

import { Label } from "@/shared/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";

import { Calendar } from "@/shared/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";

import { cn } from "@/lib/utils";

export function DCAControls() {
  const [startDate, setStartDate] =
    useState<Date>();

  const [endDate, setEndDate] =
    useState<Date>();

  const [advancedOpen, setAdvancedOpen] =
    useState(false);

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm mt-5">
      <CardHeader className="space-y-1">
        <CardTitle>
          Simulation Controls
        </CardTitle>

        <CardDescription>
          Configure your DCA strategy using
          historical crypto market data.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Main Controls */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {/* Coin */}
          <div className="space-y-2">
            <Label>Coin</Label>

            <Select defaultValue="bitcoin">
              <SelectTrigger>
                <SelectValue placeholder="Select coin" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="bitcoin">
                  Bitcoin (BTC)
                </SelectItem>

                <SelectItem value="ethereum">
                  Ethereum (ETH)
                </SelectItem>

                <SelectItem value="solana">
                  Solana (SOL)
                </SelectItem>

                <SelectItem value="binancecoin">
                  BNB (BNB)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Frequency */}
          <div className="space-y-2">
            <Label>DCA Frequency</Label>

            <Select defaultValue="weekly">
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="daily">
                  Daily
                </SelectItem>

                <SelectItem value="3-days">
                  Every 3 Days
                </SelectItem>

                <SelectItem value="weekly">
                  Weekly
                </SelectItem>

                <SelectItem value="monthly">
                  Monthly
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label>DCA Amount (USD)</Label>

            <Input
              type="number"
              placeholder="100"
            />
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <Label>Start Date</Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate &&
                      "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />

                  {startDate
                    ? startDate.toLocaleDateString()
                    : "Pick a date"}
                </Button>
              </PopoverTrigger>

              <PopoverContent
                align="start"
                className="w-auto p-0"
              >
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Run Button */}
          <div className="flex items-end">
            <Button className="w-full gap-2">
              <Play className="h-4 w-4" />

              Run Simulation
            </Button>
          </div>
        </div>

        {/* Advanced Options */}
        <Collapsible
          open={advancedOpen}
          onOpenChange={setAdvancedOpen}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="px-0 text-muted-foreground"
            >
              Advanced Options
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="pt-4">
            <div className="grid gap-4 md:grid-cols-3">
              {/* End Date */}
              <div className="space-y-2">
                <Label>End Date</Label>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate &&
                          "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />

                      {endDate
                        ? endDate.toLocaleDateString()
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent
                    align="start"
                    className="w-auto p-0"
                  >
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Fee */}
              <div className="space-y-2">
                <Label>Transaction Fee (%)</Label>

                <Input
                  type="number"
                  placeholder="0.1"
                />
              </div>

              {/* Initial Capital */}
              <div className="space-y-2">
                <Label>
                  Initial Capital (Optional)
                </Label>

                <Input
                  type="number"
                  placeholder="10000"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}