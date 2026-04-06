"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { KPICards, StatusBar } from "@/components/dashboard/kpi-cards"
import { WalletTabs, wallets } from "@/components/dashboard/wallet-tabs"
import { WalletDetail } from "@/components/dashboard/wallet-detail"
import {
  ControlPanel,
  RiskPanel,
  AnalyzerPanel,
  TradesPanel,
} from "@/components/dashboard/ops-panels"

export default function Dashboard() {
  const [selectedWalletId, setSelectedWalletId] = useState("1")
  const selectedWallet = wallets.find((w) => w.id === selectedWalletId) || null

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto bg-background">
        <div className="p-3 lg:p-4 space-y-3 lg:space-y-4 min-h-full">
          {/* Top: Trading Performance KPIs */}
          <div className="flex flex-col gap-2">
            <KPICards />
            <StatusBar />
          </div>

          {/* Wallet Tabs + Detail */}
          <div className="flex flex-col">
            <WalletTabs
              selectedId={selectedWalletId}
              onSelect={setSelectedWalletId}
            />
            <div className="h-[300px]">
              <WalletDetail wallet={selectedWallet} />
            </div>
          </div>

          {/* Lower Operational Panels */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <ControlPanel />
            <RiskPanel />
            <AnalyzerPanel />
            <TradesPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
