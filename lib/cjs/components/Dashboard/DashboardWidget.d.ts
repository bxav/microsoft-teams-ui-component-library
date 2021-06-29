import { ReactElement, ReactNode } from "react";
import {
  ThemePrepared,
  SiteVariablesPrepared,
} from "@fluentui/react-northstar";
import { IWidgetAction } from "./DashboardCallout";
import { IChartProps } from "../Chart/Chart";
import { TDashboardInteraction } from "./Dashboard";
import { TTextObject, TTranslations } from "../../translations";
/**
 * The widget’s target size in the Dashboard’s grid layout.
 * @public
 */
export declare enum EWidgetSize {
  /**
   * The widget will occupy 1×1 grid cells.
   */
  Single = "single",
  /**
   * The widget will occupy 2×1 grid cells.
   */
  Double = "double",
  /**
   * The widget will occupy 3×1 grid cells.
   */
  Triple = "triple",
  /**
   * The widget will occupy 2×2 grid cells.
   */
  Box = "box",
}
/**
 * A Dashboard widget is rendered as a card of a certain size, containing the content specified.
 * @public
 */
export interface IWidget {
  /**
   * A unique ID for the widget.
   */
  id: string;
  /**
   * The widget’s target size.
   */
  size: EWidgetSize;
  /**
   * The title of the widget, rendered in a header style.
   */
  title: TTextObject;
  /**
   * Text rendered in boxy test style below the title.
   */
  desc?: TTextObject;
  /**
   * A collection of actions available in the widget’s overflow menu.
   */
  widgetActionGroup?: IWidgetAction[];
  /**
   * The content to make available in the widget.
   */
  body?: IWidgetBodyContent[];
  /**
   * A link to render at the end of the widget’s content.
   */
  link?: IWidgetLink;
}
export declare const Widget: ({
  children,
  size,
}: {
  children: ReactNode;
  size: EWidgetSize;
}) => JSX.Element;
export declare const WidgetTitle: ({
  widgetId,
  title,
  desc,
  globalTheme,
  widgetActionGroup,
  hideWidget,
  t,
  onInteraction,
}: {
  widgetId: string;
  title: TTextObject;
  desc?: TTextObject;
  globalTheme: ThemePrepared;
  widgetActionGroup?: IWidgetAction[] | undefined;
  hideWidget: (widgetId: string) => void;
  t: TTranslations;
  onInteraction?: ((interaction: TDashboardInteraction) => void) | undefined;
}) => JSX.Element;
/**
 * A chart widget
 * @public
 */
export interface IChartWidgetContent {
  type: "chart" | string;
  chart: IChartProps;
}
/**
 * A placeholder widget
 * @internal
 */
interface IPlaceholderWidgetContent {
  type: "placeholder" | string;
  message: string;
}
/**
 * Widget content specifies a type, then a payload with a special key depending on the type of widget.
 * @public
 */
export declare type TWidgetContent =
  | IChartWidgetContent
  | IPlaceholderWidgetContent;
/**
 * A piece of content to make available in the widget.
 * @public
 */
export interface IWidgetBodyContent {
  /**
   * An ID unique to the piece of content.
   */
  id: string;
  /**
   * A title which will appear as a tab’s label in the Dashboard widget. This will only appear if
   * the widget hosts multiple body content objects.
   */
  title: TTextObject;
  /**
   * The content, as a React Node.
   */
  content: TWidgetContent | ReactElement;
}
export declare const WidgetBody: ({
  body,
  siteVariables,
  t,
}: {
  body?: IWidgetBodyContent[] | undefined;
  siteVariables: SiteVariablesPrepared;
  t: TTranslations;
}) => JSX.Element;
/**
 * @public
 */
export interface IWidgetLink {
  title?: TTextObject;
  href: string;
}
export declare const WidgetFooter: ({
  link,
  siteVariables,
  t,
  rtl,
}: {
  link: IWidgetLink;
  siteVariables: SiteVariablesPrepared;
  t: TTranslations;
  rtl: boolean;
}) => JSX.Element;
export {};
//# sourceMappingURL=DashboardWidget.d.ts.map
