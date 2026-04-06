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
  Save,
  RotateCcw,
  Check,
  X,
  AlertTriangle,
} from "lucide-react"

interface SettingRowProps {
  label: string
  description?: string
  children: React.ReactNode
}

function SettingRow({ label, description, children }: SettingRowProps) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-border/50 last:border-0 gap-4">
      <div className="flex-1 min-w-0">
        <Label className="text-xs font-medium text-foreground">{label}</Label>
        {description && (
          <p className="text-[10px] text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-sm">
      <div className="px-3 py-2 border-b border-border">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</span>
      </div>
      <div className="px-3">{children}</div>
    </div>
  )
}

export default function RiskPage() {
  const [hasChanges, setHasChanges] = useState(false)
  const [saved, setSaved] = useState(false)

  // Execution settings
  const [maxSlippage, setMaxSlippage] = useState("2.5")
  const [maxPriceDeviation, setMaxPriceDeviation] = useState("3.0")
  const [orderTimeout, setOrderTimeout] = useState("30")
  const [retryAttempts, setRetryAttempts] = useState("3")
  const [dryRunMode, setDryRunMode] = useState(false)

  // Delay / Safety settings
  const [maxDelay, setMaxDelay] = useState("60")
  const [minLiquidity, setMinLiquidity] = useState("5000")
  const [maxSlippageThreshold, setMaxSlippageThreshold] = useState("5.0")

  // Sizing settings
  const [sizingMode, setSizingMode] = useState("fixed")
  const [fixedAmount, setFixedAmount] = useState("500")
  const [proportionalMultiplier, setProportionalMultiplier] = useState("1.0")
  const [perWalletCoefficient, setPerWalletCoefficient] = useState("1.0")

  // Exposure limits
  const [maxTotalRisk, setMaxTotalRisk] = useState("50000")
  const [maxPositionSize, setMaxPositionSize] = useState("10000")
  const [minPositionSize, setMinPositionSize] = useState("100")
  const [maxOpenPositions, setMaxOpenPositions] = useState("25")

  // Market category filters
  const [whitelistCategories, setWhitelistCategories] = useState<string[]>(["sports", "crypto"])
  const [blacklistCategories, setBlacklistCategories] = useState<string[]>(["adult", "violence"])

  // Available categories
  const categories = [
    { id: "sports", label: "Sports", slug: "General sports markets" },
    { id: "soccer", label: "Soccer", slug: "Football/soccer leagues" },
    { id: "nba", label: "NBA", slug: "Basketball markets" },
    { id: "nfl", label: "NFL", slug: "American football" },
    { id: "crypto", label: "Crypto", slug: "Cryptocurrency prices" },
    { id: "politics", label: "Politics", slug: "Elections & policy" },
    { id: "finance", label: "Finance", slug: "Stocks & economy" },
    { id: "entertainment", label: "Entertainment", slug: "Movies, TV, awards" },
    { id: "science", label: "Science", slug: "Research & discoveries" },
    { id: "weather", label: "Weather", slug: "Climate events" },
    { id: "esports", label: "Esports", slug: "Gaming competitions" },
    { id: "adult", label: "Adult Content", slug: "18+ markets" },
    { id: "violence", label: "Violence", slug: "Conflict & war" },
    { id: "mma", label: "MMA/UFC", slug: "Combat sports" },
  ]

  const handleChange = () => {
    setHasChanges(true)
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
    setHasChanges(false)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleReset = () => {
    setMaxSlippage("2.5")
    setMaxPriceDeviation("3.0")
    setOrderTimeout("30")
    setRetryAttempts("3")
    setDryRunMode(false)
    setMaxDelay("60")
    setMinLiquidity("5000")
    setMaxSlippageThreshold("5.0")
    setSizingMode("fixed")
    setFixedAmount("500")
    setProportionalMultiplier("1.0")
    setPerWalletCoefficient("1.0")
    setMaxTotalRisk("50000")
    setMaxPositionSize("10000")
    setMinPositionSize("100")
    setMaxOpenPositions("25")
    setHasChanges(false)
  }

  const toggleWhitelistCategory = (categoryId: string) => {
    setWhitelistCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
    handleChange()
  }

  const toggleBlacklistCategory = (categoryId: string) => {
    setBlacklistCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
    handleChange()
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto bg-background">
        <div className="p-3 lg:p-4 space-y-3 lg:space-y-4 min-h-full">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-sm font-semibold text-foreground">Risk Settings</h1>
              <p className="text-[10px] text-muted-foreground">Execution and risk configuration</p>
            </div>
            <div className="flex items-center gap-2">
              {hasChanges && (
                <span className="text-[10px] text-warning flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Unsaved changes
                </span>
              )}
              {saved && (
                <span className="text-[10px] text-success flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Saved
                </span>
              )}
              <Button variant="outline" size="sm" onClick={handleReset} disabled={!hasChanges}>
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </Button>
              <Button size="sm" onClick={handleSave} disabled={!hasChanges}>
                <Save className="w-3.5 h-3.5" />
                Save
              </Button>
            </div>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
            {/* Execution Settings */}
            <SettingsSection title="Execution">
              <SettingRow label="Maximum Slippage (%)" description="Max allowed price slippage per trade">
                <Input
                  type="number"
                  step="0.1"
                  value={maxSlippage}
                  onChange={(e) => { setMaxSlippage(e.target.value); handleChange() }}
                  className="h-8 w-24 text-xs text-right font-mono"
                />
              </SettingRow>
              <SettingRow label="Max Price Deviation (%)" description="Skip trade if price moves beyond threshold">
                <Input
                  type="number"
                  step="0.1"
                  value={maxPriceDeviation}
                  onChange={(e) => { setMaxPriceDeviation(e.target.value); handleChange() }}
                  className="h-8 w-24 text-xs text-right font-mono"
                />
              </SettingRow>
              <SettingRow label="Order Timeout (seconds)" description="Cancel order if not filled within time">
                <Input
                  type="number"
                  value={orderTimeout}
                  onChange={(e) => { setOrderTimeout(e.target.value); handleChange() }}
                  className="h-8 w-24 text-xs text-right font-mono"
                />
              </SettingRow>
              <SettingRow label="Retry Attempts" description="Number of retry attempts on failure">
                <Input
                  type="number"
                  value={retryAttempts}
                  onChange={(e) => { setRetryAttempts(e.target.value); handleChange() }}
                  className="h-8 w-24 text-xs text-right font-mono"
                />
              </SettingRow>
              <SettingRow label="Dry Run / Paper Mode" description="Simulate trades without execution">
                <Switch
                  checked={dryRunMode}
                  onCheckedChange={(checked) => { setDryRunMode(checked); handleChange() }}
                />
              </SettingRow>
            </SettingsSection>

            {/* Delay / Safety Settings */}
            <SettingsSection title="Delay / Safety">
              <SettingRow label="Max Acceptable Delay (seconds)" description="Skip if signal is older than threshold">
                <Input
                  type="number"
                  value={maxDelay}
                  onChange={(e) => { setMaxDelay(e.target.value); handleChange() }}
                  className="h-8 w-24 text-xs text-right font-mono"
                />
              </SettingRow>
              <SettingRow label="Minimum Liquidity (USDC)" description="Required orderbook depth to execute">
                <Input
                  type="number"
                  value={minLiquidity}
                  onChange={(e) => { setMinLiquidity(e.target.value); handleChange() }}
                  className="h-8 w-24 text-xs text-right font-mono"
                />
              </SettingRow>
              <SettingRow label="Max Slippage Threshold (%)" description="Hard limit for slippage protection">
                <Input
                  type="number"
                  step="0.1"
                  value={maxSlippageThreshold}
                  onChange={(e) => { setMaxSlippageThreshold(e.target.value); handleChange() }}
                  className="h-8 w-24 text-xs text-right font-mono"
                />
              </SettingRow>
            </SettingsSection>

            {/* Sizing / Allocation Settings */}
            <SettingsSection title="Sizing / Allocation">
              <SettingRow label="Sizing Mode" description="How to calculate order size">
                <Select value={sizingMode} onValueChange={(v) => { setSizingMode(v); handleChange() }}>
                  <SelectTrigger className="h-8 w-32 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed" className="text-xs">Fixed Amount</SelectItem>
                    <SelectItem value="proportional" className="text-xs">Proportional</SelectItem>
                    <SelectItem value="coefficient" className="text-xs">Coefficient</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
              <SettingRow label="Fixed Amount (USDC)" description="Fixed order size for each trade">
                <Input
                  type="number"
                  value={fixedAmount}
                  onChange={(e) => { setFixedAmount(e.target.value); handleChange() }}
                  className="h-8 w-24 text-xs text-right font-mono"
                  disabled={sizingMode !== "fixed"}
                />
              </SettingRow>
              <SettingRow label="Proportional Multiplier" description="Multiply source wallet trade size">
                <Input
                  type="number"
                  step="0.1"
                  value={proportionalMultiplier}
                  onChange={(e) => { setProportionalMultiplier(e.target.value); handleChange() }}
                  className="h-8 w-24 text-xs text-right font-mono"
                  disabled={sizingMode !== "proportional"}
                />
              </SettingRow>
              <SettingRow label="Per-Wallet Coefficient" description="Adjust sizing per wallet pair">
                <Input
                  type="number"
                  step="0.1"
                  value={perWalletCoefficient}
                  onChange={(e) => { setPerWalletCoefficient(e.target.value); handleChange() }}
                  className="h-8 w-24 text-xs text-right font-mono"
                  disabled={sizingMode !== "coefficient"}
                />
              </SettingRow>
            </SettingsSection>

            {/* Exposure Limits */}
            <SettingsSection title="Exposure Limits">
              <SettingRow label="Max Total Risk (USDC)" description="Maximum total exposure across all positions">
                <Input
                  type="number"
                  value={maxTotalRisk}
                  onChange={(e) => { setMaxTotalRisk(e.target.value); handleChange() }}
                  className="h-8 w-24 text-xs text-right font-mono"
                />
              </SettingRow>
              <SettingRow label="Max Position Size (USDC)" description="Maximum size for a single position">
                <Input
                  type="number"
                  value={maxPositionSize}
                  onChange={(e) => { setMaxPositionSize(e.target.value); handleChange() }}
                  className="h-8 w-24 text-xs text-right font-mono"
                />
              </SettingRow>
              <SettingRow label="Min Position Size (USDC)" description="Minimum size to open a position">
                <Input
                  type="number"
                  value={minPositionSize}
                  onChange={(e) => { setMinPositionSize(e.target.value); handleChange() }}
                  className="h-8 w-24 text-xs text-right font-mono"
                />
              </SettingRow>
              <SettingRow label="Max Open Positions" description="Limit on concurrent open positions">
                <Input
                  type="number"
                  value={maxOpenPositions}
                  onChange={(e) => { setMaxOpenPositions(e.target.value); handleChange() }}
                  className="h-8 w-24 text-xs text-right font-mono"
                />
              </SettingRow>
            </SettingsSection>

            {/* Market Category Filters - Full Width */}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
            {/* Whitelist Categories */}
            <SettingsSection title="Whitelist Categories">
              <div className="py-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categories.map((category) => {
                    const isSelected = whitelistCategories.includes(category.id)
                    const isBlacklisted = blacklistCategories.includes(category.id)
                    return (
                      <button
                        key={category.id}
                        onClick={() => !isBlacklisted && toggleWhitelistCategory(category.id)}
                        disabled={isBlacklisted}
                        className={cn(
                          "flex items-start gap-2 p-2 rounded-sm border text-left transition-colors",
                          isBlacklisted
                            ? "opacity-40 cursor-not-allowed border-border/50 bg-muted/20"
                            : isSelected
                            ? "border-success/50 bg-success/10 hover:bg-success/15"
                            : "border-border hover:border-border/80 hover:bg-muted/30"
                        )}
                      >
                        <div
                          className={cn(
                            "w-3.5 h-3.5 mt-0.5 rounded-sm border flex-shrink-0 flex items-center justify-center",
                            isSelected
                              ? "bg-success border-success"
                              : "border-muted-foreground/50"
                          )}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 text-success-foreground" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-medium text-foreground block">{category.label}</span>
                          <span className="text-[10px] text-muted-foreground block truncate">{category.slug}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">
                  {whitelistCategories.length === 0
                    ? "No whitelist set — all categories allowed"
                    : `${whitelistCategories.length} categories whitelisted`}
                </p>
              </div>
            </SettingsSection>

            {/* Blacklist Categories */}
            <SettingsSection title="Blacklist Categories">
              <div className="py-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categories.map((category) => {
                    const isSelected = blacklistCategories.includes(category.id)
                    const isWhitelisted = whitelistCategories.includes(category.id)
                    return (
                      <button
                        key={category.id}
                        onClick={() => !isWhitelisted && toggleBlacklistCategory(category.id)}
                        disabled={isWhitelisted}
                        className={cn(
                          "flex items-start gap-2 p-2 rounded-sm border text-left transition-colors",
                          isWhitelisted
                            ? "opacity-40 cursor-not-allowed border-border/50 bg-muted/20"
                            : isSelected
                            ? "border-destructive/50 bg-destructive/10 hover:bg-destructive/15"
                            : "border-border hover:border-border/80 hover:bg-muted/30"
                        )}
                      >
                        <div
                          className={cn(
                            "w-3.5 h-3.5 mt-0.5 rounded-sm border flex-shrink-0 flex items-center justify-center",
                            isSelected
                              ? "bg-destructive border-destructive"
                              : "border-muted-foreground/50"
                          )}
                        >
                          {isSelected && <X className="w-2.5 h-2.5 text-destructive-foreground" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-medium text-foreground block">{category.label}</span>
                          <span className="text-[10px] text-muted-foreground block truncate">{category.slug}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">
                  {blacklistCategories.length === 0
                    ? "No blacklist set — no categories blocked"
                    : `${blacklistCategories.length} categories blocked`}
                </p>
              </div>
            </SettingsSection>
          </div>
        </div>
      </main>
    </div>
  )
}
