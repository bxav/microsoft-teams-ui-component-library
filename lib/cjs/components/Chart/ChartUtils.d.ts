import { SiteVariablesPrepared } from "@fluentui/react-northstar";
import Chart from "chart.js";
import { IChartData, IChartPatterns, IDraw } from "./ChartTypes";
export declare const random: (min: number, max: number) => number;
export declare const chartAxisCallback: (value: number | string) => string;
export declare const hexToRgb: (hex: string) => string | null;
export declare const usNumberFormat: (value: number | string) => string;
export declare function tooltipTrigger({
  chart,
  data,
  set,
  index,
  siteVariables,
  mergeDuplicates,
  patterns,
}: {
  chart: any;
  data: IChartData;
  set: number;
  index: number;
  siteVariables: SiteVariablesPrepared;
  mergeDuplicates?: boolean;
  patterns?: (colorSheme: any) => IDraw[];
}): void;
export declare const tooltipAxisYLine: ({ chart, ctx, tooltip }: any) => void;
export declare const tooltipAxisXLine: ({ chart, ctx, tooltip }: any) => void;
export declare const horizontalBarValue: ({ chart, ctx, stacked }: any) => void;
export declare const chartConfig: ({
  type,
}: {
  type: "line" | "bar" | "horizontalBar" | "pie" | "bubble";
}) => {
  type: "line" | "bar" | "horizontalBar" | "bubble" | "pie";
  options: {
    responsive: boolean;
    maintainAspectRatio: boolean;
    animation: {
      duration: number;
    };
    layout: {
      padding: {
        left: number;
        right: number;
        top: number;
        bottom: number;
      };
    };
    scaleLabel: {
      display: boolean;
    };
    elements: {
      line: {
        tension: number;
      };
    };
    hover: {
      mode: string;
      intersect: boolean;
    };
    tooltips: {
      yPadding: number;
      xPadding: number;
      caretPadding: number;
      titleFontStyle: string;
      titleFontSize: number;
      bodySpacing: number;
      bodyFontSize: number;
      bodyFontStyle: string;
      footerFontStyle: string;
      footerFontSize: number;
      callbacks: {
        title: (tooltipItems: any) => any;
        label: (tooltipItem: any, data: any) => any;
        footer: (tooltipItems: any) => any;
      };
    };
    scales: {
      xAxes: {
        ticks: {
          fontSize: number;
          padding: number;
          labelOffset: number;
          maxRotation: number;
          minRotation: number;
          callback: (value: number | string) => string;
        };
        gridLines: {
          borderDash: number[];
          zeroLineBorderDash: number[];
        };
      }[];
      yAxes: {
        stacked: boolean;
        ticks: {
          callback: (value: number | string) => string;
          fontSize: number;
          padding: number;
          labelOffset: number;
          maxTicksLimit: number;
        };
        gridLines: {
          lineWidth: number;
          drawBorder: boolean;
          drawTicks: boolean;
          tickMarkLength: number;
        };
      }[];
    };
  };
};
export declare const axesConfig: ({
  chart,
  ctx,
  colorScheme,
}: {
  chart: any;
  ctx: CanvasRenderingContext2D;
  colorScheme: any;
}) => void;
export declare const setTooltipColorScheme: ({
  chart,
  siteVariables,
  chartDataPointColors,
  patterns,
  verticalDataAlignment,
}: {
  chart: Chart;
  siteVariables: SiteVariablesPrepared;
  chartDataPointColors: string[];
  patterns?: IChartPatterns | undefined;
  verticalDataAlignment?: boolean | undefined;
}) => void;
export declare const tooltipConfig: () => {
  yPadding: number;
  xPadding: number;
  caretPadding: number;
  titleFontStyle: string;
  titleFontSize: number;
  bodySpacing: number;
  bodyFontSize: number;
  bodyFontStyle: string;
  footerFontStyle: string;
  footerFontSize: number;
  callbacks: {
    title: (tooltipItems: any) => any;
    label: (tooltipItem: any, data: any) => any;
    footer: (tooltipItems: any) => any;
  };
};
//# sourceMappingURL=ChartUtils.d.ts.map
