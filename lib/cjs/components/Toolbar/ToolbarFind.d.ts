import { Dispatch, SetStateAction } from "react";
import { TToolbarLayout } from "./Toolbar";
import { TTranslations } from "../../translations";
export interface IToolbarFindProps {
  layout: TToolbarLayout;
  toolbarButtonStyles: any;
  findActive: boolean;
  setFindActive: Dispatch<SetStateAction<boolean>>;
  onFindQueryChange?: (findQuery: string) => string;
  t: TTranslations;
}
export declare const ToolbarFind: ({
  layout,
  onFindQueryChange,
  findActive,
  setFindActive,
  toolbarButtonStyles,
  t,
}: IToolbarFindProps) => JSX.Element;
//# sourceMappingURL=ToolbarFind.d.ts.map
