import React, { useEffect, useState } from 'react';
import { AppState } from 'utils/appState/AppState.util';
import { LoadingPlaceholder } from '@grafana/ui';

interface Props {
  children: React.ReactNode;
}

export const AppStateProvider: React.FC<Props> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeAppState = async () => {
      try {
        await AppState.instantiate();
        setIsInitialized(true);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize app state'));
      }
    };

    initializeAppState();
  }, []);

  if (error) {
    return (
      <div>
        Error initializing application: {error.message}
      </div>
    );
  }

  if (!isInitialized) {
    return <LoadingPlaceholder text="Initializing application..." />;
  }

  return <>{children}</>;
}; 
