"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"

interface OpenPosition {
  id: string
  followerAccount: string
  market: string
  outcome: "YES" | "NO"
  side: "buy" | "sell"
  size: string
  entryPrice: string
  currentPrice: string
  exposure: string
  unrealizedPnl: string
  pnlPositive: boolean
}

interface TradeHistory {
  id: string
  timestamp: string
  sourceWallet: string
  followerAccount: string
  market: string
  action: "BUY" | "SELL"
  orderSize: string
  executionPrice: string
  status: "filled" | "skipped" | "failed" | "pending"
  failureReason?: string
  skipReason?: string
}

const mockOpenPositions: OpenPosition[] = [
  {
    id: "1",
    followerAccount: "0xf1e2d3c4",
    market: "BTC > 100K by Dec",
    outcome: "YES",
    side: "buy",
    size: "1,200",
    entryPrice: "0.62",
    currentPrice: "0.68",
    exposure: "$816",
    unrealizedPnl: "+$72",
    pnlPositive: true,
  },
  {
    id: "2",
    followerAccount: "0xf1e2d3c4",
    market: "BTC > 120K by Dec",
    outcome: "NO",
    side: "buy",
    size: "800",
    entryPrice: "0.78",
    currentPrice: "0.82",
    exposure: "$656",
    unrealizedPnl: "-$32",
    pnlPositive: false,
  },
  {
    id: "3",
    followerAccount: "0xa9b8c7d6",
    market: "ETH > 5K by Q2",
    outcome: "YES",
    side: "buy",
    size: "2,000",
    entryPrice: "0.45",
    currentPrice: "0.52",
    exposure: "$1,040",
    unrealizedPnl: "+$140",
    pnlPositive: true,
  },
  {
    id: "4",
    followerAccount: "0xn0o9p8q7",
    market: "AI Chip Boom",
    outcome: "YES",
    side: "buy",
    size: "4,000",
    entryPrice: "0.72",
    currentPrice: "0.85",
    exposure: "$3,400",
    unrealizedPnl: "+$520",
    pnlPositive: true,
  },
  {
    id: "5",
    followerAccount: "0xn0o9p8q7",
    market: "NVDA > 150",
    outcome: "YES",
    side: "buy",
    size: "3,000",
    entryPrice: "0.68",
    currentPrice: "0.74",
    exposure: "$2,220",
    unrealizedPnl: "+$180",
    pnlPositive: true,
  },
  {
    id: "6",
    followerAccount: "0xj4k3l2m1",
    market: "Ukraine War End",
    outcome: "NO",
    side: "buy",
    size: "1,500",
    entryPrice: "0.35",
    currentPrice: "0.32",
    exposure: "$480",
    unrealizedPnl: "+$45",
    pnlPositive: true,
  },
  {
    id: "7",
    followerAccount: "0xw1x0y9z8",
    market: "TSLA > 300",
    outcome: "YES",
    side: "buy",
    size: "6,000",
    entryPrice: "0.58",
    currentPrice: "0.69",
    exposure: "$4,140",
    unrealizedPnl: "+$660",
    pnlPositive: true,
  },
]

