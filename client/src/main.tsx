import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // 실패 시 재시도 안 함
      refetchOnWindowFocus: false,
    },
  },
});

async function enableMocking() {
  if (import.meta.env.VITE_MOCK_SERVICE === 'develop') {
    const { worker } = await import('./mocks/browser.ts');
    return worker.start({
      onUnhandledRequest(req) {
        if (req.url.startsWith('chrome-extension://')) {
          return;
        }
      },
    });
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>,
  );
});
