import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

// ErrorBoundary を「名前付き」でエクスポートします
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold text-red-500">エラーが発生しました</h2>
          <button 
            className="mt-2 text-brand-purple underline"
            onClick={() => window.location.reload()}
          >
            再読み込みする
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
