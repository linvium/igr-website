"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 mb-6">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
          <h1 className="text-4xl font-serif font-bold mb-4">Nešto je pošlo po zlu</h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
            Došlo je do neočekivane greške. Molimo pokušajte ponovo ili se vratite na početnu stranicu.
          </p>
          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="bg-muted p-4 rounded-lg max-w-2xl mx-auto mb-8 text-left">
              <p className="text-sm font-mono text-destructive">{error.message}</p>
              {error.digest && (
                <p className="text-xs text-muted-foreground mt-2">Error ID: {error.digest}</p>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <Button onClick={reset} size="lg">
            Pokušaj ponovo
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/">Početna stranica</Link>
          </Button>
        </div>
      </div>
    </Container>
  )
}
