import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from '@/app/App.tsx'
import '@/styles/index.css'
import { QueryProvider } from "./app/providers/query-provider";

const PageLoader = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <QueryProvider>
      <Suspense fallback={<PageLoader />}>
        <App />
      </Suspense>
    </QueryProvider>
  </React.StrictMode >
);