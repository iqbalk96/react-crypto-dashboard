import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import { Button } from "@/shared/components/ui/button";
import { useRecentActivity } from "../hooks/use-recent-activity";

// =====================================================
// Loading Skeleton
// =====================================================
function ActivitySkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-2xl border bg-muted/10 p-4 animate-pulse"
        >
          <div className="space-y-2">
            <div className="h-4 w-32 rounded bg-muted/30" />
            <div className="h-3 w-24 rounded bg-muted/20" />
          </div>

          <div className="space-y-2 text-right">
            <div className="h-4 w-20 rounded bg-muted/30 ml-auto" />
            <div className="h-3 w-16 rounded bg-muted/20 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}

// =====================================================
// Component
// =====================================================
export function RecentActivity() {
  const { data, isLoading } = useRecentActivity();

  return (
    <Card className="mt-5 border-border/50 bg-background/80 backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        {/* Header */}
        <div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Market Activity Feed
          </CardTitle>

          <CardDescription className="mt-1 text-sm">
            Real-time market movement interpreted from crypto price changes.
          </CardDescription>
        </div>

        <Button
          variant="outline"
          className="rounded-xl border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
        >
          Refresh
        </Button>
      </CardHeader>

      <CardContent>
        {/* Loading */}
        {isLoading ? (
          <ActivitySkeleton />
        ) : (
          <div className="space-y-4">
            {data?.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-2xl border border-transparent bg-muted/20 p-4 transition hover:border-primary/20 hover:bg-primary/[0.03]"
              >
                {/* Left */}
                <div>
                  <h3 className="font-medium">
                    {activity.action}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{activity.asset}</span>
                    <span>•</span>
                    <span>{activity.time}</span>
                  </div>
                </div>

                {/* Right */}
                <div className="text-right">
                  <h4 className="font-semibold">
                    {activity.amount}
                  </h4>

                  <p
                    className={`mt-1 text-sm font-medium ${
                      activity.status === "Positive"
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {activity.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}