"use client"

import { cn } from "@/lib/utils"
import { X, Circle } from "lucide-react"

export interface WalletPair {
  id: string
  pair: string
  wallet: string
  enabled: boolean
  pnl: string
  pnlPositive: boolean
}

export const wallets: WalletPair[] = [
  { id: "1", pair: "BTC-WINNER", wallet: "0x1a2b...3c4d", enabled: true, pnl: "+$2,340", pnlPositive: true },
  { id: "2", pair: "ETH-PRICE", wallet: "0x5e6f...7g8h", enabled: true, pnl: "+$1,120", pnlPositive: true },
  { id: "3", pair: "TRUMP-WIN", wallet: "0x9i0j...1k2l", enabled: true, pnl: "-$450", pnlPositive: false },
  { id: "4", pair: "FED-RATE", wallet: "0x3m4n...5o6p", enabled: false, pnl: "+$890", pnlPositive: true },
  { id: "5", pair: "AI-BOOM", wallet: "0x7q8r...9s0t", enabled: true, pnl: "+$3,200", pnlPositive: true },
  { id: "6", pair: "SPX-5K", wallet: "0xa1b2...c3d4", enabled: false, pnl: "-$120", pnlPositive: false },
  { id: "7", pair: "UKRAINE", wallet: "0xe5f6...g7h8", enabled: true, pnl: "+$567", pnlPositive: true },
  { id: "8", pair: "TESLA-10K", wallet: "0xi9j0...k1l2", enabled: true, pnl: "+$4,100", pnlPositive: true },
]

interface WalletTabsProps {
  selectedId: string
  onSelect: (id: string) => void
}

export function WalletTabs({ selectedId, onSelect }: WalletTabsProps) {
  return (
    <div className="flex items-end gap-0.5 overflow-x-auto pb-px scrollbar-hide">
      {wallets.map((wallet) => (
        <button
          key={wallet.id}
          onClick={() => onSelect(wallet.id)}
          className={cn(
            "group relative flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors shrink-0 border-t border-x rounded-t-sm",
            selectedId === wallet.id
              ? "bg-card border-border text-foreground z-10"
              : "bg-secondary/50 border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
        >
          <Circle
            className={cn(
              "w-2 h-2 shrink-0",
              wallet.enabled ? "fill-success text-success" : "fill-muted-foreground text-muted-foreground"
            )}
          />
          <span className="truncate max-w-[80px]">{wallet.pair}</span>
          <span
            className={cn(
              "font-mono text-[10px]",
              wallet.pnlPositive ? "text-success" : "text-destructive"
            )}
          >
            {wallet.pnl}
          </span>
          <X 
            className={cn(
              "w-3 h-3 opacity-0 group-hover:opacity-50 hover:!opacity-100 transition-opacity",
              selectedId === wallet.id && "opacity-30"
            )}
          />
        </button>
      ))}
      <button
        className="flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-sm transition-colors shrink-0"
      >
        <span className="text-lg leading-none">+</span>
      </button>
    </div>
  )
}
