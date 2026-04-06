"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Search,
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  Percent,
  DollarSign,
  BarChart3,
  Activity,
} from "lucide-react"

interface WalletMetrics {
  id: string
  address: string
  name: string
  ageMonths: number
  tradesPerDay: number
  earningsPerDay: number
  totalRoi: number
  last3mRoi: number
  maxDrawdown: number
  maxOwnSpentDay: number
  avgBetSize: number
  maxBetSize: number
  winrate: number
  expectancyPerTrade: number
}

interface CategoryBreakdown {
  category: string
  trades: number
  winrate: number
  avgSize: number
  pnl: number
}

const mockWalletMetrics: WalletMetrics[] = [
  {
    id: "1",
    address: "0x1a2b3c4d5e6f7g8h",
    name: "BTC-WINNER",
    ageMonths: 18,
    tradesPerDay: 4.2,
    earningsPerDay: 312,
    totalRoi: 142.5,
    last3mRoi: 28.3,
    maxDrawdown: -12.4,
    maxOwnSpentDay: 15000,
    avgBetSize: 1250,
    maxBetSize: 5000,
    winrate: 68.2,
    expectancyPerTrade: 74.5,
  },
  {
    id: "2",
    address: "0x5e6f7g8h9i0j1k2l",
    name: "ETH-PRICE",
    ageMonths: 24,
    tradesPerDay: 3.1,
    earningsPerDay: 245,
    totalRoi: 98.7,
    last3mRoi: 15.2,
    maxDrawdown: -18.6,
    maxOwnSpentDay: 12000,
    avgBetSize: 980,
    maxBetSize: 4200,
    winrate: 62.5,
    expectancyPerTrade: 58.3,
  },
  {
    id: "3",
    address: "0x7q8r9s0t1u2v3w4x",
    name: "AI-BOOM",
    ageMonths: 8,
    tradesPerDay: 6.8,
    earningsPerDay: 485,
    totalRoi: 215.3,
    last3mRoi: 45.8,
    maxDrawdown: -8.2,
    maxOwnSpentDay: 25000,
    avgBetSize: 2100,
    maxBetSize: 8000,
    winrate: 72.1,
    expectancyPerTrade: 112.4,
  },
  {
    id: "4",
    address: "0xi9j0k1l2m3n4o5p6",
    name: "TESLA-10K",
    ageMonths: 14,
    tradesPerDay: 5.5,
    earningsPerDay: 398,
    totalRoi: 178.9,
    last3mRoi: 32.1,
    maxDrawdown: -14.7,
    maxOwnSpentDay: 18000,
    avgBetSize: 1800,
    maxBetSize: 6500,
    winrate: 65.8,
    expectancyPerTrade: 89.2,
  },
]

const mockCategoryBreakdown: CategoryBreakdown[] = [
  { category: "Crypto", trades: 342, winrate: 71.2, avgSize: 1450, pnl: 12400 },
  { category: "Politics", trades: 156, winrate: 58.3, avgSize: 890, pnl: 3200 },
  { category: "Finance", trades: 98, winrate: 65.4, avgSize: 1120, pnl: 4800 },
  { category: "Sports", trades: 45, winrate: 62.1, avgSize: 650, pnl: 1200 },
  { category: "Entertainment", trades: 23, winrate: 54.2, avgSize: 420, pnl: 380 },
]

function MetricCard({
  icon: Icon,
  label,
  value,
  subValue,
  trend,
  variant = "default",
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  subValue?: string
  trend?: "up" | "down" | "neutral"
  variant?: "default" | "success" | "warning" | "error"
}) {
  return (
    <div className="bg-card border border-border rounded-sm px-3 py-2.5">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-1.5">
        {trend && trend !== "neutral" && (
          trend === "up" ? (
            <TrendingUp className="w-3.5 h-3.5 text-success shrink-0" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-destructive shrink-0" />
          )
        )}
        <span
          className={cn(
            "text-lg font-mono font-semibold",
            variant === "success" && "text-success",
            variant === "warning" && "text-warning",
            variant === "error" && "text-destructive",
            variant === "default" && "text-foreground"
          )}
        >
          {value}
        </span>
      </div>
      {subValue && (
        <div className="text-[10px] font-mono text-muted-foreground mt-0.5">{subValue}</div>
      )}
    </div>
  )
}

function StatRow({ label, value, variant = "default" }: { label: string; value: string; variant?: "default" | "mono" | "success" | "warning" | "muted" }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className={cn(
        "text-xs",
        variant === "mono" && "font-mono text-foreground",
        variant === "success" && "text-success font-medium",
        variant === "warning" && "text-warning font-medium",
        variant === "muted" && "text-muted-foreground",
        variant === "default" && "text-foreground"
      )}>{value}</span>
    </div>
  )
}

