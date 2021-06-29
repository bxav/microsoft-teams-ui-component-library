/// <reference types="react" />
import {
  ComponentEventHandler,
  PopupProps,
  ThemePrepared,
} from "@fluentui/react-northstar";
import { TDashboardInteraction } from "./Dashboard";
import { TTextObject, TTranslations } from "../../translations";
/**
 * An action item displayed in a widget’s overflow menu.
 * @public
 */
export interface IWidgetAction {
  /**
   * A unique ID to use to refer to the action.
   */
  id: string;
  /**
   * The icon
   */
  icon?: string;
  /**
   * The text content of the trigger for the action.
   */
  title: TTextObject;
}
interface IDashboardCallout {
  widgetId: string;
  open: boolean;
  onOpenChange: ComponentEventHandler<PopupProps>;
  menuProps: any;
  globalTheme: ThemePrepared;
  widgetActionGroup?: IWidgetAction[];
  hideWidget: (widgetId: string) => void;
  t: TTranslations;
  onInteraction?: (interaction: TDashboardInteraction) => void;
}
export declare const DashboardCallout: ({
  widgetId,
  open,
  onOpenChange,
  menuProps,
  globalTheme,
  widgetActionGroup,
  hideWidget,
  t,
  onInteraction,
}: IDashboardCallout) => JSX.Element;
export {};
//# sourceMappingURL=DashboardCallout.d.ts.map