const mockTradeHistory: TradeHistory[] = [
  {
    id: "1",
    timestamp: "2024-01-15 14:55:23",
    sourceWallet: "0x1a2b3c4d",
    followerAccount: "0xf1e2d3c4",
    market: "BTC > 100K",
    action: "BUY",
    orderSize: "500",
    executionPrice: "0.65",
    status: "filled",
  },
  {
    id: "2",
    timestamp: "2024-01-15 14:52:45",
    sourceWallet: "0x7q8r9s0t",
    followerAccount: "0xn0o9p8q7",
    market: "AI Chip Boom",
    action: "BUY",
    orderSize: "2,000",
    executionPrice: "0.84",
    status: "filled",
  },
  {
    id: "3",
    timestamp: "2024-01-15 14:50:18",
    sourceWallet: "0x1a2b3c4d",
    followerAccount: "0xf1e2d3c4",
    market: "BTC > 100K",
    action: "BUY",
    orderSize: "400",
    executionPrice: "0.64",
    status: "skipped",
    skipReason: "Price deviation exceeded 2.5%",
  },
  {
    id: "4",
    timestamp: "2024-01-15 14:48:33",
    sourceWallet: "0x5e6f7g8h",
    followerAccount: "0xa9b8c7d6",
    market: "ETH > 5K",
    action: "BUY",
    orderSize: "1,000",
    executionPrice: "0.51",
    status: "filled",
  },
  {
    id: "5",
    timestamp: "2024-01-15 14:45:12",
    sourceWallet: "0x9i0j1k2l",
    followerAccount: "0xn6o5p4q3",
    market: "Trump wins",
    action: "BUY",
    orderSize: "250",
    executionPrice: "0.52",
    status: "filled",
  },
  {
    id: "6",
    timestamp: "2024-01-15 14:42:55",
    sourceWallet: "0x9i0j1k2l",
    followerAccount: "0xn6o5p4q3",
    market: "Trump wins",
    action: "BUY",
    orderSize: "250",
    executionPrice: "0.54",
    status: "skipped",
    skipReason: "Max position reached",
  },
  {
    id: "7",
    timestamp: "2024-01-15 14:40:22",
    sourceWallet: "0xi9j0k1l2",
    followerAccount: "0xw1x0y9z8",
    market: "TSLA > 350",
    action: "BUY",
    orderSize: "3,000",
    executionPrice: "0.37",
    status: "filled",
  },
  {
    id: "8",
    timestamp: "2024-01-15 14:38:11",
    sourceWallet: "0xi9j0k1l2",
    followerAccount: "0xw1x0y9z8",
    market: "TSLA > 300",
    action: "BUY",
    orderSize: "3,000",
    executionPrice: "0.67",
    status: "filled",
  },
  {
    id: "9",
    timestamp: "2024-01-15 14:35:45",
    sourceWallet: "0xe5f6g7h8",
    followerAccount: "0xj4k3l2m1",
    market: "Ukraine NO",
    action: "BUY",
    orderSize: "1,500",
    executionPrice: "0.33",
    status: "filled",
  },
  {
    id: "10",
    timestamp: "2024-01-15 14:32:18",
    sourceWallet: "0x3m4n5o6p",
    followerAccount: "0xa3b2c1d0",
    market: "Fed Rate Cut",
    action: "SELL",
    orderSize: "750",
    executionPrice: "0.72",
    status: "failed",
    failureReason: "Insufficient liquidity",
  },
  {
    id: "11",
    timestamp: "2024-01-15 14:28:55",
    sourceWallet: "0x5e6f7g8h",
    followerAccount: "0xa9b8c7d6",
    market: "ETH > 5K",
    action: "BUY",
    orderSize: "1,000",
    executionPrice: "0.49",
    status: "filled",
  },
  {
    id: "12",
    timestamp: "2024-01-15 14:25:33",
    sourceWallet: "0x7q8r9s0t",
    followerAccount: "0xn0o9p8q7",
    market: "AI Chip Boom",
    action: "BUY",
    orderSize: "2,000",
    executionPrice: "0.82",
    status: "filled",
  },
]

