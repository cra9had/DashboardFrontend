"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Search,
  TrendingUp,
  TrendingDown,
  Percent,
  DollarSign,
  Activity,
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  ChevronRight,
  BarChart3,
} from "lucide-react"

// Types
interface CandidateWallet {
  address: string
  score: number
  rank: number
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

interface WalletAnalysis {
  address: string
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
  suitabilityScore: number
  suitabilityRating: "excellent" | "good" | "moderate" | "poor"
  riskProfile: "low" | "medium" | "high"
  behaviorNotes: string[]
}

// Mock Data
const mockLeaderboardResults: CandidateWallet[] = [
  {
    address: "0x7a3b8c9d1e2f4a5b6c7d8e9f0a1b2c3d",
    score: 94,
    rank: 1,
    ageMonths: 24,
    tradesPerDay: 5.2,
    earningsPerDay: 485,
    totalRoi: 245.3,
    last3mRoi: 42.1,
    maxDrawdown: -8.4,
    maxOwnSpentDay: 18000,
    avgBetSize: 1850,
    maxBetSize: 7500,
    winrate: 71.2,
    expectancyPerTrade: 93.2,
  },
  {
    address: "0x2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f1a",
    score: 89,
    rank: 2,
    ageMonths: 18,
    tradesPerDay: 4.8,
    earningsPerDay: 412,
    totalRoi: 198.7,
    last3mRoi: 35.6,
    maxDrawdown: -11.2,
    maxOwnSpentDay: 15000,
    avgBetSize: 1420,
    maxBetSize: 6200,
    winrate: 68.5,
    expectancyPerTrade: 85.8,
  },
  {
    address: "0x9f1e3d5c7b9a1c3e5d7f9b1d3e5f7a9b",
    score: 86,
    rank: 3,
    ageMonths: 14,
    tradesPerDay: 6.1,
    earningsPerDay: 378,
    totalRoi: 176.2,
    last3mRoi: 28.9,
    maxDrawdown: -14.6,
    maxOwnSpentDay: 22000,
    avgBetSize: 2100,
    maxBetSize: 8500,
    winrate: 65.8,
    expectancyPerTrade: 72.4,
  },
  {
    address: "0x4c6e8a0b2d4f6a8c0e2d4f6a8c0e2d4f",
    score: 82,
    rank: 4,
    ageMonths: 21,
    tradesPerDay: 3.4,
    earningsPerDay: 298,
    totalRoi: 152.8,
    last3mRoi: 22.4,
    maxDrawdown: -9.8,
    maxOwnSpentDay: 12000,
    avgBetSize: 1180,
    maxBetSize: 4800,
    winrate: 66.2,
    expectancyPerTrade: 68.5,
  },
  {
    address: "0x1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d",
    score: 78,
    rank: 5,
    ageMonths: 9,
    tradesPerDay: 7.2,
    earningsPerDay: 524,
    totalRoi: 312.4,
    last3mRoi: 58.2,
    maxDrawdown: -18.4,
    maxOwnSpentDay: 28000,
    avgBetSize: 2450,
    maxBetSize: 9800,
    winrate: 62.1,
    expectancyPerTrade: 78.9,
  },
  {
    address: "0x6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f6a",
    score: 75,
    rank: 6,
    ageMonths: 16,
    tradesPerDay: 4.1,
    earningsPerDay: 245,
    totalRoi: 124.5,
    last3mRoi: 18.7,
    maxDrawdown: -12.3,
    maxOwnSpentDay: 14000,
    avgBetSize: 1320,
    maxBetSize: 5200,
    winrate: 64.8,
    expectancyPerTrade: 59.7,
  },
  {
    address: "0x8f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8c",
    score: 71,
    rank: 7,
    ageMonths: 12,
    tradesPerDay: 5.8,
    earningsPerDay: 312,
    totalRoi: 145.2,
    last3mRoi: 24.1,
    maxDrawdown: -16.8,
    maxOwnSpentDay: 19000,
    avgBetSize: 1680,
    maxBetSize: 6800,
    winrate: 61.4,
    expectancyPerTrade: 53.8,
  },
  {
    address: "0x3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a3b",
    score: 68,
    rank: 8,
    ageMonths: 8,
    tradesPerDay: 8.4,
    earningsPerDay: 398,
    totalRoi: 168.9,
    last3mRoi: 32.5,
    maxDrawdown: -22.1,
    maxOwnSpentDay: 32000,
    avgBetSize: 2680,
    maxBetSize: 11000,
    winrate: 58.2,
    expectancyPerTrade: 47.4,
  },
]

function generateWalletAnalysis(address: string): WalletAnalysis {
  // Simulated analysis based on address hash
  const hash = address.split("").reduce((a, b) => a + b.charCodeAt(0), 0)
  const seed = (hash % 100) / 100

  const totalRoi = 80 + seed * 200
  const winrate = 55 + seed * 20
  const maxDrawdown = -(5 + seed * 20)
  const tradesPerDay = 2 + seed * 8
  const expectancy = 30 + seed * 80

  let suitabilityScore = 0
  suitabilityScore += totalRoi > 150 ? 25 : totalRoi > 100 ? 20 : 10
  suitabilityScore += winrate > 65 ? 25 : winrate > 58 ? 20 : 10
  suitabilityScore += maxDrawdown > -12 ? 25 : maxDrawdown > -18 ? 20 : 10
  suitabilityScore += expectancy > 60 ? 25 : expectancy > 40 ? 20 : 10

  let suitabilityRating: WalletAnalysis["suitabilityRating"]
  if (suitabilityScore >= 85) suitabilityRating = "excellent"
  else if (suitabilityScore >= 70) suitabilityRating = "good"
  else if (suitabilityScore >= 50) suitabilityRating = "moderate"
  else suitabilityRating = "poor"

  let riskProfile: WalletAnalysis["riskProfile"]
  if (maxDrawdown > -10 && tradesPerDay < 5) riskProfile = "low"
  else if (maxDrawdown > -18 && tradesPerDay < 8) riskProfile = "medium"
  else riskProfile = "high"

  const behaviorNotes: string[] = []
  if (winrate > 65) behaviorNotes.push("High win rate suggests disciplined entry selection")
  if (maxDrawdown < -15) behaviorNotes.push("Elevated drawdown indicates aggressive position sizing")
  if (tradesPerDay > 6) behaviorNotes.push("High trade frequency may increase slippage costs when copying")
  if (expectancy > 70) behaviorNotes.push("Strong expectancy per trade indicates edge consistency")
  if (totalRoi > 180) behaviorNotes.push("Exceptional historical returns but verify recency")

  return {
    address,
    ageMonths: Math.floor(6 + seed * 24),
    tradesPerDay: parseFloat(tradesPerDay.toFixed(1)),
    earningsPerDay: Math.floor(150 + seed * 400),
    totalRoi: parseFloat(totalRoi.toFixed(1)),
    last3mRoi: parseFloat((15 + seed * 45).toFixed(1)),
    maxDrawdown: parseFloat(maxDrawdown.toFixed(1)),
    maxOwnSpentDay: Math.floor(8000 + seed * 25000),
    avgBetSize: Math.floor(800 + seed * 2000),
    maxBetSize: Math.floor(3000 + seed * 8000),
    winrate: parseFloat(winrate.toFixed(1)),
    expectancyPerTrade: parseFloat(expectancy.toFixed(1)),
    suitabilityScore,
    suitabilityRating,
    riskProfile,
    behaviorNotes,
  }
}

// Components
function MetricCard({
  icon: Icon,
  label,
  value,
  subValue,
  variant = "default",
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  subValue?: string
  variant?: "default" | "success" | "warning" | "error"
}) {
  return (
    <div className="bg-card border border-border rounded-sm px-3 py-2.5">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      </div>
      <span
        className={cn(
          "text-lg font-mono font-semibold block",
          variant === "success" && "text-success",
          variant === "warning" && "text-warning",
          variant === "error" && "text-destructive",
          variant === "default" && "text-foreground"
        )}
      >
        {value}
      </span>
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

function SuitabilityBadge({ rating }: { rating: WalletAnalysis["suitabilityRating"] }) {
  const config = {
    excellent: { bg: "bg-success/10", text: "text-success", icon: CheckCircle, label: "Excellent" },
    good: { bg: "bg-accent/10", text: "text-accent", icon: CheckCircle, label: "Good" },
    moderate: { bg: "bg-warning/10", text: "text-warning", icon: AlertTriangle, label: "Moderate" },
    poor: { bg: "bg-destructive/10", text: "text-destructive", icon: XCircle, label: "Poor" },
  }
  const { bg, text, icon: Icon, label } = config[rating]
  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-sm text-xs font-medium", bg, text)}>
      <Icon className="w-3 h-3" />
      {label}
    </div>
  )
}

function RiskBadge({ profile }: { profile: WalletAnalysis["riskProfile"] }) {
  const config = {
    low: { bg: "bg-success/10", text: "text-success", label: "Low Risk" },
    medium: { bg: "bg-warning/10", text: "text-warning", label: "Medium Risk" },
    high: { bg: "bg-destructive/10", text: "text-destructive", label: "High Risk" },
  }
  const { bg, text, label } = config[profile]
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-medium uppercase tracking-wider", bg, text)}>
      {label}
    </span>
  )
}

// Leaderboard Scan Mode
function LeaderboardScanMode({
  onOpenAnalysis,
}: {
  onOpenAnalysis: (wallet: CandidateWallet) => void
}) {
  const [source, setSource] = useState("polymarket-top-traders")
  const [scanLimit, setScanLimit] = useState("50")
  const [minScore, setMinScore] = useState("60")
  const [minWinrate, setMinWinrate] = useState("")
  const [minRoi, setMinRoi] = useState("")
  const [maxDrawdown, setMaxDrawdown] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [results, setResults] = useState<CandidateWallet[]>([])
  const [hasScanned, setHasScanned] = useState(false)

  const handleScan = () => {
    setIsScanning(true)
    setHasScanned(true)
    // Simulate scan delay
    setTimeout(() => {
      let filtered = [...mockLeaderboardResults]
      if (minScore) filtered = filtered.filter((w) => w.score >= parseInt(minScore))
      if (minWinrate) filtered = filtered.filter((w) => w.winrate >= parseFloat(minWinrate))
      if (minRoi) filtered = filtered.filter((w) => w.totalRoi >= parseFloat(minRoi))
      if (maxDrawdown) filtered = filtered.filter((w) => w.maxDrawdown >= -parseFloat(maxDrawdown))
      setResults(filtered.slice(0, parseInt(scanLimit)))
      setIsScanning(false)
    }, 1500)
  }

  return (
    <div className="space-y-3">
      {/* Scan Controls */}
      <div className="bg-card border border-border rounded-sm">
        <div className="px-3 py-2 border-b border-border">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Scan Configuration</span>
        </div>
        <div className="p-3 space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Source</Label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="polymarket-top-traders" className="text-xs">Polymarket Top Traders</SelectItem>
                  <SelectItem value="polymarket-leaderboard" className="text-xs">Polymarket Leaderboard</SelectItem>
                  <SelectItem value="custom-list" className="text-xs">Custom List</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Scan Limit</Label>
              <Select value={scanLimit} onValueChange={setScanLimit}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25" className="text-xs">25 wallets</SelectItem>
                  <SelectItem value="50" className="text-xs">50 wallets</SelectItem>
                  <SelectItem value="100" className="text-xs">100 wallets</SelectItem>
                  <SelectItem value="200" className="text-xs">200 wallets</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Min Score</Label>
              <Input
                type="number"
                placeholder="60"
                value={minScore}
                onChange={(e) => setMinScore(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Min Win Rate %</Label>
              <Input
                type="number"
                placeholder="Any"
                value={minWinrate}
                onChange={(e) => setMinWinrate(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Min ROI %</Label>
              <Input
                type="number"
                placeholder="Any"
                value={minRoi}
                onChange={(e) => setMinRoi(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Max Drawdown %</Label>
              <Input
                type="number"
                placeholder="Any"
                value={maxDrawdown}
                onChange={(e) => setMaxDrawdown(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <span className="text-[10px] text-muted-foreground">
              {hasScanned && !isScanning && `${results.length} candidates found`}
            </span>
            <Button
              onClick={handleScan}
              disabled={isScanning}
              size="sm"
              className="h-7 text-xs px-4"
            >
              {isScanning ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5 mr-1.5" />
                  Run Scan
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Results Table */}
      {hasScanned && (
        <div className="bg-card border border-border rounded-sm">
          <div className="px-3 py-2 border-b border-border">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Candidate Results</span>
          </div>
          {results.length === 0 ? (
            <div className="p-6 text-center">
              <span className="text-xs text-muted-foreground">No wallets match the specified filters</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-[10px] uppercase tracking-wider h-8 w-12">#</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider h-8">Wallet</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right">Score</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right hidden sm:table-cell">Trades/Day</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right">Total ROI</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right hidden md:table-cell">3M ROI</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right">Win Rate</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right hidden lg:table-cell">Drawdown</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right hidden lg:table-cell">Expectancy</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right hidden md:table-cell">Avg Bet</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider h-8 text-right hidden xl:table-cell">Max Bet</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider h-8 w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((wallet) => (
                    <TableRow
                      key={wallet.address}
                      className="cursor-pointer hover:bg-secondary/30"
                      onClick={() => onOpenAnalysis(wallet)}
                    >
                      <TableCell className="py-2">
                        <span className="text-xs font-mono text-muted-foreground">{wallet.rank}</span>
                      </TableCell>
                      <TableCell className="py-2">
                        <span className="text-xs font-mono text-foreground">{wallet.address.slice(0, 10)}...{wallet.address.slice(-4)}</span>
                      </TableCell>
                      <TableCell className="py-2 text-right">
                        <span className={cn(
                          "text-xs font-mono font-semibold",
                          wallet.score >= 85 ? "text-success" : wallet.score >= 70 ? "text-accent" : "text-foreground"
                        )}>
                          {wallet.score}
                        </span>
                      </TableCell>
                      <TableCell className="py-2 text-right hidden sm:table-cell">
                        <span className="text-xs font-mono text-muted-foreground">{wallet.tradesPerDay}</span>
                      </TableCell>
                      <TableCell className="py-2 text-right">
                        <span className={cn("text-xs font-mono font-medium", wallet.totalRoi > 150 ? "text-success" : "text-foreground")}>
                          {wallet.totalRoi}%
                        </span>
                      </TableCell>
                      <TableCell className="py-2 text-right hidden md:table-cell">
                        <span className={cn("text-xs font-mono", wallet.last3mRoi > 30 ? "text-success" : "text-foreground")}>
                          {wallet.last3mRoi}%
                        </span>
                      </TableCell>
                      <TableCell className="py-2 text-right">
                        <span className={cn("text-xs font-mono", wallet.winrate > 65 ? "text-success" : "text-foreground")}>
                          {wallet.winrate}%
                        </span>
                      </TableCell>
                      <TableCell className="py-2 text-right hidden lg:table-cell">
                        <span className={cn("text-xs font-mono", wallet.maxDrawdown > -12 ? "text-foreground" : "text-warning")}>
                          {wallet.maxDrawdown}%
                        </span>
                      </TableCell>
                      <TableCell className="py-2 text-right hidden lg:table-cell">
                        <span className="text-xs font-mono text-muted-foreground">${wallet.expectancyPerTrade}</span>
                      </TableCell>
                      <TableCell className="py-2 text-right hidden md:table-cell">
                        <span className="text-xs font-mono text-muted-foreground">${wallet.avgBetSize.toLocaleString()}</span>
                      </TableCell>
                      <TableCell className="py-2 text-right hidden xl:table-cell">
                        <span className="text-xs font-mono text-muted-foreground">${wallet.maxBetSize.toLocaleString()}</span>
                      </TableCell>
                      <TableCell className="py-2 text-right">
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Single Wallet Mode
function SingleWalletMode() {
  const [address, setAddress] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<WalletAnalysis | null>(null)

  const handleAnalyze = () => {
    if (!address.trim()) return
    setIsAnalyzing(true)
    setTimeout(() => {
      setAnalysis(generateWalletAnalysis(address))
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="space-y-3">
      {/* Input Section */}
      <div className="bg-card border border-border rounded-sm">
        <div className="px-3 py-2 border-b border-border">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Wallet Address</span>
        </div>
        <div className="p-3">
          <div className="flex gap-2">
            <Input
              placeholder="Enter wallet address (0x...)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="h-8 text-xs font-mono flex-1"
            />
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !address.trim()}
              size="sm"
              className="h-8 text-xs px-4"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5 mr-1.5" />
                  Analyze
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            <MetricCard
              icon={TrendingUp}
              label="Total ROI"
              value={`${analysis.totalRoi}%`}
              subValue="All time"
              variant={analysis.totalRoi > 150 ? "success" : "default"}
            />
            <MetricCard
              icon={BarChart3}
              label="Last 3M ROI"
              value={`${analysis.last3mRoi}%`}
              subValue="Rolling"
              variant={analysis.last3mRoi > 30 ? "success" : "default"}
            />
            <MetricCard
              icon={TrendingDown}
              label="Max Drawdown"
              value={`${analysis.maxDrawdown}%`}
              subValue="Peak to trough"
              variant={analysis.maxDrawdown < -15 ? "error" : "warning"}
            />
            <MetricCard
              icon={Percent}
              label="Win Rate"
              value={`${analysis.winrate}%`}
              variant={analysis.winrate > 65 ? "success" : "default"}
            />
            <MetricCard
              icon={Activity}
              label="Trades/Day"
              value={analysis.tradesPerDay.toString()}
              subValue="Average"
            />
            <MetricCard
              icon={DollarSign}
              label="Earnings/Day"
              value={`$${analysis.earningsPerDay}`}
              subValue="Average"
              variant="success"
            />
          </div>

          {/* Detailed Analysis Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Metric Breakdown */}
            <div className="bg-card border border-border rounded-sm">
              <div className="px-3 py-2 border-b border-border">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Metric Breakdown</span>
              </div>
              <div className="p-3 space-y-0">
                <StatRow label="Address" value={`${analysis.address.slice(0, 12)}...`} variant="mono" />
                <StatRow label="Age" value={`${analysis.ageMonths} months`} />
                <StatRow label="Total ROI" value={`${analysis.totalRoi}%`} variant="success" />
                <StatRow label="3M ROI" value={`${analysis.last3mRoi}%`} variant={analysis.last3mRoi > 25 ? "success" : "default"} />
                <StatRow label="Max Drawdown" value={`${analysis.maxDrawdown}%`} variant="warning" />
                <StatRow label="Expectancy/Trade" value={`$${analysis.expectancyPerTrade}`} variant="mono" />
              </div>
            </div>

            {/* Activity Profile */}
            <div className="bg-card border border-border rounded-sm">
              <div className="px-3 py-2 border-b border-border">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Activity Profile</span>
              </div>
              <div className="p-3 space-y-0">
                <StatRow label="Trades per Day" value={analysis.tradesPerDay.toString()} variant="mono" />
                <StatRow label="Earnings per Day" value={`$${analysis.earningsPerDay}`} variant="success" />
                <StatRow label="Win Rate" value={`${analysis.winrate}%`} variant={analysis.winrate > 65 ? "success" : "muted"} />
                <StatRow label="Avg Bet Size" value={`$${analysis.avgBetSize.toLocaleString()}`} variant="mono" />
                <StatRow label="Max Bet Size" value={`$${analysis.maxBetSize.toLocaleString()}`} variant="mono" />
                <StatRow label="Max Spent/Day" value={`$${analysis.maxOwnSpentDay.toLocaleString()}`} variant="muted" />
              </div>
            </div>

            {/* Suitability Assessment */}
            <div className="bg-card border border-border rounded-sm">
              <div className="px-3 py-2 border-b border-border">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Copy Suitability</span>
              </div>
              <div className="p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Rating</span>
                  <SuitabilityBadge rating={analysis.suitabilityRating} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Score</span>
                  <span className="text-lg font-mono font-semibold text-foreground">{analysis.suitabilityScore}/100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Risk Profile</span>
                  <RiskBadge profile={analysis.riskProfile} />
                </div>
                <div className="pt-2 border-t border-border/50">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Behavior Notes</span>
                  <ul className="space-y-1">
                    {analysis.behaviorNotes.map((note, i) => (
                      <li key={i} className="text-[10px] text-muted-foreground flex items-start gap-1.5">
                        <span className="text-foreground mt-0.5">•</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Full Analysis Dialog
function FullAnalysisDialog({
  wallet,
  open,
  onClose,
}: {
  wallet: CandidateWallet | null
  open: boolean
  onClose: () => void
}) {
  if (!wallet) return null

  const analysis = generateWalletAnalysis(wallet.address)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-sm font-semibold flex items-center gap-3">
            <span className="font-mono">{wallet.address.slice(0, 12)}...{wallet.address.slice(-6)}</span>
            <SuitabilityBadge rating={analysis.suitabilityRating} />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            <MetricCard icon={TrendingUp} label="Total ROI" value={`${analysis.totalRoi}%`} variant={analysis.totalRoi > 150 ? "success" : "default"} />
            <MetricCard icon={BarChart3} label="3M ROI" value={`${analysis.last3mRoi}%`} variant={analysis.last3mRoi > 30 ? "success" : "default"} />
            <MetricCard icon={TrendingDown} label="Drawdown" value={`${analysis.maxDrawdown}%`} variant="warning" />
            <MetricCard icon={Percent} label="Win Rate" value={`${analysis.winrate}%`} variant={analysis.winrate > 65 ? "success" : "default"} />
            <MetricCard icon={Activity} label="Trades/Day" value={analysis.tradesPerDay.toString()} />
            <MetricCard icon={Target} label="Expectancy" value={`$${analysis.expectancyPerTrade}`} />
          </div>

          {/* Detailed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-card border border-border rounded-sm">
              <div className="px-3 py-2 border-b border-border">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Profile</span>
              </div>
              <div className="p-3 space-y-0">
                <StatRow label="Age" value={`${analysis.ageMonths} months`} />
                <StatRow label="Total ROI" value={`${analysis.totalRoi}%`} variant="success" />
                <StatRow label="3M ROI" value={`${analysis.last3mRoi}%`} />
                <StatRow label="Max Drawdown" value={`${analysis.maxDrawdown}%`} variant="warning" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-sm">
              <div className="px-3 py-2 border-b border-border">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Activity</span>
              </div>
              <div className="p-3 space-y-0">
                <StatRow label="Trades/Day" value={analysis.tradesPerDay.toString()} variant="mono" />
                <StatRow label="Earnings/Day" value={`$${analysis.earningsPerDay}`} variant="success" />
                <StatRow label="Win Rate" value={`${analysis.winrate}%`} />
                <StatRow label="Expectancy" value={`$${analysis.expectancyPerTrade}`} variant="mono" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-sm">
              <div className="px-3 py-2 border-b border-border">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Sizing</span>
              </div>
              <div className="p-3 space-y-0">
                <StatRow label="Avg Bet Size" value={`$${analysis.avgBetSize.toLocaleString()}`} variant="mono" />
                <StatRow label="Max Bet Size" value={`$${analysis.maxBetSize.toLocaleString()}`} variant="mono" />
                <StatRow label="Max Spent/Day" value={`$${analysis.maxOwnSpentDay.toLocaleString()}`} variant="muted" />
              </div>
            </div>
          </div>

          {/* Suitability */}
          <div className="bg-card border border-border rounded-sm">
            <div className="px-3 py-2 border-b border-border">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Copy Trading Suitability</span>
            </div>
            <div className="p-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between md:justify-start md:flex-col md:items-start gap-2">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Overall Rating</span>
                <SuitabilityBadge rating={analysis.suitabilityRating} />
              </div>
              <div className="flex items-center justify-between md:justify-start md:flex-col md:items-start gap-2">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Suitability Score</span>
                <span className="text-xl font-mono font-semibold text-foreground">{analysis.suitabilityScore}/100</span>
              </div>
              <div className="flex items-center justify-between md:justify-start md:flex-col md:items-start gap-2">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Risk Profile</span>
                <RiskBadge profile={analysis.riskProfile} />
              </div>
            </div>
            {analysis.behaviorNotes.length > 0 && (
              <div className="px-3 pb-3">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Analysis Notes</span>
                <ul className="space-y-1.5">
                  {analysis.behaviorNotes.map((note, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-foreground">•</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Main Page
export default function AnalyzerPage() {
  const [mode, setMode] = useState<"leaderboard" | "single">("leaderboard")
  const [selectedWallet, setSelectedWallet] = useState<CandidateWallet | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleOpenAnalysis = (wallet: CandidateWallet) => {
    setSelectedWallet(wallet)
    setDialogOpen(true)
  }

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
                Research and evaluate candidate wallets for copy trading
              </p>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="flex items-center gap-1 bg-card border border-border rounded-sm p-1 w-fit">
            <button
              onClick={() => setMode("leaderboard")}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-sm transition-colors",
                mode === "leaderboard"
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Leaderboard Scan
            </button>
            <button
              onClick={() => setMode("single")}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-sm transition-colors",
                mode === "single"
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Single Wallet
            </button>
          </div>

          {/* Mode Content */}
          {mode === "leaderboard" ? (
            <LeaderboardScanMode onOpenAnalysis={handleOpenAnalysis} />
          ) : (
            <SingleWalletMode />
          )}
        </div>
      </main>

      {/* Full Analysis Dialog */}
      <FullAnalysisDialog
        wallet={selectedWallet}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  )
}
