/// <reference types="react" />
import { IChartData, EChartTypes } from "./ChartTypes";
import { TTextObject } from "../../translations";
/**
 * The Chart component can be used to render data visualizations. Designs for this component are
 * available in the [Data visualizations page of the Microsoft Teams UI Kit](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A4091).
 * @public
 */
export interface IChartProps {
  /**
   * The chart’s title, displayed above the chart.
   */
  title: TTextObject;
  /**
   * Which type of visualization to use to display the Chart’s data.
   */
  type: EChartTypes;
  /**
   * The Chart’s data.
   */
  data?: IChartData;
}
/**
 * @public
 */
export declare function Chart({ title, type, data }: IChartProps): JSX.Element;
//# sourceMappingURL=Chart.d.ts.map
