/* FIRST — icon tinting.
 * Lucide RN icons don't inherit text color the way SVG `currentColor` does in
 * the web design system. This clones an icon element to inject the control's
 * color/size unless the caller set them explicitly — so controls own their
 * icon color, matching the CSS.
 */
import React from 'react';

export function tintIcon(
  node: React.ReactNode,
  color: string,
  size?: number,
): React.ReactNode {
  if (!React.isValidElement(node)) return node;
  const props = node.props as { color?: string; size?: number };
  return React.cloneElement(node as React.ReactElement<any>, {
    color: props.color ?? color,
    size: props.size ?? size,
  });
}
