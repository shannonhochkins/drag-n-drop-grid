import * as React from "react";
import { useMeasure } from "./use-measure";
import { GridContext } from "./GridContext";
import { GridSettings, MarkerRender } from "./grid-types";
import { swap } from "./swap";
import { getPositionForIndex, getTargetIndex } from "./helpers";
import { GridItemContext } from "./GridItemContext";
import { FullGestureState } from '@use-gesture/react';

export interface GridDropZoneProps
  extends React.HTMLAttributes<HTMLDivElement> {
  boxesPerRow: number;
  rowHeight: number;
  id: string;
  children: React.ReactNodeArray;
  disableDrag?: boolean;
  enableDropzoneMarker?: boolean;
  disableDrop?: boolean;
  style?: React.CSSProperties;
  renderMarker?: MarkerRender;
}

interface PlaceholderType {
  startIndex: number;
  targetIndex: number;
}

export function GridDropZone({
  id,
  boxesPerRow,
  children,
  style,
  disableDrag = false,
  disableDrop = false,
  enableDropzoneMarker = true,
  rowHeight,
  renderMarker,
  ...other
}: GridDropZoneProps) {
  const {
    traverse,
    startTraverse,
    endTraverse,
    register,
    measureAll,
    onChange,
    remove,
    getActiveDropId
  } = React.useContext(GridContext);

  const ref = React.useRef<HTMLDivElement>(null);
  const { bounds, remeasure } = useMeasure(ref);
  const [draggingIndex, setDraggingIndex] = React.useState<number | null>(null);
  const [placeholder, setPlaceholder] = React.useState<PlaceholderType | null>(
    null
  );

  const traverseIndex =
    traverse && !traverse.execute && traverse.targetId === id
      ? traverse.targetIndex
      : null;

  const grid: GridSettings = {
    columnWidth: bounds.width / boxesPerRow,
    boxesPerRow,
    rowHeight
  };

  const childCount = React.Children.count(children);

  /**
   * Register our dropzone with our grid context
   */

  React.useEffect(() => {
    register(id, {
      top: bounds.top,
      bottom: bounds.bottom,
      left: bounds.left,
      right: bounds.right,
      width: bounds.width,
      height: bounds.height,
      count: childCount,
      grid,
      disableDrop,
      remeasure
    });
  }, [childCount, disableDrop, bounds, id, grid]);

  /**
   * Unregister when unmounting
   */

  React.useEffect(() => {
    return () => remove(id);
  }, [id]);
  // keep an initial list of our item indexes. We use this
  // when animating swap positions on drag events
  const itemsIndexes: number[] = React.Children.map(children, (_, i) => i) ?? []

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        ...style
      }}
      {...other}
    >
      {grid.columnWidth === 0
        ? null
        : React.Children.map(children, (child, i) => {
            const isTraverseTarget =
              traverse &&
              traverse.targetId === id &&
              traverse.targetIndex === i;

            const order = placeholder
              ? swap(
                  itemsIndexes,
                  placeholder.startIndex,
                  placeholder.targetIndex
                )
              : itemsIndexes;

            const pos = getPositionForIndex(
              order.indexOf(i),
              grid,
              traverseIndex
            );

            /**
             * Handle a child being dragged
             * @param state
             * @param x
             * @param y
             */

            function onMove(state: FullGestureState<'drag'>, x: number, y: number) {
              if (!ref.current) return;

              if (draggingIndex !== i) {
                setDraggingIndex(i);
              }

              const targetDropId = getActiveDropId(
                id,
                x + grid.columnWidth / 2,
                y + grid.rowHeight / 2
              );

              if (targetDropId && targetDropId !== id) {
                startTraverse(id, targetDropId, x, y, i);
              } else {
                endTraverse();
              }
              const targetIndex =
                targetDropId !== id
                  ? childCount
                  : getTargetIndex(
                      i,
                      grid,
                      childCount,
                      state.movement[0],
                      state.movement[1]
                    );

              if (targetIndex !== i) {
                if (
                  (placeholder && placeholder.targetIndex !== targetIndex) ||
                  !placeholder
                ) {
                  setPlaceholder({
                    targetIndex,
                    startIndex: i
                  });
                }
              } else if (placeholder) {
                setPlaceholder(null);
              }
            }

            /**
             * Handle drag end events
             */

            function onEnd(state: FullGestureState<'drag'>, x: number, y: number) {
              const targetDropId = getActiveDropId(
                id,
                x + grid.columnWidth / 2,
                y + grid.rowHeight / 2
              );

              const targetIndex =
                targetDropId !== id
                  ? childCount
                  : getTargetIndex(
                      i,
                      grid,
                      childCount,
                      state.movement[0],
                      state.movement[1]
                    );

              // traverse?
              if (traverse) {
                onChange(
                  traverse.sourceId,
                  traverse.sourceIndex,
                  traverse.targetIndex,
                  traverse.targetId
                );
              } else {
                onChange(id, i, targetIndex);
              }

              setPlaceholder(null);
              setDraggingIndex(null);
            }

            function onStart() {
              measureAll();
            }
            let dropzoneElement = null;

            if ((isTraverseTarget && traverse !== null && i === traverse.targetIndex) || (placeholder !== null && i === placeholder.targetIndex)) {
              const targetIndex = isTraverseTarget ? traverse!.targetIndex : placeholder!.targetIndex;
              const [x, y] = getPositionForIndex(targetIndex, grid).xy;
              
              dropzoneElement = typeof renderMarker === 'function' ? renderMarker({
                x,
                y,
                width: grid.columnWidth,
                height: grid.rowHeight
              }, {
                grid: {
                  boxesPerRow,
                  rowHeight,
                  columnWidth: grid.columnWidth,
                },
                i,
                disabled: disableDrag,
                dragging: i === draggingIndex,
              }) : (
                <div
                  key="placeholder"
                  style={{
                    position: 'absolute',
                    left: x,
                    top: y,
                    width: grid.columnWidth,
                    height: grid.rowHeight,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    border: '2px dashed #999',
                  }}
                />
              );
            }

            return (
              <GridItemContext.Provider
                value={{
                  top: pos.xy[1],
                  disableDrag,
                  endTraverse,
                  mountWithTraverseTarget: isTraverseTarget
                    ? [traverse!.tx, traverse!.ty]
                    : undefined,
                  left: pos.xy[0],
                  i,
                  onMove,
                  onEnd,
                  onStart,
                  grid,
                  dragging: i === draggingIndex
                }}
              >
                {child}
                {enableDropzoneMarker && dropzoneElement}
              </GridItemContext.Provider>
            );
          })}
    </div>
  );
}
