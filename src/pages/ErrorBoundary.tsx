import { Component, ErrorInfo, ReactNode } from "react";
import Error from "../components/Error"; 

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (import.meta.env.MODE === "development") {
      console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    // You can also log this to a service like Sentry here
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Error
          onReset={this.handleReset}
          message={
            import.meta.env.MODE === "development"
              ? "A detailed error occurred. Check console for more info."
              : "Something went wrong. Please try again later."
          }
        />
      );
    }

    return this.props.children;
  }
}
