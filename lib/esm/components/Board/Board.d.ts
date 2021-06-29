/// <reference types="react" />
import { TUsers, TCommunicationProps } from "../..";
import { TBoardLanes } from "./BoardLane";
import {
  TBoardItems,
  IPreparedBoardItems,
  IBoardItemCardLayout,
} from "./BoardItem";
/**
 * This payload is emitted when the user updates the Board’s lanes, which occurs when the user adds
 * or removes a lane, or rearranges the lanes.
 * @public
 */
export interface IBoardInteractionUpdateLanes {
  event: "update";
  target: "lanes";
  lanes: TBoardLanes;
}
/**
 * This payload is emitted when the user updates the Board’s items, which occurs when the user
 * creates a new item, deletes an item, or edits an item.
 * @public
 */
export interface IBoardInteractionUpdateItems {
  event: "update";
  target: "items";
  items: IPreparedBoardItems;
}
/**
 * The interaction payloads emitted by the Board component is either an update of the Board’s lanes,
 * or an update of the Board’s items.
 * @public
 */
export declare type TBoardInteraction =
  | IBoardInteractionUpdateLanes
  | IBoardInteractionUpdateItems;
/**
 * The Board component can be used to render kanban and task board experiences in your app. Designs
 * for this component are available in the [Task board page of the Microsoft Teams UI Kit](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A3840).
 * @public
 */
export interface IBoardProps {
  /**
   * The users the Board’s items may associate with. To improve performance, this object should contain
   * only the users associated with any items in the Board.
   */
  users: TUsers;
  /**
   * The Board’s lanes, or columns.
   */
  lanes: TBoardLanes;
  /**
   * The Board’s items.
   */
  items: TBoardItems;
  /**
   * If the cards representing the Board’s items should be different from the default, that design
   * can be configured here.
   */
  boardItemCardLayout?: IBoardItemCardLayout;
  /**
   * The empty state Communication component to render if this Component has no content.
   */
  emptyState?: TCommunicationProps;
  /**
   * The Board’s interaction handler, called when the user changes the Board’s items or lanes.
   */
  onInteraction?: (interaction: TBoardInteraction) => void;
}
/**
 * @public
 */
export declare const Board: (props: IBoardProps) => JSX.Element;
//# sourceMappingURL=Board.d.ts.map
