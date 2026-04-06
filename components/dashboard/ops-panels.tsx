import { cn } from "@/lib/utils"
import {
  Play,
  Pause,
  AlertOctagon,
  ToggleLeft,
} from "lucide-react"

interface PanelProps {
  title: string
  children: React.ReactNode
}

function Panel({ title, children }: PanelProps) {
  return (
    <div className="bg-card border border-border rounded-sm flex flex-col">
      <div className="px-3 py-2 border-b border-border">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </span>
      </div>
      <div className="p-2 flex-1">{children}</div>
    </div>
  )
}

function ControlButton({
  icon: Icon,
  label,
  variant = "default",
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  variant?: "default" | "success" | "warning" | "danger"
}) {
  return (
    <button
      className={cn(
        "flex items-center gap-2 px-2 py-1.5 rounded-sm text-xs font-medium transition-colors w-full",
        variant === "default" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        variant === "success" && "bg-success/20 text-success hover:bg-success/30",
        variant === "warning" && "bg-warning/20 text-warning hover:bg-warning/30",
        variant === "danger" && "bg-destructive/20 text-destructive hover:bg-destructive/30"
      )}
    >
      <Icon className="w-3 h-3" />
      {label}
    </button>
  )
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1 border-b border-border/50 last:border-0">
      <span className="text-[10px] text-muted-foreground">{label}</span>
      <span className="text-[10px] font-mono text-foreground">{value}</span>
    </div>
  )
}

export function ControlPanel() {
  return (
    <Panel title="Control">
      <div className="grid grid-cols-2 gap-1.5">
        <ControlButton icon={Play} label="Start" variant="success" />
        <ControlButton icon={Pause} label="Pause" variant="warning" />
        <ControlButton icon={AlertOctagon} label="E-Stop" variant="danger" />
        <ControlButton icon={ToggleLeft} label="Toggle" variant="default" />
      </div>
    </Panel>
  )
}

export function RiskPanel() {
  return (
    <Panel title="Risk">
      <div className="space-y-0">
        <StatChip label="Slippage" value="0.5%" />
        <StatChip label="Delay Limit" value="30s" />
        <StatChip label="Allocation" value="80%" />
        <StatChip label="Skip Logic" value="Enabled" />
      </div>
    </Panel>
  )
}

export function AnalyzerPanel() {
  return (
    <Panel title="Analyzer">
      <div className="space-y-0">
        <StatChip label="ROI" value="+12.4%" />
        <StatChip label="Drawdown" value="-3.2%" />
        <StatChip label="Trades/Day" value="24" />
        <StatChip label="Ranking" value="#3" />
      </div>
    </Panel>
  )
}

interface TradeRow {
  market: string
  side: "buy" | "sell"
  size: string
  price: string
}

const openPositions: TradeRow[] = [
  { market: "BTC-WINNER", side: "buy", size: "500", price: "0.62" },
  { market: "ETH-PRICE", side: "sell", size: "1,000", price: "0.38" },
  { market: "AI-BOOM", side: "buy", size: "2,000", price: "0.71" },
]

const recentTrades: TradeRow[] = [
  { market: "TRUMP-WIN", side: "buy", size: "250", price: "0.54" },
  { market: "UKRAINE", side: "sell", size: "1,500", price: "0.29" },
]

export function TradesPanel() {
  return (
    <Panel title="Trades & Positions">
      <div className="space-y-2">
        <div>
          <div className="text-[9px] uppercase tracking-wider text-muted-foreground mb-1">
            Open ({openPositions.length})
          </div>
          <div className="space-y-0.5">
            {openPositions.map((pos, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[10px] py-0.5"
              >
                <span
                  className={cn(
                    "w-1 h-1 rounded-full",
                    pos.side === "buy" ? "bg-success" : "bg-destructive"
                  )}
                />
                <span className="font-medium text-foreground flex-1 truncate">
                  {pos.market}
                </span>
                <span className="font-mono text-muted-foreground">
                  {pos.size}
                </span>
                <span className="font-mono text-muted-foreground">
                  @{pos.price}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[9px] uppercase tracking-wider text-muted-foreground mb-1">
            Recent
          </div>
          <div className="space-y-0.5">
            {recentTrades.map((trade, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[10px] py-0.5"
              >
                <span
                  className={cn(
                    "w-1 h-1 rounded-full",
                    trade.side === "buy" ? "bg-success" : "bg-destructive"
                  )}
                />
                <span className="font-medium text-foreground flex-1 truncate">
                  {trade.market}
                </span>
                <span className="font-mono text-muted-foreground">
                  {trade.size}
                </span>
                <span className="font-mono text-muted-foreground">
                  @{trade.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  )
}
