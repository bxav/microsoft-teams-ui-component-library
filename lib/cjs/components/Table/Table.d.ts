/// <reference types="react" />
import { PropsOfElement, ButtonProps } from "@fluentui/react-northstar";
import { IIconProps } from "../../lib/Icon";
import { IAvatarProps } from "../../lib/Avatar";
import { IColumn } from "./tableBreakpoints";
import { TActions, actionKey, TTextObject, EButtonVariants } from "../..";
export declare type columnKey = string;
export declare type rowKey = string;
export declare type TSelected = Set<rowKey>;
export interface IIconOrnament extends IIconProps {
  type: "icon";
}
export interface IAvatarOrnament
  extends Pick<IAvatarProps, "image" | "variant"> {
  type: "avatar";
  name: TTextObject;
}
/**
 * Table cell content ornaments can be avatars or icons.
 */
export declare type TContentOrnament = IAvatarOrnament | IIconOrnament;
/**
 * Content for a table cell can specify optional elements to display before and after the cell’s
 * text content.
 */
export interface ICellContent {
  before?: TContentOrnament;
  content: TTextObject;
  after?: TContentOrnament;
}
/**
 * Content for a table cell can be a button. When clicked, buttons emit an Interaction event.
 */
export interface ICellButtonContent
  extends Pick<ButtonProps, "iconPosition" | "disabled" | "iconOnly"> {
  type: "button";
  actionId: string;
  content: TTextObject;
  variant?: EButtonVariants;
  icon?: string;
}
/**
 * The content for a table cell
 */
export declare type TCellContent =
  | TTextObject
  | ICellContent
  | ICellButtonContent;
/**
 * A collection of data to display for a row, keyed by the column ID except for `actions`, which
 * contains the collection of actions to make available in the row’s overflow menu.
 * @public
 */
export interface IRow {
  [columnKey: string]: TCellContent | TActions | undefined;
  actions?: TActions;
}
/**
 * An interaction payload emitted by Table.
 * @public
 */
export declare type TTableInteraction = {
  event: "click";
  target: "table";
  subject: rowKey | rowKey[];
  action: actionKey;
};
/**
 * The Table component is used by the List template as its primary content.
 * @public
 */
export interface ITableProps extends PropsOfElement<"div"> {
  /**
   * A collection of columns to display, keyed by column ID.
   */
  columns: {
    [columnKey: string]: IColumn;
  };
  /**
   * A collection of rows to display, keyed by row ID.
   */
  rows: {
    [rowKey: string]: IRow;
  };
  /**
   * If true, limits content to a single line and truncate with the language’s default ellipsis,
   * or if false, content in each cell wraps exhaustively.
   */
  truncate?: boolean;
  /**
   * Whether the user can select rows. In the context of a List component, this supplies any actions
   * all rows have in common in the Toolbar instance above the Table.
   */
  selectable?: boolean;
  /**
   * @internal
   */
  onSelectedChange?: (selected: TSelected) => TSelected;
  /**
   * @internal
   */
  findQuery?: string;
  /**
   * @internal
   */
  filterBy?: (row: IRow) => boolean;
  /**
   * An interaction handler for the Table. Interactions are triggered when the user clicks on an
   * action in a row. If the Table is not rendered on its own, this may be proxied from its parent
   * component, e.g. the parent List.
   */
  onInteraction?: (interaction: TTableInteraction) => void;
}
/**
 * @public
 */
export declare const Table: (props: ITableProps) => JSX.Element;
//# sourceMappingURL=Table.d.ts.map
