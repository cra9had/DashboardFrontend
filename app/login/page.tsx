"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation - in production this would be a real auth check
    if (email && password) {
      router.push("/")
    } else {
      setError("Please enter valid credentials")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-8 h-8 rounded bg-accent flex items-center justify-center">
            <span className="text-sm font-bold text-accent-foreground">P</span>
          </div>
          <span className="ml-2 text-lg font-semibold text-foreground tracking-tight">
            Polymarket Ops
          </span>
        </div>

        {/* Login Form */}
        <div className="bg-card border border-border rounded-sm p-6">
          <div className="mb-6">
            <h1 className="text-sm font-semibold text-foreground">Sign In</h1>
            <p className="text-[10px] text-muted-foreground mt-1">
              Enter your credentials to access the dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="operator@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 text-sm"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-9 text-sm"
                disabled={isLoading}
                required
              />
            </div>

            {error && (
              <div className="text-[10px] text-destructive bg-destructive/10 px-3 py-2 rounded-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-9"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-[10px] text-muted-foreground">
            Internal access only. Contact admin for credentials.
          </p>
        </div>
      </div>
    </div>
  )
}