export default function TradesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sideFilter, setSideFilter] = useState<string>("all")
  const [walletFilter, setWalletFilter] = useState<string>("all")
  const [closePositionDialog, setClosePositionDialog] = useState<OpenPosition | null>(null)

  const filteredHistory = mockTradeHistory.filter((trade) => {
    const matchesSearch =
      trade.market.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trade.sourceWallet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trade.followerAccount.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || trade.status === statusFilter
    const matchesSide = sideFilter === "all" || trade.action.toLowerCase() === sideFilter
    return matchesSearch && matchesStatus && matchesSide
  })

  const totalExposure = mockOpenPositions.reduce((acc, pos) => {
    const value = parseFloat(pos.exposure.replace("$", "").replace(",", ""))
    return acc + value
  }, 0)

  const totalUnrealizedPnl = mockOpenPositions.reduce((acc, pos) => {
    const value = parseFloat(pos.unrealizedPnl.replace("$", "").replace(",", "").replace("+", ""))
    return acc + value
  }, 0)

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto bg-background">
        <div className="p-3 lg:p-4 space-y-3 lg:space-y-4 min-h-full">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-sm font-semibold text-foreground">Trades</h1>
              <p className="text-[10px] text-muted-foreground">
                Open positions and trade history
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="bg-card border border-border rounded-sm px-3 py-2.5">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Open Positions</div>
              <div className="text-lg font-mono font-semibold text-foreground">{mockOpenPositions.length}</div>
            </div>
            <div className="bg-card border border-border rounded-sm px-3 py-2.5">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Total Exposure</div>
              <div className="text-lg font-mono font-semibold text-foreground">${totalExposure.toLocaleString()}</div>
            </div>
            <div className="bg-card border border-border rounded-sm px-3 py-2.5">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Unrealized PnL</div>
              <div className={cn("text-lg font-mono font-semibold", totalUnrealizedPnl >= 0 ? "text-success" : "text-destructive")}>
                {totalUnrealizedPnl >= 0 ? "+" : ""}${totalUnrealizedPnl.toLocaleString()}
              </div>
            </div>
            <div className="bg-card border border-border rounded-sm px-3 py-2.5">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Today Trades</div>
              <div className="text-lg font-mono font-semibold text-foreground">{mockTradeHistory.length}</div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="positions" className="space-y-3">
            <TabsList className="h-8">
              <TabsTrigger value="positions" className="text-xs h-7">Open Positions</TabsTrigger>
              <TabsTrigger value="history" className="text-xs h-7">Trade History</TabsTrigger>
            </TabsList>

            {/* Open Positions Tab */}
            <TabsContent value="positions" className="mt-0">
              <div className="bg-card border border-border rounded-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-[10px] uppercase tracking-wider h-8">Follower</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8">Market</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8">Outcome</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right">Size</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right hidden sm:table-cell">Entry</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right hidden sm:table-cell">Current</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right hidden md:table-cell">Exposure</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right">PnL</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOpenPositions.map((position) => (
                      <TableRow key={position.id}>
                        <TableCell className="py-2">
                          <span className="text-[10px] font-mono text-muted-foreground">{position.followerAccount}...</span>
                        </TableCell>
                        <TableCell className="py-2">
                          <span className="text-xs font-medium text-foreground">{position.market}</span>
                        </TableCell>
                        <TableCell className="py-2">
                          <span className={cn(
                            "text-[9px] uppercase px-1.5 py-0.5 rounded-sm font-medium",
                            position.outcome === "YES" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                          )}>
                            {position.outcome}
                          </span>
                        </TableCell>
                        <TableCell className="py-2 text-right">
                          <span className="text-xs font-mono text-foreground">{position.size}</span>
                        </TableCell>
                        <TableCell className="py-2 text-right hidden sm:table-cell">
                          <span className="text-xs font-mono text-muted-foreground">{position.entryPrice}</span>
                        </TableCell>
                        <TableCell className="py-2 text-right hidden sm:table-cell">
                          <span className="text-xs font-mono text-foreground">{position.currentPrice}</span>
                        </TableCell>
                        <TableCell className="py-2 text-right hidden md:table-cell">
                          <span className="text-xs font-mono text-foreground">{position.exposure}</span>
                        </TableCell>
                        <TableCell className="py-2 text-right">
                          <span className={cn("text-xs font-mono font-medium", position.pnlPositive ? "text-success" : "text-destructive")}>
                            {position.unrealizedPnl}
                          </span>
                        </TableCell>
                        <TableCell className="py-2 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
                            onClick={() => setClosePositionDialog(position)}
                          >
                            <X className="w-3.5 h-3.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Trade History Tab */}
            <TabsContent value="history" className="mt-0 space-y-3">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search market..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-7 h-8 w-40 text-xs"
                  />
                </div>
                <Select value={walletFilter} onValueChange={setWalletFilter}>
                  <SelectTrigger className="h-8 w-32 text-xs">
                    <SelectValue placeholder="Wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="text-xs">All Wallets</SelectItem>
                    <SelectItem value="0x1a2b3c4d" className="text-xs">0x1a2b...3c4d</SelectItem>
                    <SelectItem value="0x5e6f7g8h" className="text-xs">0x5e6f...7g8h</SelectItem>
                    <SelectItem value="0x7q8r9s0t" className="text-xs">0x7q8r...9s0t</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-8 w-28 text-xs">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="text-xs">All Status</SelectItem>
                    <SelectItem value="filled" className="text-xs">Filled</SelectItem>
                    <SelectItem value="skipped" className="text-xs">Skipped</SelectItem>
                    <SelectItem value="failed" className="text-xs">Failed</SelectItem>
                    <SelectItem value="pending" className="text-xs">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sideFilter} onValueChange={setSideFilter}>
                  <SelectTrigger className="h-8 w-24 text-xs">
                    <SelectValue placeholder="Side" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="text-xs">All</SelectItem>
                    <SelectItem value="buy" className="text-xs">Buy</SelectItem>
                    <SelectItem value="sell" className="text-xs">Sell</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Trade History Table */}
              <div className="bg-card border border-border rounded-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-[10px] uppercase tracking-wider h-8">Time</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8 hidden lg:table-cell">Source</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8 hidden md:table-cell">Follower</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8">Market</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8">Action</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right hidden sm:table-cell">Size</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right hidden sm:table-cell">Price</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8">Status</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider h-8 hidden lg:table-cell">Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHistory.map((trade) => (
                      <TableRow key={trade.id}>
                        <TableCell className="py-2">
                          <span className="text-[10px] font-mono text-muted-foreground">{trade.timestamp.split(" ")[1]}</span>
                        </TableCell>
                        <TableCell className="py-2 hidden lg:table-cell">
                          <span className="text-[10px] font-mono text-muted-foreground">{trade.sourceWallet}...</span>
                        </TableCell>
                        <TableCell className="py-2 hidden md:table-cell">
                          <span className="text-[10px] font-mono text-muted-foreground">{trade.followerAccount}...</span>
                        </TableCell>
                        <TableCell className="py-2">
                          <span className="text-xs font-medium text-foreground">{trade.market}</span>
                        </TableCell>
                        <TableCell className="py-2">
                          <span className={cn(
                            "text-[10px] font-medium",
                            trade.action === "BUY" ? "text-success" : "text-destructive"
                          )}>
                            {trade.action}
                          </span>
                        </TableCell>
                        <TableCell className="py-2 text-right hidden sm:table-cell">
                          <span className="text-xs font-mono text-foreground">{trade.orderSize}</span>
                        </TableCell>
                        <TableCell className="py-2 text-right hidden sm:table-cell">
                          <span className="text-xs font-mono text-muted-foreground">{trade.executionPrice}</span>
                        </TableCell>
                        <TableCell className="py-2">
                          <span className={cn(
                            "text-[9px] uppercase px-1.5 py-0.5 rounded-sm font-medium",
                            trade.status === "filled" && "bg-success/20 text-success",
                            trade.status === "skipped" && "bg-warning/20 text-warning",
                            trade.status === "failed" && "bg-destructive/20 text-destructive",
                            trade.status === "pending" && "bg-muted text-muted-foreground"
                          )}>
                            {trade.status}
                          </span>
                        </TableCell>
                        <TableCell className="py-2 hidden lg:table-cell">
                          <span className="text-[10px] text-muted-foreground truncate max-w-[200px] block">
                            {trade.failureReason || trade.skipReason || "--"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">
                  Showing {filteredHistory.length} of {mockTradeHistory.length} trades
                </span>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                    1
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                    2
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                    3
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Close Position Confirmation Dialog */}
      <Dialog open={!!closePositionDialog} onOpenChange={(open) => !open && setClosePositionDialog(null)}>
        <DialogContent className="sm:max-w-[360px] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold">Close this position manually?</DialogTitle>
          </DialogHeader>
          {closePositionDialog && (
            <div className="space-y-2 py-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Market</span>
                <span className="font-medium text-foreground">{closePositionDialog.market}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Outcome</span>
                <span className={cn(
                  "text-[10px] uppercase px-1.5 py-0.5 rounded-sm font-medium",
                  closePositionDialog.outcome === "YES" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                )}>
                  {closePositionDialog.outcome}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Size</span>
                <span className="font-mono text-foreground">{closePositionDialog.size}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Follower</span>
                <span className="font-mono text-muted-foreground">{closePositionDialog.followerAccount}...</span>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => setClosePositionDialog(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="text-xs"
              onClick={() => setClosePositionDialog(null)}
            >
              Close Position
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
