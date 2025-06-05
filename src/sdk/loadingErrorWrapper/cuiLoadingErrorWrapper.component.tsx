import React from 'react';
import { LoadingPlaceholder } from '@grafana/ui';
import { StringsUtil } from 'utils/strings/strings.util';

interface LoadingErrorWrapperProps {
  isLoading: boolean;
  error: string | null;
  children: React.ReactNode;
}

export const CuiLoadingErrorWrapper: React.FC<LoadingErrorWrapperProps> = ({ 
  isLoading, 
  error, 
  children 
}) => {
  if (isLoading) {
    return <LoadingPlaceholder text="Loading..." />;
  }

  if (StringsUtil.isNotBlank(error)) {
    return <div>Error: {error}</div>;
  }

  return <>{children}</>;
}; 