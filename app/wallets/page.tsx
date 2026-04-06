"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Plus,
  Trash2,
  ToggleLeft,
  Circle,
  Play,
  Pause,
  Search,
} from "lucide-react"

interface WalletPair {
  id: string
  pairName: string
  sourceWallet: string
  followerAccount: string
  enabled: boolean
  running: boolean
  sizingMode: "fixed" | "proportional" | "coefficient"
  copiedTrades: number
  openPositions: number
  recentEvents: number
  lastLatency: string
}

const mockWalletPairs: WalletPair[] = [
  {
    id: "1",
    pairName: "BTC-WINNER",
    sourceWallet: "0x1a2b3c4d5e6f7g8h",
    followerAccount: "0xf1e2d3c4b5a69786",
    enabled: true,
    running: true,
    sizingMode: "fixed",
    copiedTrades: 142,
    openPositions: 3,
    recentEvents: 12,
    lastLatency: "42ms",
  },
  {
    id: "2",
    pairName: "ETH-PRICE",
    sourceWallet: "0x5e6f7g8h9i0j1k2l",
    followerAccount: "0xa9b8c7d6e5f4g3h2",
    enabled: true,
    running: true,
    sizingMode: "proportional",
    copiedTrades: 89,
    openPositions: 2,
    recentEvents: 8,
    lastLatency: "38ms",
  },
  {
    id: "3",
    pairName: "TRUMP-WIN",
    sourceWallet: "0x9i0j1k2l3m4n5o6p",
    followerAccount: "0xn6o5p4q3r2s1t0u9",
    enabled: true,
    running: false,
    sizingMode: "fixed",
    copiedTrades: 67,
    openPositions: 1,
    recentEvents: 3,
    lastLatency: "--",
  },
  {
    id: "4",
    pairName: "FED-RATE",
    sourceWallet: "0x3m4n5o6p7q8r9s0t",
    followerAccount: "0xa3b2c1d0e9f8g7h6",
    enabled: false,
    running: false,
    sizingMode: "coefficient",
    copiedTrades: 45,
    openPositions: 0,
    recentEvents: 0,
    lastLatency: "--",
  },
  {
    id: "5",
    pairName: "AI-BOOM",
    sourceWallet: "0x7q8r9s0t1u2v3w4x",
    followerAccount: "0xn0o9p8q7r6s5t4u3",
    enabled: true,
    running: true,
    sizingMode: "proportional",
    copiedTrades: 203,
    openPositions: 4,
    recentEvents: 18,
    lastLatency: "35ms",
  },
  {
    id: "6",
    pairName: "SPX-5K",
    sourceWallet: "0xa1b2c3d4e5f6g7h8",
    followerAccount: "0xw7x6y5z4a3b2c1d0",
    enabled: false,
    running: false,
    sizingMode: "fixed",
    copiedTrades: 12,
    openPositions: 0,
    recentEvents: 0,
    lastLatency: "--",
  },
  {
    id: "7",
    pairName: "UKRAINE",
    sourceWallet: "0xe5f6g7h8i9j0k1l2",
    followerAccount: "0xj4k3l2m1n0o9p8q7",
    enabled: true,
    running: true,
    sizingMode: "fixed",
    copiedTrades: 56,
    openPositions: 1,
    recentEvents: 5,
    lastLatency: "51ms",
  },
  {
    id: "8",
    pairName: "TESLA-10K",
    sourceWallet: "0xi9j0k1l2m3n4o5p6",
    followerAccount: "0xw1x0y9z8a7b6c5d4",
    enabled: true,
    running: true,
    sizingMode: "coefficient",
    copiedTrades: 178,
    openPositions: 2,
    recentEvents: 9,
    lastLatency: "44ms",
  },
]

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

