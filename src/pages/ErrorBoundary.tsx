import { Component, ErrorInfo, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Error } from "./Error";

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    return <Navigate to="/" replace />;
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return <Error onReset={this.handleReset} />;
    }
    return this.props.children;
  }
}
