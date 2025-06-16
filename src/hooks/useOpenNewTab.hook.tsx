import { useCallback } from 'react';

/**
 * Hook that provides a function to open external links in a new tab
 * @returns A function that opens the provided URL in a new tab
 */
export const useOpenNewTab = () => {
  const openExternalLink = useCallback((url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.click();
  }, []);

  return openExternalLink;
};
