/// <reference types="react" />
import {
  ObjectShorthandCollection,
  TreeItemProps,
} from "@fluentui/react-northstar";
import { actionKey, TActions } from "../..";
/**
 * A collection of action groups, keyed by group ID.
 * @public
 */
export declare type TActionGroups = {
  [actionGroupKey: string]: TActions;
};
export declare type TFilters = ObjectShorthandCollection<TreeItemProps, never>;
/**
 * The interaction payload sent when a user clicks on an action in the Toolbar. The action may
 * have one or more subjects if the action applies to entities in the main view, or it may be
 * `null` if the action has no subject.
 * @public
 */
export declare type TToolbarInteraction = {
  event: "click";
  target: "toolbar";
  subject: string | string[] | null;
  action: actionKey;
};
/**
 * The Toolbar component can be used to render a Toolbar above the main view, which can make
 * actions, find, and filter available. Designs for this component are available in the [Toolbar
 * page of the Microsoft Teams UI Kit](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A4186).
 * @public
 */
export interface IToolbarProps {
  /**
   * The groups of actions to make available in the Toolbar. Actions for different groups are
   * separated by a horizontal or vertical bar when adjacent.
   */
  actionGroups: TActionGroups;
  /**
   * The filters to make available in the Toolbar.
   */
  filters?: TFilters;
  /**
   * Whether the Toolbar should provide find functionality.
   */
  find?: boolean;
  /**
   * Whether to prevent multiple filters from being applied; when this is true and one filter is
   * already applied, if the user selects another filter the previous filter is removed and the new
   * filter is applied rather than both applying.
   */
  filtersSingleSelect?: boolean;
  /**
   * @internal
   */
  onSelectedFiltersChange?: (selectedFilters: string[]) => string[];
  /**
   * @internal
   */
  onFindQueryChange?: (findQuery: string) => string;
  /**
   * An interaction handler for the Toolbar. Interactions are triggered when the user clicks on an
   * action.
   */
  onInteraction?: (interaction: TToolbarInteraction) => void;
}
export declare type TToolbarLayout = "compact" | "verbose";
/**
 * @public
 */
export declare const Toolbar: (props: IToolbarProps) => JSX.Element;
//# sourceMappingURL=Toolbar.d.ts.map
