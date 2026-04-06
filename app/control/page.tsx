"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Play,
  Pause,
  Square,
  AlertOctagon,
  RotateCcw,
  Circle,
  Zap,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react"

interface WorkerState {
  id: string
  pairName: string
  status: "running" | "paused" | "stopped" | "error"
  lastEvent: string
  uptime: string
}

const mockWorkers: WorkerState[] = [
  { id: "1", pairName: "BTC-WINNER", status: "running", lastEvent: "Trade copied", uptime: "4h 23m" },
  { id: "2", pairName: "ETH-PRICE", status: "running", lastEvent: "Position closed", uptime: "4h 23m" },
  { id: "3", pairName: "TRUMP-WIN", status: "paused", lastEvent: "Manual pause", uptime: "--" },
  { id: "4", pairName: "FED-RATE", status: "stopped", lastEvent: "Disabled", uptime: "--" },
  { id: "5", pairName: "AI-BOOM", status: "running", lastEvent: "Trade copied", uptime: "4h 23m" },
  { id: "6", pairName: "SPX-5K", status: "stopped", lastEvent: "Disabled", uptime: "--" },
  { id: "7", pairName: "UKRAINE", status: "running", lastEvent: "Trade copied", uptime: "2h 15m" },
  { id: "8", pairName: "TESLA-10K", status: "error", lastEvent: "Connection lost", uptime: "--" },
]

interface LogEntry {
  timestamp: string
  level: "info" | "warn" | "error" | "success"
  message: string
  source: string
}

const mockLogs: LogEntry[] = [
  { timestamp: "14:55:23", level: "success", message: "Trade copied: BTC-WINNER BUY 500 @ 0.65", source: "worker-1" },
  { timestamp: "14:55:18", level: "info", message: "Signal received from 0x1a2b...3c4d", source: "feed" },
  { timestamp: "14:54:45", level: "warn", message: "High latency detected: 128ms", source: "network" },
  { timestamp: "14:54:12", level: "success", message: "Position closed: ETH-PRICE SELL 1000 @ 0.52", source: "worker-2" },
  { timestamp: "14:53:58", level: "error", message: "Connection lost to TESLA-10K worker", source: "worker-8" },
  { timestamp: "14:53:30", level: "info", message: "Worker-5 resumed execution", source: "control" },
  { timestamp: "14:52:45", level: "success", message: "Trade copied: AI-BOOM BUY 2000 @ 0.84", source: "worker-5" },
  { timestamp: "14:52:10", level: "info", message: "Signal received from 0x7q8r...9s0t", source: "feed" },
  { timestamp: "14:51:33", level: "warn", message: "Price deviation exceeded for FED-RATE", source: "risk" },
  { timestamp: "14:50:55", level: "info", message: "System health check passed", source: "monitor" },
]

function GlobalControlButton({
  icon: Icon,
  label,
  variant = "default",
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  variant?: "default" | "success" | "warning" | "danger"
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-4 rounded-sm transition-colors",
        variant === "default" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        variant === "success" && "bg-success/20 text-success hover:bg-success/30",
        variant === "warning" && "bg-warning/20 text-warning hover:bg-warning/30",
        variant === "danger" && "bg-destructive/20 text-destructive hover:bg-destructive/30"
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  )
}

function StatBlock({ label, value, variant = "default" }: { label: string; value: string; variant?: "default" | "success" | "warning" | "error" }) {
  return (
    <div className="bg-card border border-border rounded-sm px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
      <div className={cn(
        "text-lg font-mono font-semibold",
        variant === "success" && "text-success",
        variant === "warning" && "text-warning",
        variant === "error" && "text-destructive",
        variant === "default" && "text-foreground"
      )}>{value}</div>
    </div>
  )
}

