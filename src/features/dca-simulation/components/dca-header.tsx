import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";

import {
  Download,
  Sparkles,
} from "lucide-react";

export function DCAHeader() {
  return (
    <div className="space-y-6 mt-5">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              DCA Simulation
            </h1>

            <Badge
              variant="secondary"
              className="border-border/50 bg-primary/10 text-primary"
            >
              Beta
            </Badge>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
              Simulate historical Dollar Cost Averaging
              strategy performance using real crypto
              market data from CoinGecko.
            </p>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />

              <span>
                Historical analytics powered by
                CoinGecko API
              </span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="gap-2"
          >
            <Download className="h-4 w-4" />

            Export CSV
          </Button>
        </div>
      </div>

      <Separator className="bg-border/50" />
    </div>
  );
}