import React, { FC, memo, ReactElement, useMemo } from 'react';
import { EqualityUtil } from 'utils/equality/equality.util';

type CUIRenderWhenProps = {
  condition: boolean;
  children: React.ReactNode | (() => React.ReactNode);
};

/**
 * The CUIRenderWhen renders children only when the condition is true. If false, it renders nothing (or null).
 *
 * Use when you need to render only when a condition is met.
 *
 * If the condition is computed from a complex or expensive operation, memoize it using useMemo or handle it
 * efficiently in the parent component.
 * eg: ```tsx
 * const condition = useMemo(() => expensiveConditionCalculation(), [dependency]);
 * ```
 *
 * Usage:
 * ```tsx
 * // Eager Evaluation
 * // JSX is eagerly evaluated.
 * // The children are rendered only when the condition is true
 * <CUIRenderWhen condition={isVisible}>
 *   <div>{myValue?.test}</div>
 * </CUIRenderWhen>
 * ```
 *
 * ```tsx
 * // Lazy Evaluation
 * // The function is called only if isVisible is true.
 * const renderContent = useCallback(() => <div>{myValue?.test}</div>, [myValue]);
 * <CUIRenderWhen condition={isVisible}>{renderContent}</CUIRenderWhen>
 * ```
 */
export const CUIRenderWhen: FC<CUIRenderWhenProps> = memo(function CUIRenderWhen({
  condition,
  children,
}: CUIRenderWhenProps): ReactElement {
  const renderedChildren = useMemo(() => {
    if (!condition) {return null;}

    return typeof children === 'function' ? children() : children;
  }, [condition, children]);

  return renderedChildren ? <>{renderedChildren}</> : null;
}, EqualityUtil.areEqual);