export default function WalletsPage() {
  const [walletPairs, setWalletPairs] = useState(mockWalletPairs)
  const [selectedId, setSelectedId] = useState<string | null>("1")
  const [searchQuery, setSearchQuery] = useState("")
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const selectedWallet = walletPairs.find((w) => w.id === selectedId)

  const filteredWallets = walletPairs.filter(
    (w) =>
      w.pairName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.sourceWallet.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleToggleEnabled = (id: string) => {
    setWalletPairs((prev) =>
      prev.map((w) => (w.id === id ? { ...w, enabled: !w.enabled, running: !w.enabled ? w.running : false } : w))
    )
  }

  const handleDelete = () => {
    if (deleteTarget) {
      setWalletPairs((prev) => prev.filter((w) => w.id !== deleteTarget))
      if (selectedId === deleteTarget) setSelectedId(null)
      setDeleteTarget(null)
      setDeleteDialogOpen(false)
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
              <h1 className="text-sm font-semibold text-foreground">Wallet Pairs</h1>
              <p className="text-[10px] text-muted-foreground">
                {walletPairs.filter((w) => w.enabled).length} enabled / {walletPairs.length} total
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-7 h-8 w-40 text-xs"
                />
              </div>
              <Button size="sm" variant="outline" onClick={() => setAddDialogOpen(true)}>
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add Pair</span>
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
            {/* Table */}
            <div className="flex-1 bg-card border border-border rounded-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-[10px] uppercase tracking-wider h-8">Pair</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider h-8 hidden md:table-cell">Source</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider h-8 hidden lg:table-cell">Follower</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider h-8">State</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider h-8 hidden sm:table-cell">Mode</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right hidden sm:table-cell">Trades</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right hidden md:table-cell">Positions</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right hidden lg:table-cell">Events</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right">Latency</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider h-8 w-20">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWallets.map((wallet) => (
                    <TableRow
                      key={wallet.id}
                      className={cn(
                        "cursor-pointer",
                        selectedId === wallet.id && "bg-secondary/50"
                      )}
                      onClick={() => setSelectedId(wallet.id)}
                    >
                      <TableCell className="py-2">
                        <div className="flex items-center gap-2">
                          <Circle
                            className={cn(
                              "w-2 h-2 shrink-0",
                              wallet.enabled && wallet.running
                                ? "fill-success text-success"
                                : wallet.enabled
                                ? "fill-warning text-warning"
                                : "fill-muted-foreground text-muted-foreground"
                            )}
                          />
                          <span className="text-xs font-medium text-foreground">{wallet.pairName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-2 hidden md:table-cell">
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {wallet.sourceWallet.slice(0, 8)}...
                        </span>
                      </TableCell>
                      <TableCell className="py-2 hidden lg:table-cell">
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {wallet.followerAccount.slice(0, 8)}...
                        </span>
                      </TableCell>
                      <TableCell className="py-2">
                        <span
                          className={cn(
                            "text-[9px] uppercase px-1.5 py-0.5 rounded-sm font-medium",
                            wallet.enabled && wallet.running && "bg-success/20 text-success",
                            wallet.enabled && !wallet.running && "bg-warning/20 text-warning",
                            !wallet.enabled && "bg-muted text-muted-foreground"
                          )}
                        >
                          {wallet.enabled ? (wallet.running ? "Running" : "Paused") : "Disabled"}
                        </span>
                      </TableCell>
                      <TableCell className="py-2 hidden sm:table-cell">
                        <span className="text-[10px] text-muted-foreground capitalize">{wallet.sizingMode}</span>
                      </TableCell>
                      <TableCell className="py-2 text-right hidden sm:table-cell">
                        <span className="text-[10px] font-mono text-foreground">{wallet.copiedTrades}</span>
                      </TableCell>
                      <TableCell className="py-2 text-right hidden md:table-cell">
                        <span className="text-[10px] font-mono text-foreground">{wallet.openPositions}</span>
                      </TableCell>
                      <TableCell className="py-2 text-right hidden lg:table-cell">
                        <span className="text-[10px] font-mono text-muted-foreground">{wallet.recentEvents}</span>
                      </TableCell>
                      <TableCell className="py-2 text-right">
                        <span className="text-[10px] font-mono text-muted-foreground">{wallet.lastLatency}</span>
                      </TableCell>
                      <TableCell className="py-2">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleToggleEnabled(wallet.id)
                            }}
                            className={cn(
                              "p-1 rounded-sm transition-colors",
                              wallet.enabled
                                ? "text-success hover:bg-success/20"
                                : "text-muted-foreground hover:bg-muted"
                            )}
                          >
                            <ToggleLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setDeleteTarget(wallet.id)
                              setDeleteDialogOpen(true)
                            }}
                            className="p-1 rounded-sm text-muted-foreground hover:text-destructive hover:bg-destructive/20 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Detail Panel */}
            <div className="w-full lg:w-72 bg-card border border-border rounded-sm">
              {selectedWallet ? (
                <div className="flex flex-col h-full">
                  <div className="px-3 py-2 border-b border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-foreground">{selectedWallet.pairName}</span>
                      <span
                        className={cn(
                          "text-[9px] uppercase px-1.5 py-0.5 rounded-sm font-medium",
                          selectedWallet.enabled && selectedWallet.running && "bg-success/20 text-success",
                          selectedWallet.enabled && !selectedWallet.running && "bg-warning/20 text-warning",
                          !selectedWallet.enabled && "bg-muted text-muted-foreground"
                        )}
                      >
                        {selectedWallet.enabled ? (selectedWallet.running ? "Running" : "Paused") : "Disabled"}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 space-y-4 flex-1 overflow-auto">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Source Wallet</div>
                      <div className="text-xs font-mono text-foreground bg-secondary/30 px-2 py-1.5 rounded-sm break-all">
                        {selectedWallet.sourceWallet}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Follower Account</div>
                      <div className="text-xs font-mono text-foreground bg-secondary/30 px-2 py-1.5 rounded-sm break-all">
                        {selectedWallet.followerAccount}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Configuration</div>
                      <div className="space-y-0">
                        <StatRow label="Execution Mode" value="Copy on Signal" />
                        <StatRow label="Sizing Mode" value={selectedWallet.sizingMode} />
                        <StatRow label="Fixed Amount" value="500 USDC" variant="mono" />
                        <StatRow label="Max Position" value="5,000 USDC" variant="mono" />
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Statistics</div>
                      <div className="space-y-0">
                        <StatRow label="Copied Trades" value={selectedWallet.copiedTrades.toString()} variant="mono" />
                        <StatRow label="Open Positions" value={selectedWallet.openPositions.toString()} variant="mono" />
                        <StatRow label="Recent Events" value={selectedWallet.recentEvents.toString()} variant="muted" />
                        <StatRow label="Last Latency" value={selectedWallet.lastLatency} variant="muted" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-t border-border flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      {selectedWallet.running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      {selectedWallet.running ? "Pause" : "Start"}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleToggleEnabled(selectedWallet.id)}>
                      <ToggleLeft className="w-3.5 h-3.5" />
                      {selectedWallet.enabled ? "Disable" : "Enable"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[200px]">
                  <span className="text-xs text-muted-foreground">Select a wallet pair</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Add Wallet Pair Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm">Add Wallet Pair</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Configure a new source wallet to follower account mapping.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs">Pair Name</Label>
              <Input placeholder="e.g., BTC-WHALE" className="h-8 text-xs" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Source Wallet</Label>
              <Input placeholder="0x..." className="h-8 text-xs font-mono" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Follower Account</Label>
              <Input placeholder="0x..." className="h-8 text-xs font-mono" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Sizing Mode</Label>
              <Select defaultValue="fixed">
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed" className="text-xs">Fixed Amount</SelectItem>
                  <SelectItem value="proportional" className="text-xs">Proportional</SelectItem>
                  <SelectItem value="coefficient" className="text-xs">Coefficient</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-xs">Enable on Create</Label>
              <Switch defaultChecked />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => setAddDialogOpen(false)}>
              Add Pair
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-sm">Remove Wallet Pair</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              This will permanently remove the wallet pair and stop all associated copy trading.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
