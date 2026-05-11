import {
  Card,
  CardContent,
} from "@/shared/components/ui/card";

type StatsCard = {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  icon: string;
};

const stats: StatsCard[] = [
  {
    title: "Total Portfolio",
    value: "$32,543.25",
    change: "+8.75%",
    positive: true,
    icon: "💼",
  },
  {
    title: "24h Profit / Loss",
    value: "+$2,643.12",
    change: "+4.25%",
    positive: true,
    icon: "📈",
  },
  {
    title: "Active Assets",
    value: "18",
    change: "+2 New",
    positive: true,
    icon: "🪙",
  },
  {
    title: "Market Sentiment",
    value: "72",
    change: "Greed",
    positive: true,
    icon: "🚀",
  },
];

export default function DashboardStatsGrid() {
  return (
    <section className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <Card
          key={item.title}
          className="group relative overflow-hidden border-border/50 bg-background/80 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/5"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

          <CardContent className="relative p-6">
            {/* Top */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {item.title}
                </p>

                <h3 className="mt-4 text-3xl font-bold tracking-tight">
                  {item.value}
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-2xl shadow-lg shadow-primary/20">
                {item.icon}
              </div>
            </div>

            {/* Bottom */}
            <div className="mt-8 flex items-center justify-between">
              <div
                className={`text-sm font-medium ${
                  item.positive
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {item.change}
              </div>

              {/* Fake Mini Chart */}
              <div className="flex items-end gap-1">
                {[12, 18, 10, 26, 16, 30, 22].map((height, index) => (
                  <div
                    key={index}
                    className="w-1 rounded-full bg-gradient-to-t from-primary to-fuchsia-400"
                    style={{ height }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}