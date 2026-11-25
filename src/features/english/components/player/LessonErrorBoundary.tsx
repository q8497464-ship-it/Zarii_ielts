import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw, ArrowLeft } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';

interface Props {
  children: ReactNode;
  fallbackUrl?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class LessonErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('LessonErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6">
          <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Lesson Player Interrupted
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A non-fatal issue occurred while displaying this exercise. Your other lessons and test records are completely safe.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  if (this.props.onReset) this.props.onReset();
                  else window.location.reload();
                }}
                className="w-full sm:w-auto gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                Reload Lesson
              </Button>

              <Button
                size="sm"
                onClick={() => {
                  window.location.href = this.props.fallbackUrl || '/app/english/course';
                }}
                className="w-full sm:w-auto gap-1.5 bg-[#124F40] hover:bg-[#0e3f33] text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Course Map
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
