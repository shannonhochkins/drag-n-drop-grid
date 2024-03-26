import * as React from "react";
import { useMeasure } from "./use-measure";
import { GridContext } from "./GridContext";
import { GridSettings, MarkerRender } from "./grid-types";
import { swap } from "./swap";
import { getPositionForIndex, getTargetIndex } from "./helpers";
import { GridItemContext } from "./GridItemContext";
import { animated, to, useSpring } from "@react-spring/web";
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
    getDropzoneOptions,
    getActiveDropId,
  } = React.useContext(GridContext);
  const [styles, api] = useSpring(() => {
    return {
      xy: [0, 0],
      immediate: true,
      scale: 1,
      opacity: 1
    };
  })
  const ref = React.useRef<HTMLDivElement>(null);
  const { bounds, remeasure } = useMeasure(ref);
  const [zoneDragging, setZoneDragging] = React.useState(false);
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
  const itemsIndexes: number[] = React.Children.map(children, (_, i) => i) ?? [];

  const dropzoneElement = typeof renderMarker === 'function' ? renderMarker({
    x: styles.xy.get()[0],
    y: styles.xy.get()[1],
    width: grid.columnWidth,
    height: grid.rowHeight
  }, {
    grid: {
      boxesPerRow,
      rowHeight,
      columnWidth: grid.columnWidth,
    },
    disabled: disableDrag,
    zoneDragging,
    dragging: zoneDragging,
  }) : (
    <animated.div key="placeholder" style={{
      position: 'absolute',
      width: grid.columnWidth,
      height: grid.rowHeight,
      userSelect: 'none',
      backgroundColor: 'rgba(0,0,0,0.1)',
      border: '2px dashed #999',
      opacity: styles.opacity,
      zIndex: zoneDragging ? 1 : -1,
      transform: to(
        [styles.xy, styles.scale],
        (xy, s) =>
          `translate3d(${typeof xy === 'number' ? xy : xy[0]}px, ${typeof xy === 'number' ? xy : xy[1]}px, 0) scale(${s})`
      ),
    }} />
  );

  const hideDropzone = () => {
    api.start({
      immediate: false,
      scale: 0.5,
      opacity: 0
    });
  }
  let matchedItem = false;
  if (React.Children.count(children) === 0 && traverse?.targetId === id && traverse?.targetIndex !== undefined) {
    const [x, y] = getPositionForIndex(traverse.targetIndex, grid).xy;
    api.start({
      xy: [x, y],
      immediate: false,
      scale: 1,
      opacity: 0.8
    });
    matchedItem = true;
  }
  const gridChildren = (<React.Fragment>
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
            if (!zoneDragging) {
              setZoneDragging(true);
            }

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
            setZoneDragging(false);
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

            hideDropzone();
            // traverse?
            if (traverse) {
              if (traverse.sourceId !== undefined && traverse.targetId !== undefined && traverse.sourceIndex !== undefined && traverse.targetIndex !== undefined) {
                onChange(
                  traverse.sourceId,
                  traverse.sourceIndex,
                  traverse.targetIndex,
                  traverse.targetId
                );
              }
            } else {
              onChange(id, i, targetIndex);
            }

            setPlaceholder(null);
            setDraggingIndex(null);
          }

          function onStart() {
            measureAll();
          }
          const isSwappingTraversing = isTraverseTarget && traverse !== null && i === traverse.targetIndex;
          const isSwappingPlaceholder = placeholder !== null && i === placeholder.targetIndex;
          const isTraverseOutside = (traverse !== null && traverse.targetIndex >= (getDropzoneOptions(traverse?.targetId)?.count ?? -1) && traverse.targetIndex >= i && traverse?.targetId === id);

          if (isSwappingTraversing || isSwappingPlaceholder || isTraverseOutside) {
            const targetIndex = isTraverseTarget || isTraverseOutside ? traverse?.targetIndex : placeholder?.targetIndex;
            if (targetIndex === undefined) return;
            const [x, y] = getPositionForIndex(targetIndex, grid).xy;
            api.start({
              xy: [x, y],
              immediate: false,
              scale: 1,
              opacity: 0.8
            });
            matchedItem = true;
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
                dragging: i === draggingIndex,
                zoneDragging
              }}
            >
              {child}
            </GridItemContext.Provider>
          );
        })}
  </React.Fragment>);

  if (matchedItem === false) {
    hideDropzone();
  }

  return (
    <animated.div
      ref={ref}
      style={{
        position: "relative",
        ...style
      }}
      {...other}
    >
      {gridChildren}
        {enableDropzoneMarker && dropzoneElement}
    </animated.div>
  );
}
