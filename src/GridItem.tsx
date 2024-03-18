import React, { useContext, useEffect, useRef, CSSProperties, ReactNode, ComponentPropsWithoutRef } from "react";
import { useDrag, FullGestureState, Vector2 } from '@use-gesture/react';
import { animated, interpolate, useSpring } from "react-spring";
import { GridItemContext } from "./GridItemContext";
import { ChildRender } from "./grid-types";

interface GridItemProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  children: ReactNode | ChildRender;
}

export function GridItem({
  children,
  style,
  className,
  ...other
}: GridItemProps) {
  const context = useContext(GridItemContext);

  if (!context) {
    throw Error(
      "Unable to find GridItem context. Please ensure that GridItem is used as a child of GridDropZone"
    );
  }

  const {
    top,
    disableDrag,
    endTraverse,
    onStart,
    mountWithTraverseTarget,
    left,
    i,
    onMove,
    onEnd,
    grid,
    dragging: isDragging
  } = context;

  const { columnWidth, rowHeight } = grid;
  const dragging = useRef(false);
  const startCoords = useRef<Vector2>([left, top]);

  const [styles, set] = useSpring(() => {
    if (mountWithTraverseTarget) {
      // this feels really brittle. unsure of a better
      // solution for now.

      const mountXY = mountWithTraverseTarget;

      endTraverse();

      return {
        xy: mountXY,
        immediate: true,
        zIndex: "1",
        scale: 1.1,
        opacity: 0.8
      };
    }

    return {
      xy: [left, top],
      immediate: true,
      zIndex: "0",
      scale: 1,
      opacity: 1
    };
  });

  // handle move updates imperatively
  function handleMove(state: FullGestureState<'drag'>) {
    const x = startCoords.current[0] + state.movement[0];
    const y = startCoords.current[1] + state.movement[1];
    set({
      xy: [x, y],
      zIndex: "1",
      immediate: true,
      opacity: 0.8,
      scale: 1.1
    });
    onMove(state, x, y);
  }


  // handle end of drag
  function handleEnd(state: FullGestureState<'drag'>) {
    const x = startCoords.current[0] + state.movement[0];
    const y = startCoords.current[1] + state.movement[1];
    dragging.current = false;
    onEnd(state, x, y);
  }

  const bind = useDrag((state) => {
    const { active, movement: [mx, my], event, first, last } = state;

    if (disableDrag) return;

    console.log({
      active,
      first,
      last
    })

    if (first) {
      onStart();
      startCoords.current = [left, top];
      dragging.current = true;
    }
    if (last) handleEnd(state)
    else handleMove(state);

  }, { 
    // Options
    pointer: {
      buttons: [1], // Only allow the primary mouse button (left-click)
      touch: true,
      mouse: true, // This is the default in @use-gesture/react and matches 'enableMouse: true'
    },
    filterTaps: true,
  });

  /**
   * Update our position when left or top
   * values change
   */

  useEffect(() => {
    if (!dragging.current) {
      set({
        xy: [left, top],
        zIndex: "0",
        opacity: 1,
        scale: 1,
        immediate: false
      });
    }
  }, [dragging.current, left, top]);

  const props = {
    className:
      "GridItem" +
      (isDragging ? " dragging" : "") +
      (!!disableDrag ? " disabled" : "") +
      className
        ? ` ${className}`
        : "",
    ...bind(),
    style: {
      cursor: !!disableDrag ? "grab" : undefined,
      zIndex: styles.zIndex,
      position: "absolute",
      width: columnWidth + "px",
      opacity: styles.opacity,
      height: rowHeight + "px",
      boxSizing: "border-box",
      transform: interpolate(
        [styles.xy, styles.scale],
        (xy, s) =>
          `translate3d(${typeof xy === 'number' ? xy : xy[0]}px, ${typeof xy === 'number' ? xy : xy[1]}px, 0) scale(${s})`
      ),
      ...style
    },
    ...other
  };

  return typeof children === "function" ? (
    children(animated.div, props, {
      dragging: isDragging,
      disabled: !!disableDrag,
      i,
      grid
    })
  ) : (
    <animated.div {...props} style={props.style as CSSProperties}>{children}</animated.div>
  );
}