import React from "react";
import { SiteVariablesPrepared } from "@fluentui/react-northstar";
import { IChartPatterns } from "../ChartTypes";
export declare const ChartContainer: ({
  data,
  children,
  siteVariables,
  chartDataPointColors,
  onLegendClick,
  verticalDataAlignment,
  patterns,
}: {
  data: any;
  children: React.ReactNode;
  siteVariables: SiteVariablesPrepared;
  chartDataPointColors: any;
  onLegendClick: (index: number) => void;
  verticalDataAlignment?: boolean | undefined;
  patterns?: IChartPatterns | undefined;
}) => JSX.Element;
//# sourceMappingURL=ChartContainer.d.ts.map
