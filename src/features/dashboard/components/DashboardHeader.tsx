import { CalendarDays } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/components/ui/card";

import { Button } from "@/shared/components/ui/button";

type DashboardHeaderProps = {
  title?: string;
  subtitle?: string;
};

const timeRanges = ["1D", "7D", "30D", "90D", "1Y"];

export default function DashboardHeader({
  title = "Dashboard",
  subtitle = "Track crypto market trends and portfolio analytics in real time.",
}: DashboardHeaderProps) {
  return (
    <Card className="mt-5 border-border/50 bg-background/80 backdrop-blur-xl">
      <CardHeader className="gap-6 lg:flex lg:items-center lg:justify-between">
        {/* Left Content */}
        <div className="space-y-2">
          <CardTitle className="text-3xl font-bold tracking-tight">
            {title}
          </CardTitle>

          <CardDescription className="max-w-2xl text-sm">
            {subtitle}
          </CardDescription>
        </div>

        {/* Right Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Filter */}
          <Button
            variant="outline"
            className="h-11 rounded-2xl border-border/50 bg-background/50 px-4 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <CalendarDays className="size-4" />
            <span>May 8, 2026</span>
          </Button>

          {/* Currency */}
          <Button
            variant="outline"
            className="h-11 rounded-2xl border-border/50 bg-background/50 px-4 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            USD
          </Button>

          {/* Time Range */}
          <div className="flex items-center rounded-2xl border border-border/50 bg-background/50 p-1">
            {timeRanges.map((range, index) => (
              <Button
                key={range}
                variant={index === 0 ? "default" : "ghost"}
                size="sm"
                className={`rounded-xl px-4 ${
                  index === 0
                    ? "shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent />
    </Card>
  );
}