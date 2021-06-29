/// <reference types="react" />
import { IWidget } from "./DashboardWidget";
import { TCacheKey } from "../../types/types";
/**
 * The Dashboard component summarizes disparate types of information into a series of widgets.
 * Designs for this component are available in the [Dashboard page of the Microsoft Teams UI Kit](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A3890).
 * @public
 */
export interface IDashboard {
  /**
   * The widgets to make available in this Dashboard.
   */
  widgets: IWidget[];
  /**
   * Any initial preferences that should be set for this user, in case you save users’ preferences remotely.
   */
  preferences?: IDashboardPreferences;
  /**
   * Set this `cacheKey` to save user’s preferences on their local clients.
   */
  cacheKey?: TCacheKey;
  /**
   * A Dashboard will emit onInteraction payloads when the user updates any preferences.
   */
  onInteraction?: (interaction: TDashboardInteraction) => void;
}
/**
 * A user’s preferences for the particular Dashboard component. For a given Dashboard instance,
 * a user may set certain widgets to be shown or hidden.
 * @public
 */
export interface IDashboardPreferences {
  widgetSettings: {
    [widgetKey: string]: {
      display: boolean;
    };
  };
}
/**
 * A Dashboard will emit onInteraction payloads when the user updates any preferences.
 * @public
 */
export declare type TDashboardInteraction =
  | IDashboardInteractionUpdatePreferences
  | IDashboardInteractionWidgetAction;
/**
 * The preferences update payload carries the preferences the developer should store for the user,
 * if appropriate.
 * @public
 */
export interface IDashboardInteractionUpdatePreferences {
  event: "update";
  target: "preferences";
  preferences: IDashboardPreferences;
}
/**
 * The widget action payload carries widget's action the user clicked on.
 * @public
 */
export interface IDashboardInteractionWidgetAction {
  event: "click";
  target: "action";
  widget: string;
  action: string;
}
/**
 * @public
 */
export declare function Dashboard({
  widgets,
  preferences,
  cacheKey,
  onInteraction,
}: IDashboard): JSX.Element;
//# sourceMappingURL=Dashboard.d.ts.map
