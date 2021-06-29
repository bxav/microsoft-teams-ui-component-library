import { TTextObject } from "../../translations";
/**
 * Currently only alphabetical sort is available.
 * @public
 */
export declare type TSortable = "alphabetical" | false;
/**
 * @public
 */
export interface IColumn {
  /**
   * The text content of the column's header cell.
   */
  title: TTextObject;
  /**
   * The icon to display before the column’s title in the header cell.
   */
  icon?: string;
  /**
   * The column’s minimum width in pixels.
   * @defaultValue `240`
   */
  minWidth?: number;
  /**
   * Whether the column can be hidden when horizontal space is constrained.
   * @defaultValue `false`
   */
  hideable?: boolean;
  /**
   * Columns with a lower `hidePriority` are hidden before columns with a higher `hidePriority`.
   * @defaultValue `Infinity`
   */
  hidePriority?: number;
  /**
   * Whether the column is sortable, and if so what sort to make available.
   */
  sortable?: TSortable;
}
export declare const defaultMinWidth = 240;
export declare const accessoryWidth = 40;
export declare const staticSpacing = 40;
export declare type Breakpoints = Map<number, Set<string>>;
export declare const columnMinWidth: (
  columnKey: string,
  columns: {
    [columnKey: string]: IColumn;
  }
) => number;
export default function getBreakpoints(
  columns: {
    [columnKey: string]: IColumn;
  },
  hasActions: boolean,
  selectable: boolean
): Breakpoints;
//# sourceMappingURL=tableBreakpoints.d.ts.map
