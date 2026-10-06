import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { registerLoaderCallbacks } from '../api/apiClient';
import PageSpinner from '../components/common/Loader/PageSpinner';

const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
  const [activeRequests, setActiveRequests] = useState(0);
  const [loaderMessage, setLoaderMessage] = useState('Processing request...');

  const showLoader = useCallback((msg = 'Processing request...') => {
    setLoaderMessage(msg);
    setActiveRequests((prev) => prev + 1);
  }, []);

  const hideLoader = useCallback(() => {
    setActiveRequests((prev) => Math.max(0, prev - 1));
  }, []);

  // Register Axios API interceptor callbacks
  useEffect(() => {
    registerLoaderCallbacks(
      () => showLoader('Communicating with Redberry Backend...'),
      () => hideLoader()
    );
  }, [showLoader, hideLoader]);

  const isLoading = activeRequests > 0;

  return (
    <LoadingContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}
      {isLoading && (
        <PageSpinner fullPage={true} />
      )}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
