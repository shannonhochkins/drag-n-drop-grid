import { AnimatedComponent } from "react-spring";

export interface GridSettings {
  boxesPerRow: number;
  rowHeight: number;
  columnWidth: number;
}

export type GridState = {
  dragging: boolean;
  zoneDragging: boolean;
  disabled: boolean;
  i: number;
  grid: GridSettings;
};

export type ChildRender = (
  component: AnimatedComponent<'div'>,
  props: object,
  state: GridState
) => React.ReactNode;

export type MarkerRender = (
  gridSize: {
    x: number;
    y: number;
    width: number;
    height: number;
  },
  state: Omit<GridState, 'i'>
) => React.ReactNode;

/**
 * A traverse captures information about dragging a grid item
 * from one list to another.
 */

export interface TraverseType {
  sourceId: string;
  targetId: string;
  rx: number;
  ry: number;
  tx: number;
  ty: number;
  sourceIndex: number;
  targetIndex: number;
  execute?: boolean;
}
