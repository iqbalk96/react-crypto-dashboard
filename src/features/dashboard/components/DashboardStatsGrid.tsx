import {
  Card,
  CardContent,
} from "@/shared/components/ui/card";

import { useGlobalMarket } from "../derived/use-global-market";

export default function DashboardStatsGrid() {
  const { stats, isLoading, isFetching } = useGlobalMarket();

  const showSkeleton = isLoading;
  const showRefreshing = isFetching && !isLoading;

  return (
    <section className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      
      {/* optional subtle refresh indicator */}
      {showRefreshing && (
        <div className="col-span-full text-xs text-muted-foreground">
          Updating market data...
        </div>
      )}

      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            className="group relative overflow-hidden border-border/50 bg-background/80 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/5"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <CardContent className="relative p-6">
              
              {/* TOP */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {item.title}
                  </p>

                  <h3 className="mt-4 text-3xl font-bold tracking-tight">
                    {showSkeleton ? (
                      <div className="h-8 w-24 animate-pulse rounded bg-muted" />
                    ) : (
                      item.value
                    )}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-lg shadow-primary/10">
                  <Icon className="h-6 w-6" />
                </div>
              </div>

              {/* BOTTOM */}
              <div className="mt-8 flex items-center justify-between">
                
                <div className="text-sm font-medium text-muted-foreground">
                  {showSkeleton ? (
                    <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                  ) : (
                    item.change
                  )}
                </div>

                {/* Mini chart */}
                <div className="flex items-end gap-1">
                  {[12, 18, 10, 26, 16, 30, 22].map(
                    (height, index) => (
                      <div
                        key={index}
                        className={`w-1 rounded-full bg-gradient-to-t from-primary to-fuchsia-400 transition-opacity ${
                          showSkeleton ? "opacity-20" : "opacity-100"
                        }`}
                        style={{ height }}
                      />
                    )
                  )}
                </div>
              </div>

            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}