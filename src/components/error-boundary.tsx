'use client'

import { Component, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the whole app
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    console.error('Error caught by boundary:', error, errorInfo)
    
    // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
    // if (process.env.NODE_ENV === 'production') {
    //   logErrorToService(error, errorInfo)
    // }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] px-4 py-16">
          <AlertTriangle className="w-16 h-16 text-destructive mb-6" />
          <h2 className="text-2xl font-serif font-semibold mb-3 text-center">
            Nešto je pošlo po zlu
          </h2>
          <p className="text-muted-foreground mb-8 text-center max-w-md">
            Došlo je do greške prilikom učitavanja sadržaja. Molimo pokušajte ponovo.
          </p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mb-6 p-4 bg-muted rounded-lg max-w-2xl w-full">
              <summary className="cursor-pointer font-medium mb-2">
                Detalji greške (samo u development modu)
              </summary>
              <pre className="text-xs overflow-auto">
                {this.state.error.message}
                {'\n\n'}
                {this.state.error.stack}
              </pre>
            </details>
          )}
          <div className="flex gap-4">
            <Button onClick={this.handleReset} variant="default">
              Pokušaj ponovo
            </Button>
            <Button onClick={() => window.location.href = '/'} variant="outline">
              Idi na početnu
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
