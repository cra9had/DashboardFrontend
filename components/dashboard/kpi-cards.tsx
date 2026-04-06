"use client"

import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

interface KPICardProps {
  label: string
  value: string
  subValue?: string
  trend?: "up" | "down" | "neutral"
  status?: "success" | "warning" | "error" | "neutral"
}

function KPICard({ label, value, subValue, trend, status = "neutral" }: KPICardProps) {
  return (
    <div className="bg-card border border-border rounded-sm px-3 py-2.5 min-w-0">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
        {label}
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
            "text-lg font-mono font-semibold truncate",
            status === "success" && "text-success",
            status === "warning" && "text-warning",
            status === "error" && "text-destructive",
            status === "neutral" && "text-foreground"
          )}
        >
          {value}
        </span>
      </div>
      {subValue && (
        <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
          {subValue}
        </div>
      )}
    </div>
  )
}

export function KPICards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
      <KPICard 
        label="Total PnL" 
        value="+$12,847" 
        subValue="All time"
        trend="up"
        status="success" 
      />
      <KPICard 
        label="Today PnL" 
        value="+$1,234" 
        subValue="+4.2%"
        trend="up"
        status="success" 
      />
      <KPICard 
        label="Open Positions" 
        value="7" 
        subValue="$18,500 value"
        status="neutral" 
      />
      <KPICard 
        label="Active Wallets" 
        value="6/8" 
        subValue="2 paused"
        status="neutral" 
      />
      <KPICard 
        label="Win Rate" 
        value="68%" 
        subValue="34/50 trades"
        status="success" 
      />
    </div>
  )
}

export function StatusBar() {
  return (
    <div className="flex items-center gap-4 px-3 py-1.5 bg-secondary/30 border border-border rounded-sm text-[10px] font-mono text-muted-foreground">
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-success" />
        <span>LIVE</span>
      </div>
      <div className="h-3 w-px bg-border" />
      <span>Feed: WebSocket</span>
      <div className="h-3 w-px bg-border" />
      <span>Env: Production</span>
      <div className="h-3 w-px bg-border" />
      <span>Latency: 42ms</span>
    </div>
  )
}
