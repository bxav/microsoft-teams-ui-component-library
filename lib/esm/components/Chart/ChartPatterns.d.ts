import { TeamsTheme } from "../../themes";
import { IChartPatterns, ILineChartPatterns, EShapes } from "./ChartTypes";
export declare const lineChartPatterns: ILineChartPatterns[];
export declare const legendLabels: ({
  canvasRef,
  theme,
  colorScheme,
  dataPointColor,
  index,
  patterns,
}: {
  canvasRef: HTMLCanvasElement;
  theme: TeamsTheme;
  colorScheme: any;
  dataPointColor: string;
  index: number;
  patterns?: IChartPatterns | undefined;
}) => void;
export declare const chartLineStackedDataPointPatterns: IChartPatterns;
export declare const chartBarDataPointPatterns: IChartPatterns;
export declare const chartBubbleDataPointPatterns: IChartPatterns;
export declare class Entity {
  constructor(fields?: any);
}
export declare class Shape extends Entity {
  canvas?: HTMLCanvasElement;
  context?: CanvasRenderingContext2D | null;
  size: number;
  backgroundColor: string;
  patternColor: string;
  constructor(fields: Partial<Shape>);
  setStrokeProps(): void;
  setFillProps(): void;
}
export declare function buildPattern({
  shapeType,
  backgroundColor,
  patternColor,
  size,
}: {
  shapeType: EShapes;
  size: number;
  backgroundColor: string;
  patternColor: string;
}): CanvasPattern | null;
//# sourceMappingURL=ChartPatterns.d.ts.map
