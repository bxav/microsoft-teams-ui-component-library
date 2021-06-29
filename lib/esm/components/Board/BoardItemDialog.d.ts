import { Dispatch, SetStateAction } from "react";
import { TTranslations } from "../../translations";
import { IPreparedBoardItem, IPreparedBoardItems } from "./BoardItem";
import { TBoardLanes } from "./BoardLane";
import { TUsers } from "../../types/types";
export declare enum BoardItemDialogAction {
  Create = 0,
  Edit = 1,
}
export interface BoardItemDialogProps {
  action: BoardItemDialogAction;
  trigger: JSX.Element;
  initialState: Partial<IPreparedBoardItem>;
  arrangedLanes: TBoardLanes;
  setArrangedItems: Dispatch<SetStateAction<IPreparedBoardItems>>;
  arrangedItems: IPreparedBoardItems;
  users: TUsers;
  t: TTranslations;
}
export declare const BoardItemDialog: ({
  action,
  trigger,
  initialState,
  arrangedLanes,
  setArrangedItems,
  arrangedItems,
  users,
  t,
}: BoardItemDialogProps) => JSX.Element;
//# sourceMappingURL=BoardItemDialog.d.ts.map