export default function ControlPage() {
  const [workers, setWorkers] = useState(mockWorkers)
  const [globalMode, setGlobalMode] = useState<"live" | "paused" | "stopped">("live")

  const activeCount = workers.filter((w) => w.status === "running").length
  const pausedCount = workers.filter((w) => w.status === "paused").length
  const stoppedCount = workers.filter((w) => w.status === "stopped").length
  const errorCount = workers.filter((w) => w.status === "error").length

  const handleWorkerAction = (id: string, action: "start" | "pause" | "stop") => {
    setWorkers((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              status: action === "start" ? "running" : action === "pause" ? "paused" : "stopped",
              lastEvent: action === "start" ? "Resumed" : action === "pause" ? "Manual pause" : "Stopped",
              uptime: action === "start" ? "0m" : "--",
            }
          : w
      )
    )
  }

  const handleGlobalAction = (action: "start" | "pause" | "stop" | "emergency") => {
    if (action === "emergency") {
      setWorkers((prev) =>
        prev.map((w) => ({ ...w, status: "stopped", lastEvent: "Emergency stop", uptime: "--" }))
      )
      setGlobalMode("stopped")
    } else if (action === "start") {
      setWorkers((prev) =>
        prev.map((w) =>
          w.status !== "error" ? { ...w, status: "running", lastEvent: "Global start", uptime: "0m" } : w
        )
      )
      setGlobalMode("live")
    } else if (action === "pause") {
      setWorkers((prev) =>
        prev.map((w) =>
          w.status === "running" ? { ...w, status: "paused", lastEvent: "Global pause", uptime: "--" } : w
        )
      )
      setGlobalMode("paused")
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto bg-background">
        <div className="p-3 lg:p-4 space-y-3 lg:space-y-4 min-h-full">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-sm font-semibold text-foreground">Control Center</h1>
              <p className="text-[10px] text-muted-foreground">Runtime operations and worker management</p>
            </div>
            <div className="flex items-center gap-2">
              <div className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-sm text-[10px] font-medium uppercase",
                globalMode === "live" && "bg-success/20 text-success",
                globalMode === "paused" && "bg-warning/20 text-warning",
                globalMode === "stopped" && "bg-destructive/20 text-destructive"
              )}>
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  globalMode === "live" && "bg-success animate-pulse",
                  globalMode === "paused" && "bg-warning",
                  globalMode === "stopped" && "bg-destructive"
                )} />
                {globalMode}
              </div>
            </div>
          </div>

          {/* Global Controls */}
          <div className="bg-card border border-border rounded-sm p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Global Controls</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <GlobalControlButton icon={Play} label="Start All" variant="success" onClick={() => handleGlobalAction("start")} />
              <GlobalControlButton icon={Pause} label="Pause All" variant="warning" onClick={() => handleGlobalAction("pause")} />
              <GlobalControlButton icon={RotateCcw} label="Resume All" variant="default" onClick={() => handleGlobalAction("start")} />
              <GlobalControlButton icon={AlertOctagon} label="Emergency Stop" variant="danger" onClick={() => handleGlobalAction("emergency")} />
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <StatBlock label="Active Workers" value={activeCount.toString()} variant="success" />
            <StatBlock label="Paused Workers" value={pausedCount.toString()} variant="warning" />
            <StatBlock label="Stopped Workers" value={stoppedCount.toString()} />
            <StatBlock label="Errors" value={errorCount.toString()} variant={errorCount > 0 ? "error" : "default"} />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
            {/* Per-Wallet Controls */}
            <div className="bg-card border border-border rounded-sm">
              <div className="px-3 py-2 border-b border-border">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Worker Controls</span>
              </div>
              <div className="divide-y divide-border max-h-[400px] overflow-auto">
                {workers.map((worker) => (
                  <div key={worker.id} className="flex items-center justify-between px-3 py-2">
                    <div className="flex items-center gap-3">
                      <Circle
                        className={cn(
                          "w-2 h-2 shrink-0",
                          worker.status === "running" && "fill-success text-success",
                          worker.status === "paused" && "fill-warning text-warning",
                          worker.status === "stopped" && "fill-muted-foreground text-muted-foreground",
                          worker.status === "error" && "fill-destructive text-destructive"
                        )}
                      />
                      <div>
                        <div className="text-xs font-medium text-foreground">{worker.pairName}</div>
                        <div className="text-[10px] text-muted-foreground">{worker.lastEvent}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-muted-foreground">{worker.uptime}</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleWorkerAction(worker.id, "start")}
                          disabled={worker.status === "running"}
                          className={cn(
                            "p-1 rounded-sm transition-colors",
                            worker.status === "running"
                              ? "text-muted-foreground/30 cursor-not-allowed"
                              : "text-success hover:bg-success/20"
                          )}
                        >
                          <Play className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleWorkerAction(worker.id, "pause")}
                          disabled={worker.status !== "running"}
                          className={cn(
                            "p-1 rounded-sm transition-colors",
                            worker.status !== "running"
                              ? "text-muted-foreground/30 cursor-not-allowed"
                              : "text-warning hover:bg-warning/20"
                          )}
                        >
                          <Pause className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleWorkerAction(worker.id, "stop")}
                          disabled={worker.status === "stopped"}
                          className={cn(
                            "p-1 rounded-sm transition-colors",
                            worker.status === "stopped"
                              ? "text-muted-foreground/30 cursor-not-allowed"
                              : "text-destructive hover:bg-destructive/20"
                          )}
                        >
                          <Square className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Runtime State */}
            <div className="bg-card border border-border rounded-sm">
              <div className="px-3 py-2 border-b border-border">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Runtime State</span>
              </div>
              <div className="p-3 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-secondary/30 rounded-sm p-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-3.5 h-3.5 text-accent" />
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Mode</span>
                    </div>
                    <div className="text-xs font-medium text-foreground">Copy on Signal</div>
                  </div>
                  <div className="bg-secondary/30 rounded-sm p-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-3.5 h-3.5 text-accent" />
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Uptime</span>
                    </div>
                    <div className="text-xs font-mono font-medium text-foreground">4h 23m 45s</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-1.5 border-b border-border/50">
                    <span className="text-[10px] text-muted-foreground">Last Execution Event</span>
                    <span className="text-[10px] font-mono text-foreground">Trade copied @ 14:55:23</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-border/50">
                    <span className="text-[10px] text-muted-foreground">Last Error</span>
                    <span className="text-[10px] font-mono text-destructive">Connection lost @ 14:53:58</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-border/50">
                    <span className="text-[10px] text-muted-foreground">Feed Status</span>
                    <span className="text-[10px] text-success">WebSocket Connected</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-[10px] text-muted-foreground">Environment</span>
                    <span className="text-[10px] font-mono text-foreground">Production</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Logs */}
          <div className="bg-card border border-border rounded-sm">
            <div className="px-3 py-2 border-b border-border flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Operational Logs</span>
              <Button variant="ghost" size="sm" className="h-6 text-[10px]">
                Clear
              </Button>
            </div>
            <div className="max-h-[200px] overflow-auto font-mono text-[10px]">
              {mockLogs.map((log, i) => (
                <div key={i} className="flex items-start gap-2 px-3 py-1.5 border-b border-border/30 last:border-0 hover:bg-secondary/20">
                  <span className="text-muted-foreground shrink-0">{log.timestamp}</span>
                  <span className="shrink-0">
                    {log.level === "success" && <CheckCircle2 className="w-3 h-3 text-success" />}
                    {log.level === "info" && <Circle className="w-3 h-3 text-accent" />}
                    {log.level === "warn" && <AlertTriangle className="w-3 h-3 text-warning" />}
                    {log.level === "error" && <XCircle className="w-3 h-3 text-destructive" />}
                  </span>
                  <span className="text-muted-foreground shrink-0">[{log.source}]</span>
                  <span className={cn(
                    "flex-1",
                    log.level === "success" && "text-success",
                    log.level === "info" && "text-foreground",
                    log.level === "warn" && "text-warning",
                    log.level === "error" && "text-destructive"
                  )}>{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