export default function AnalyzerPage() {
  const [selectedWalletId, setSelectedWalletId] = useState("3")
  const [searchQuery, setSearchQuery] = useState("")

  const selectedWallet = mockWalletMetrics.find((w) => w.id === selectedWalletId)

  const filteredWallets = mockWalletMetrics.filter(
    (w) =>
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto bg-background">
        <div className="p-3 lg:p-4 space-y-3 lg:space-y-4 min-h-full">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-sm font-semibold text-foreground">Wallet Analyzer</h1>
              <p className="text-[10px] text-muted-foreground">
                Performance metrics for tracked source wallets
              </p>
            </div>
          </div>

          {/* Wallet Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Search wallet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-7 h-8 w-48 text-xs"
              />
            </div>
            <Select value={selectedWalletId} onValueChange={setSelectedWalletId}>
              <SelectTrigger className="h-8 w-48 text-xs">
                <SelectValue placeholder="Select wallet" />
              </SelectTrigger>
              <SelectContent>
                {filteredWallets.map((wallet) => (
                  <SelectItem key={wallet.id} value={wallet.id} className="text-xs">
                    {wallet.name} ({wallet.address.slice(0, 8)}...)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedWallet && (
            <>
              {/* Summary Metric Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                <MetricCard
                  icon={TrendingUp}
                  label="Total ROI"
                  value={`${selectedWallet.totalRoi}%`}
                  subValue="All time"
                  trend="up"
                  variant="success"
                />
                <MetricCard
                  icon={BarChart3}
                  label="Last 3M ROI"
                  value={`${selectedWallet.last3mRoi}%`}
                  subValue="Rolling"
                  trend={selectedWallet.last3mRoi > 0 ? "up" : "down"}
                  variant={selectedWallet.last3mRoi > 0 ? "success" : "error"}
                />
                <MetricCard
                  icon={TrendingDown}
                  label="Max Drawdown"
                  value={`${selectedWallet.maxDrawdown}%`}
                  subValue="Peak to trough"
                  variant="error"
                />
                <MetricCard
                  icon={Percent}
                  label="Win Rate"
                  value={`${selectedWallet.winrate}%`}
                  subValue={`${Math.round(selectedWallet.tradesPerDay * 30 * selectedWallet.winrate / 100)}/${Math.round(selectedWallet.tradesPerDay * 30)} monthly`}
                  variant={selectedWallet.winrate > 60 ? "success" : "default"}
                />
                <MetricCard
                  icon={Activity}
                  label="Trades/Day"
                  value={selectedWallet.tradesPerDay.toString()}
                  subValue="Average"
                />
                <MetricCard
                  icon={DollarSign}
                  label="Earnings/Day"
                  value={`$${selectedWallet.earningsPerDay}`}
                  subValue="Average"
                  trend="up"
                  variant="success"
                />
              </div>

              {/* Detailed Metrics */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
                {/* Wallet Profile */}
                <div className="bg-card border border-border rounded-sm">
                  <div className="px-3 py-2 border-b border-border">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Wallet Profile</span>
                  </div>
                  <div className="p-3 space-y-0">
                    <StatRow label="Address" value={`${selectedWallet.address.slice(0, 12)}...`} variant="mono" />
                    <StatRow label="Age" value={`${selectedWallet.ageMonths} months`} />
                    <StatRow label="Total ROI" value={`${selectedWallet.totalRoi}%`} variant="success" />
                    <StatRow label="3M ROI" value={`${selectedWallet.last3mRoi}%`} variant={selectedWallet.last3mRoi > 0 ? "success" : "warning"} />
                    <StatRow label="Max Drawdown" value={`${selectedWallet.maxDrawdown}%`} variant="warning" />
                    <StatRow label="Expectancy/Trade" value={`$${selectedWallet.expectancyPerTrade}`} variant="mono" />
                  </div>
                </div>

                {/* Activity Metrics */}
                <div className="bg-card border border-border rounded-sm">
                  <div className="px-3 py-2 border-b border-border">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Activity Metrics</span>
                  </div>
                  <div className="p-3 space-y-0">
                    <StatRow label="Trades per Day" value={selectedWallet.tradesPerDay.toString()} variant="mono" />
                    <StatRow label="Earnings per Day" value={`$${selectedWallet.earningsPerDay}`} variant="success" />
                    <StatRow label="Win Rate" value={`${selectedWallet.winrate}%`} variant={selectedWallet.winrate > 60 ? "success" : "muted"} />
                    <StatRow label="Avg Bet Size" value={`$${selectedWallet.avgBetSize.toLocaleString()}`} variant="mono" />
                    <StatRow label="Max Bet Size" value={`$${selectedWallet.maxBetSize.toLocaleString()}`} variant="mono" />
                    <StatRow label="Max Spent/Day" value={`$${selectedWallet.maxOwnSpentDay.toLocaleString()}`} variant="muted" />
                  </div>
                </div>

                {/* Performance Summary */}
                <div className="bg-card border border-border rounded-sm">
                  <div className="px-3 py-2 border-b border-border">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Performance Summary</span>
                  </div>
                  <div className="p-3">
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-muted-foreground">Win Rate</span>
                          <span className="text-[10px] font-mono text-foreground">{selectedWallet.winrate}%</span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-success rounded-full"
                            style={{ width: `${selectedWallet.winrate}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-muted-foreground">ROI (of 300%)</span>
                          <span className="text-[10px] font-mono text-foreground">{selectedWallet.totalRoi}%</span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full"
                            style={{ width: `${Math.min(100, (selectedWallet.totalRoi / 300) * 100)}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-muted-foreground">Risk Score</span>
                          <span className="text-[10px] font-mono text-foreground">{Math.abs(selectedWallet.maxDrawdown)}%</span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-destructive rounded-full"
                            style={{ width: `${Math.abs(selectedWallet.maxDrawdown) * 3}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="bg-card border border-border rounded-sm">
                <div className="px-3 py-2 border-b border-border">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Category Breakdown</span>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-[10px] uppercase tracking-wider h-8">Category</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right">Trades</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right">Win Rate</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right">Avg Size</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right">PnL</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCategoryBreakdown.map((cat) => (
                      <TableRow key={cat.category}>
                        <TableCell className="py-2">
                          <span className="text-xs font-medium text-foreground">{cat.category}</span>
                        </TableCell>
                        <TableCell className="py-2 text-right">
                          <span className="text-xs font-mono text-foreground">{cat.trades}</span>
                        </TableCell>
                        <TableCell className="py-2 text-right">
                          <span className={cn(
                            "text-xs font-mono",
                            cat.winrate > 65 ? "text-success" : cat.winrate > 55 ? "text-foreground" : "text-warning"
                          )}>
                            {cat.winrate}%
                          </span>
                        </TableCell>
                        <TableCell className="py-2 text-right">
                          <span className="text-xs font-mono text-muted-foreground">${cat.avgSize}</span>
                        </TableCell>
                        <TableCell className="py-2 text-right">
                          <span className={cn(
                            "text-xs font-mono font-medium",
                            cat.pnl > 0 ? "text-success" : "text-destructive"
                          )}>
                            {cat.pnl > 0 ? "+" : ""}${cat.pnl.toLocaleString()}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Wallet Comparison Table */}
              <div className="bg-card border border-border rounded-sm">
                <div className="px-3 py-2 border-b border-border">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">All Tracked Wallets</span>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-[10px] uppercase tracking-wider h-8">Wallet</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right hidden sm:table-cell">Age</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right">ROI</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right hidden md:table-cell">3M ROI</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right">Win Rate</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right hidden sm:table-cell">Trades/Day</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right hidden md:table-cell">Drawdown</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right hidden lg:table-cell">Expectancy</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockWalletMetrics.map((wallet) => (
                      <TableRow
                        key={wallet.id}
                        className={cn("cursor-pointer", selectedWalletId === wallet.id && "bg-secondary/50")}
                        onClick={() => setSelectedWalletId(wallet.id)}
                      >
                        <TableCell className="py-2">
                          <div>
                            <span className="text-xs font-medium text-foreground">{wallet.name}</span>
                            <div className="text-[10px] font-mono text-muted-foreground">{wallet.address.slice(0, 10)}...</div>
                          </div>
                        </TableCell>
                        <TableCell className="py-2 text-right hidden sm:table-cell">
                          <span className="text-xs text-muted-foreground">{wallet.ageMonths}m</span>
                        </TableCell>
                        <TableCell className="py-2 text-right">
                          <span className={cn("text-xs font-mono font-medium", wallet.totalRoi > 100 ? "text-success" : "text-foreground")}>
                            {wallet.totalRoi}%
                          </span>
                        </TableCell>
                        <TableCell className="py-2 text-right hidden md:table-cell">
                          <span className={cn("text-xs font-mono", wallet.last3mRoi > 0 ? "text-success" : "text-destructive")}>
                            {wallet.last3mRoi > 0 ? "+" : ""}{wallet.last3mRoi}%
                          </span>
                        </TableCell>
                        <TableCell className="py-2 text-right">
                          <span className={cn("text-xs font-mono", wallet.winrate > 65 ? "text-success" : "text-foreground")}>
                            {wallet.winrate}%
                          </span>
                        </TableCell>
                        <TableCell className="py-2 text-right hidden sm:table-cell">
                          <span className="text-xs font-mono text-muted-foreground">{wallet.tradesPerDay}</span>
                        </TableCell>
                        <TableCell className="py-2 text-right hidden md:table-cell">
                          <span className="text-xs font-mono text-warning">{wallet.maxDrawdown}%</span>
                        </TableCell>
                        <TableCell className="py-2 text-right hidden lg:table-cell">
                          <span className="text-xs font-mono text-foreground">${wallet.expectancyPerTrade}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
