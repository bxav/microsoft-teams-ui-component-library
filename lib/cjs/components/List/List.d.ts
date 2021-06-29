/// <reference types="react" />
import { ITableProps, TTableInteraction, columnKey } from "../Table/Table";
import { TActionGroups, TToolbarInteraction } from "../Toolbar/Toolbar";
import {
  TCommunicationProps,
  TCommunicationInteraction,
} from "../Communication";
/**
 * List interactions are proxied from the Table, the Toolbar, or the empty state Communication
 * component. All are clicks on actions.
 * @public
 */
export declare type TListInteraction =
  | TTableInteraction
  | TToolbarInteraction
  | TCommunicationInteraction;
/**
 * The List component can be used to display a list of items as a table which can be sorted,
 * filtered, and searched.. Designs for this component are available in the [List page of the Microsoft Teams UI Kit](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A3790).
 * @public
 */
export interface IListProps extends ITableProps {
  /**
   * The action groups to show when no items are selected.
   */
  emptySelectionActionGroups: TActionGroups;
  /**
   * The set of columns as column IDs to offer in the filter menu.
   */
  filters?: columnKey[];
  /**
   * Whether to prevent multiple filters from being applied; when this is true and one filter is
   * already applied, if the user selects another filter the previous filter is removed and the new
   * filter is applied rather than both applying.
   */
  filtersSingleSelect?: boolean;
  /**
   * Whether to provide the find feature, which filters the list by an arbitrary string input the
   * user can provide.
   */
  find?: boolean;
  /**
   * An interaction handler for the List. Interactions are triggered when the user clicks on an
   * action for the List or for an item in the List.
   */
  onInteraction?: (interaction: TListInteraction) => void;
  /**
   * The Communication component to render if the content of this component is empty.
   */
  emptyState?: TCommunicationProps;
}
/**
 * @public
 */
export declare const List: (props: IListProps) => JSX.Element;
//# sourceMappingURL=List.d.ts.map
