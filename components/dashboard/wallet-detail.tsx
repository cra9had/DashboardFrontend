"use client"

import { cn } from "@/lib/utils"
import type { WalletPair } from "./wallet-tabs"
import { ArrowUpRight, ArrowDownRight, AlertCircle, CheckCircle2, Clock } from "lucide-react"

interface WalletDetailProps {
  wallet: WalletPair | null
}

interface StatRowProps {
  label: string
  value: string
  variant?: "default" | "mono" | "success" | "warning" | "muted"
}

function StatRow({ label, value, variant = "default" }: StatRowProps) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span
        className={cn(
          "text-xs",
          variant === "mono" && "font-mono text-foreground",
          variant === "success" && "text-success font-medium",
          variant === "warning" && "text-warning font-medium",
          variant === "muted" && "text-muted-foreground",
          variant === "default" && "text-foreground"
        )}
      >
        {value}
      </span>
    </div>
  )
}

interface Position {
  market: string
  side: "YES" | "NO"
  size: string
  entry: string
  current: string
  pnl: string
  pnlPositive: boolean
}

interface Trade {
  time: string
  action: "BUY" | "SELL"
  market: string
  size: string
  price: string
  status: "filled" | "skipped" | "pending"
  note?: string
}

const walletData: Record<string, {
  sourceWallet: string
  followerAccount: string
  fixedOrderSize: string
  maxPositionSize: string
  maxPriceDeviation: string
  positions: Position[]
  recentTrades: Trade[]
}> = {
  "1": {
    sourceWallet: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p",
    followerAccount: "0xf1e2d3c4b5a6978695847362514",
    fixedOrderSize: "500 USDC",
    maxPositionSize: "5,000 USDC",
    maxPriceDeviation: "2.5%",
    positions: [
      { market: "BTC > 100K by Dec", side: "YES", size: "1,200", entry: "0.62", current: "0.68", pnl: "+$72", pnlPositive: true },
      { market: "BTC > 120K by Dec", side: "NO", size: "800", entry: "0.78", current: "0.82", pnl: "-$32", pnlPositive: false },
    ],
    recentTrades: [
      { time: "14:32", action: "BUY", market: "BTC > 100K", size: "500", price: "0.65", status: "filled" },
      { time: "14:28", action: "BUY", market: "BTC > 100K", size: "400", price: "0.64", status: "skipped", note: "Price deviation exceeded 2.5%" },
      { time: "14:15", action: "SELL", market: "BTC > 90K", size: "600", price: "0.89", status: "filled" },
    ]
  },
  "2": {
    sourceWallet: "0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r",
    followerAccount: "0xa9b8c7d6e5f4g3h2i1j0k9l8m7",
    fixedOrderSize: "1,000 USDC",
    maxPositionSize: "10,000 USDC",
    maxPriceDeviation: "1.5%",
    positions: [
      { market: "ETH > 5K by Q2", side: "YES", size: "2,000", entry: "0.45", current: "0.52", pnl: "+$140", pnlPositive: true },
    ],
    recentTrades: [
      { time: "14:45", action: "BUY", market: "ETH > 5K", size: "1,000", price: "0.51", status: "filled" },
      { time: "14:30", action: "BUY", market: "ETH > 5K", size: "1,000", price: "0.49", status: "filled" },
    ]
  },
  "3": {
    sourceWallet: "0x9i0j1k2l3m4n5o6p7q8r9s0t1u2v",
    followerAccount: "0xn6o5p4q3r2s1t0u9v8w7x6y5z4",
    fixedOrderSize: "250 USDC",
    maxPositionSize: "2,500 USDC",
    maxPriceDeviation: "3.0%",
    positions: [
      { market: "Trump wins 2024", side: "YES", size: "800", entry: "0.55", current: "0.48", pnl: "-$56", pnlPositive: false },
    ],
    recentTrades: [
      { time: "13:55", action: "BUY", market: "Trump wins", size: "250", price: "0.52", status: "filled" },
      { time: "13:40", action: "BUY", market: "Trump wins", size: "250", price: "0.54", status: "skipped", note: "Max position reached" },
    ]
  },
  "4": {
    sourceWallet: "0x3m4n5o6p7q8r9s0t1u2v3w4x5y6z",
    followerAccount: "0xa3b2c1d0e9f8g7h6i5j4k3l2m1",
    fixedOrderSize: "750 USDC",
    maxPositionSize: "7,500 USDC",
    maxPriceDeviation: "2.0%",
    positions: [],
    recentTrades: [
      { time: "12:00", action: "SELL", market: "Fed Rate Cut", size: "750", price: "0.72", status: "filled" },
    ]
  },
  "5": {
    sourceWallet: "0x7q8r9s0t1u2v3w4x5y6z7a8b9c0d",
    followerAccount: "0xn0o9p8q7r6s5t4u3v2w1x0y9z8",
    fixedOrderSize: "2,000 USDC",
    maxPositionSize: "20,000 USDC",
    maxPriceDeviation: "1.0%",
    positions: [
      { market: "AI Chip Boom", side: "YES", size: "4,000", entry: "0.72", current: "0.85", pnl: "+$520", pnlPositive: true },
      { market: "NVDA > 150", side: "YES", size: "3,000", entry: "0.68", current: "0.74", pnl: "+$180", pnlPositive: true },
    ],
    recentTrades: [
      { time: "14:50", action: "BUY", market: "AI Chip Boom", size: "2,000", price: "0.84", status: "pending" },
      { time: "14:35", action: "BUY", market: "AI Chip Boom", size: "2,000", price: "0.82", status: "filled" },
    ]
  },
  "6": {
    sourceWallet: "0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4",
    followerAccount: "0xw7x6y5z4a3b2c1d0e9f8g7h6i5",
    fixedOrderSize: "100 USDC",
    maxPositionSize: "1,000 USDC",
    maxPriceDeviation: "5.0%",
    positions: [],
    recentTrades: []
  },
  "7": {
    sourceWallet: "0xe5f6g7h8i9j0k1l2m3n4o5p6q7r8",
    followerAccount: "0xj4k3l2m1n0o9p8q7r6s5t4u3v2",
    fixedOrderSize: "1,500 USDC",
    maxPositionSize: "15,000 USDC",
    maxPriceDeviation: "2.0%",
    positions: [
      { market: "Ukraine War End", side: "NO", size: "1,500", entry: "0.35", current: "0.32", pnl: "+$45", pnlPositive: true },
    ],
    recentTrades: [
      { time: "14:20", action: "BUY", market: "Ukraine NO", size: "1,500", price: "0.33", status: "filled" },
    ]
  },
  "8": {
    sourceWallet: "0xi9j0k1l2m3n4o5p6q7r8s9t0u1v2",
    followerAccount: "0xw1x0y9z8a7b6c5d4e3f2g1h0i9",
    fixedOrderSize: "3,000 USDC",
    maxPositionSize: "30,000 USDC",
    maxPriceDeviation: "1.5%",
    positions: [
      { market: "TSLA > 300", side: "YES", size: "6,000", entry: "0.58", current: "0.69", pnl: "+$660", pnlPositive: true },
      { market: "TSLA > 350", side: "YES", size: "3,000", entry: "0.32", current: "0.38", pnl: "+$180", pnlPositive: true },
    ],
    recentTrades: [
      { time: "14:55", action: "BUY", market: "TSLA > 350", size: "3,000", price: "0.37", status: "filled" },
      { time: "14:40", action: "BUY", market: "TSLA > 300", size: "3,000", price: "0.67", status: "filled" },
    ]
  },
}

