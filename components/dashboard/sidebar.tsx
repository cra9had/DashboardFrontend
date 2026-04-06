"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Wallet,
  Sliders,
  ArrowLeftRight,
  ShieldAlert,
  LineChart,
} from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: Wallet, label: "Wallets", active: false },
  { icon: Sliders, label: "Control", active: false },
  { icon: ArrowLeftRight, label: "Trades", active: false },
  { icon: ShieldAlert, label: "Risk", active: false },
  { icon: LineChart, label: "Analyzer", active: false },
]

export function DashboardSidebar() {
  return (
    <aside className="w-14 lg:w-48 h-screen bg-sidebar border-r border-sidebar-border flex flex-col shrink-0">
      <div className="h-12 flex items-center px-3 lg:px-4 border-b border-sidebar-border">
        <div className="w-6 h-6 rounded bg-accent flex items-center justify-center">
          <span className="text-xs font-bold text-accent-foreground">P</span>
        </div>
        <span className="hidden lg:block ml-2 text-sm font-semibold text-sidebar-foreground tracking-tight">
          Polymarket Ops
        </span>
      </div>
      <nav className="flex-1 py-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-3 px-3 lg:px-4 py-2 text-sm transition-colors",
              item.active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            <span className="hidden lg:block">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-3 lg:p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="hidden lg:block text-xs text-muted-foreground">Connected</span>
        </div>
      </div>
    </aside>
  )
}
