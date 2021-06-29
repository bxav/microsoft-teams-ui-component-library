/// <reference types="react" />
import { TTextObject, TTranslations } from "../../translations";
import {
  IPreparedBoardItem,
  IBoardItemCardLayout,
  IBoardItem,
} from "./BoardItem";
import { TUsers } from "../../types/types";
export interface IBoardLaneProps {
  lane?: TBoardLane;
  laneKey: string;
  last?: boolean;
  first?: boolean;
  addItemDialog?: JSX.Element;
  editItemDialog?: (boardItem: IBoardItem) => JSX.Element;
  preparedItems: IPreparedBoardItem[];
  users: TUsers;
  t: TTranslations;
  rtl: boolean;
  boardItemCardLayout: IBoardItemCardLayout;
  placeholderPosition: TPlaceholderPosition;
  exitPendingLane?: (value: string) => void;
  moveLane?: (laneKey: string, delta: -1 | 1) => void;
  deleteLane?: (laneKey: string) => void;
  pending?: boolean;
}
/**
 * Board lanes currently only need a `title`.
 * @public
 */
export declare type TBoardLane = {
  title: TTextObject;
};
/**
 * Each Board lane has a unique key, which is associated with the lane’s configuration.
 * @public
 */
export declare type TBoardLanes = {
  [laneKey: string]: TBoardLane;
};
export declare type TPlaceholderPosition =
  | null
  | [number, number, number, number];
export declare const BoardLane: (props: IBoardLaneProps) => JSX.Element;
//# sourceMappingURL=BoardLane.d.ts.map
