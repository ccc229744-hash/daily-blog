'use client'

import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    // 发送到错误监控服务
    this.sendToMonitoring(error, errorInfo)

    // 调用外部错误处理
    this.props.onError?.(error, errorInfo)

    this.setState({ error, errorInfo })
  }

  private sendToMonitoring(error: Error, errorInfo: ErrorInfo) {
    // 开发环境输出到控制台
    if (process.env.NODE_ENV === 'development') {
      console.error('🔴 Error Report:', {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      })
      return
    }

    // 生产环境发送到监控服务
    fetch('/api/error-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: {
          message: error.message,
          stack: error.stack,
        },
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    }).catch(console.error)
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">😕</div>
              <h1 className="text-2xl font-bold text-white mb-2">出错了</h1>
              <p className="text-gray-400 text-sm">
                {this.state.error?.message || '未知错误'}
              </p>
            </div>

            {/* 错误详情（仅开发环境） */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6">
                <summary className="text-sm text-gray-500 cursor-pointer mb-2">
                  错误详情
                </summary>
                <pre className="bg-gray-800 rounded-lg p-4 text-xs text-gray-400 overflow-auto max-h-48">
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            {/* 操作按钮 */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-red-500/30 transition"
              >
                刷新页面
              </button>
              <button
                onClick={() => window.history.back()}
                className="w-full py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-700 transition"
              >
                返回上一页
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className="w-full py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-700 transition"
              >
                返回首页
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
