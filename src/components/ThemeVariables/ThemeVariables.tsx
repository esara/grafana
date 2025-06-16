import React, { useEffect, useRef } from 'react';
import { useTheme2 } from '@grafana/ui';

interface ThemeVariablesProps {
    children: React.ReactNode;
}

/**
 * Defines grafana color tokens as css variables.
 * 
 */
export const ThemeVariables: React.FC<ThemeVariablesProps> = ({ children }) => {
    const theme = useTheme2();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) {
            return;
        }

        // Background colors
        el.style.setProperty('--background-color-canvas', theme.colors.background.canvas);
        el.style.setProperty('--background-color-primary', theme.colors.background.primary);
        el.style.setProperty('--background-color-secondary', theme.colors.background.secondary);
        el.style.setProperty('--background-color-elevated', theme.colors.background.elevated);

        // Text colors
        el.style.setProperty('--text-primary', theme.colors.text.primary);
        el.style.setProperty('--text-secondary', theme.colors.text.secondary);
        el.style.setProperty('--text-disabled', theme.colors.text.disabled);
        el.style.setProperty('--text-link', theme.colors.text.link);
        el.style.setProperty('--text-max-contrast', theme.colors.text.maxContrast);

        // Primary colors
        el.style.setProperty('--color-primary-main', theme.colors.primary.main);
        el.style.setProperty('--color-primary-shade', theme.colors.primary.shade);
        el.style.setProperty('--color-primary-transparent', theme.colors.primary.transparent);
        el.style.setProperty('--color-primary-border-text', theme.colors.primary.border);

        // Secondary colors
        el.style.setProperty('--color-secondary-main', theme.colors.secondary.main);
        el.style.setProperty('--color-secondary-shade', theme.colors.secondary.shade);
        el.style.setProperty('--color-secondary-transparent', theme.colors.secondary.transparent);
        el.style.setProperty('--color-secondary-border-text', theme.colors.secondary.border);

        // Success colors
        el.style.setProperty('--color-success-main', theme.colors.success.main);
        el.style.setProperty('--color-success-shade', theme.colors.success.shade);
        el.style.setProperty('--color-success-transparent', theme.colors.success.transparent);
        el.style.setProperty('--color-success-border-text', theme.colors.success.border);

        // Error colors
        el.style.setProperty('--color-error-main', theme.colors.error.main);
        el.style.setProperty('--color-error-shade', theme.colors.error.shade);
        el.style.setProperty('--color-error-transparent', theme.colors.error.transparent);
        el.style.setProperty('--color-error-border-text', theme.colors.error.border);

        // Warning colors
        el.style.setProperty('--color-warning-main', theme.colors.warning.main);
        el.style.setProperty('--color-warning-shade', theme.colors.warning.shade);
        el.style.setProperty('--color-warning-transparent', theme.colors.warning.transparent);
        el.style.setProperty('--color-warning-border-text', theme.colors.warning.border);

        // Info colors
        el.style.setProperty('--color-info-main', theme.colors.info.main);
        el.style.setProperty('--color-info-shade', theme.colors.info.shade);
        el.style.setProperty('--color-info-transparent', theme.colors.info.transparent);
        el.style.setProperty('--color-info-border-text', theme.colors.info.border);

        
        // Text sizes
        el.style.setProperty('--text-size-xs', '0.75rem');
        el.style.setProperty('--text-size-sm', '0.875rem');
        el.style.setProperty('--text-size-md', '1rem');
        el.style.setProperty('--text-size-lg', '1.125rem');
        el.style.setProperty('--text-size-xl', '1.25rem');
        el.style.setProperty('--text-size-2xl', '1.5rem');
        el.style.setProperty('--text-size-3xl', '1.875rem');
        el.style.setProperty('--text-size-4xl', '2.25rem');
        
        // Root cause colors
        el.style.setProperty('--urgent-root-cause-color', 'rgba(250, 77, 86, 0.3)');
        el.style.setProperty('--urgent-root-cause-color-transparent', 'rgba(250, 77, 86, 0.5)');
        el.style.setProperty('--urgent-root-cause-active-color', 'rgba(250, 77, 86, 0.7)');
        
    }, [theme]);

    return (
        <div ref={containerRef} style={{display: 'contents'}}>
            {children}
        </div>
    );
}; 