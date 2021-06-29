/// <reference types="react" />
import {
  ComponentEventHandler,
  ObjectShorthandCollection,
  PopupProps,
  TreeItemProps,
} from "@fluentui/react-northstar";
import { TToolbarLayout } from "./Toolbar";
import { TTranslations } from "../../translations";
export interface IExtendedToolbarFilterProps {
  layout: TToolbarLayout;
  filters: ObjectShorthandCollection<TreeItemProps, never>;
  singleSelect: boolean;
  open: boolean;
  onOpenChange: ComponentEventHandler<PopupProps>;
  toolbarMenuProps: any;
  toolbarButtonStyles: any;
  onSelectedFiltersChange?: (selectedFilters: string[]) => string[];
  t: TTranslations;
}
export declare const ToolbarFilter: (
  props: IExtendedToolbarFilterProps
) => JSX.Element | null;
//# sourceMappingURL=ToolbarFilter.d.ts.map
