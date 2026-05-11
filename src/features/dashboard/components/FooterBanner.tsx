import {
  Card,
  CardContent,
} from "@/shared/components/ui/card";

import { Button } from "@/shared/components/ui/button";

import { Badge } from "@/shared/components/ui/badge";

export default function FooterBanner() {
  return (
    <Card className="mt-5 border-border/50 bg-background/80 backdrop-blur-xl">
      <CardContent className="p-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Content */}
          <div className="max-w-2xl">
            <Badge
              variant="outline"
              className="mb-4 inline-flex items-center gap-2 rounded-2xl border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
            >
              🚀 AI Market Insight
            </Badge>

            <h2 className="text-3xl font-bold tracking-tight">
              Crypto market sentiment is turning bullish this week.
            </h2>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              Bitcoin and Ethereum continue showing strong momentum with
              increasing institutional inflows and positive on-chain
              activity. Monitor your portfolio closely and stay ahead of
              market trends.
            </p>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                "BTC Bullish",
                "ETH Momentum",
                "AI Analytics",
                "Portfolio Growth",
              ].map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-xl border border-border/50 bg-muted/20 px-4 py-2 text-sm font-normal text-muted-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Right CTA */}
          <div className="flex flex-col gap-4">
            <Button className="rounded-2xl px-6 py-6 text-sm font-semibold">
              View Full Analytics
            </Button>

            <Button
              variant="outline"
              className="rounded-2xl border-border/50 bg-muted/20 px-6 py-6 text-sm font-semibold text-muted-foreground hover:bg-muted/40 hover:text-foreground"
            >
              Explore Market Trends
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}