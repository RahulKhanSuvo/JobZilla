import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AlertCircle, Home, RefreshCcw, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

export default function GlobalErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  let title = "Something went wrong";
  let message = "An unexpected error occurred. Our team has been notified.";
  let errorCode = "500";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "Page Not Found";
      message = "The page you are looking for doesn't exist or has been moved.";
      errorCode = "404";
    } else if (error.status === 401) {
      title = "Unauthorized";
      message = "You don't have permission to access this page.";
      errorCode = "401";
    } else if (error.status === 503) {
      title = "Service Unavailable";
      message = "The server is currently unable to handle the request.";
      errorCode = "503";
    }
  }

  const stack =
    error instanceof Error ? error.stack : JSON.stringify(error, null, 2);
  const errorMessage = error instanceof Error ? error.message : "Unknown error";

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-slate-950 px-4 py-12 relative overflow-hidden font-sans">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-destructive/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full text-center space-y-8 relative z-10"
      >
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mb-6 p-6 bg-destructive/10 rounded-3xl"
          >
            <AlertCircle size={80} className="text-destructive" />
          </motion.div>
          <h1 className="text-8xl font-black text-slate-100 dark:text-slate-900 absolute -top-10 -z-10 opacity-50">
            {errorCode}
          </h1>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
            {title}
          </h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-md mx-auto font-medium leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => window.location.reload()}
            variant="default"
            size="lg"
            className="h-14 px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 w-full sm:w-auto"
          >
            <RefreshCcw size={20} />
            Try Again
          </Button>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            size="lg"
            className="h-14 px-8 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-xl transition-all hover:bg-slate-50 dark:hover:bg-slate-900 flex items-center gap-2 w-full sm:w-auto"
          >
            <Home size={20} />
            Back to Home
          </Button>
        </div>

        {/* Technical Details for debugging */}
        {import.meta.env.DEV && (
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full mt-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 overflow-hidden"
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-between py-6 px-4 hover:bg-transparent text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest"
              >
                <span>Technical details</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-300",
                    isOpen && "rotate-180",
                  )}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-6">
              <div className="mt-4 p-4 bg-slate-100 dark:bg-black rounded-xl text-left overflow-auto max-h-64 font-mono text-sm border border-slate-200 dark:border-slate-800">
                <p className="text-destructive font-bold mb-2">
                  {errorMessage}
                </p>
                <pre className="text-slate-500 dark:text-slate-400 whitespace-pre-wrap break-all leading-relaxed">
                  {stack}
                </pre>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </motion.div>
    </div>
  );
}
