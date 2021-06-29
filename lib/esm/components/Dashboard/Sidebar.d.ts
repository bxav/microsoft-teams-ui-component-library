/// <reference types="react" />
import { TTranslations } from "../../translations";
import { IWidget } from "./DashboardWidget";
import { IDashboardPreferences } from "./Dashboard";
interface ISidebarProps {
  open: boolean;
  onClose: () => void;
  widgets: IWidget[];
  t: TTranslations;
  preferencesState: IDashboardPreferences;
  updatePreferences: (preferences: IDashboardPreferences) => void;
}
/**
 * @internal
 */
export declare const Sidebar: ({
  t,
  open,
  onClose,
  widgets,
  preferencesState,
  updatePreferences,
}: ISidebarProps) => JSX.Element;
export {};
//# sourceMappingURL=Sidebar.d.ts.map