export function WalletDetail({ wallet }: WalletDetailProps) {
  if (!wallet) {
    return (
      <div className="bg-card border border-border rounded-sm h-full flex items-center justify-center">
        <span className="text-xs text-muted-foreground">Select a wallet</span>
      </div>
    )
  }

  const data = walletData[wallet.id] || walletData["1"]

  return (
    <div className="bg-card border-x border-b border-border rounded-b-sm h-full flex flex-col overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 flex-1 overflow-hidden">
        {/* Left Column: Config + Risk */}
        <div className="border-r border-border p-3 overflow-auto">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Configuration</div>
          <div className="space-y-0 mb-4">
            <StatRow label="Source" value={data.sourceWallet.slice(0, 10) + "..."} variant="mono" />
            <StatRow label="Follower" value={data.followerAccount.slice(0, 10) + "..."} variant="mono" />
            <StatRow label="Order Size" value={data.fixedOrderSize} />
            <StatRow label="Max Position" value={data.maxPositionSize} />
            <StatRow label="Max Deviation" value={data.maxPriceDeviation} variant="warning" />
          </div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Status</div>
          <div className="space-y-0">
            <StatRow 
              label="State" 
              value={wallet.enabled ? "Active" : "Paused"} 
              variant={wallet.enabled ? "success" : "muted"} 
            />
            <StatRow label="Last Sync" value="2s ago" variant="muted" />
          </div>
        </div>

        {/* Middle Column: Positions */}
        <div className="border-r border-border p-3 overflow-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Open Positions
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">
              {data.positions.length}
            </span>
          </div>
          {data.positions.length === 0 ? (
            <div className="text-xs text-muted-foreground py-4 text-center">No open positions</div>
          ) : (
            <div className="space-y-2">
              {data.positions.map((pos, i) => (
                <div key={i} className="bg-secondary/30 rounded-sm p-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-foreground truncate flex-1">{pos.market}</span>
                    <span
                      className={cn(
                        "text-[9px] uppercase px-1.5 py-0.5 rounded-sm font-medium ml-2",
                        pos.side === "YES" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                      )}
                    >
                      {pos.side}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-[10px]">
                    <div>
                      <div className="text-muted-foreground">Size</div>
                      <div className="font-mono text-foreground">{pos.size}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Entry</div>
                      <div className="font-mono text-foreground">{pos.entry}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Current</div>
                      <div className="font-mono text-foreground">{pos.current}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">PnL</div>
                      <div className={cn("font-mono font-medium", pos.pnlPositive ? "text-success" : "text-destructive")}>
                        {pos.pnl}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Recent Trades */}
        <div className="p-3 overflow-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Recent Trades
            </span>
          </div>
          {data.recentTrades.length === 0 ? (
            <div className="text-xs text-muted-foreground py-4 text-center">No recent trades</div>
          ) : (
            <div className="space-y-1.5">
              {data.recentTrades.map((trade, i) => (
                <div key={i} className="flex items-start gap-2 py-1.5 border-b border-border/50 last:border-0">
                  <div className="shrink-0 mt-0.5">
                    {trade.status === "filled" ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    ) : trade.status === "skipped" ? (
                      <AlertCircle className="w-3.5 h-3.5 text-warning" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-muted-foreground">{trade.time}</span>
                      <span
                        className={cn(
                          "text-[10px] font-medium",
                          trade.action === "BUY" ? "text-success" : "text-destructive"
                        )}
                      >
                        {trade.action}
                      </span>
                      <span className="text-xs text-foreground truncate">{trade.market}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span className="font-mono">{trade.size} @ {trade.price}</span>
                      {trade.status === "skipped" && trade.note && (
                        <span className="text-warning truncate">{trade.note}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
