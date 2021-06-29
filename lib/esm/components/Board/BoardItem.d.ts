import React from "react";
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import { TTextObject, TTranslations } from "../../translations";
import { TUsers } from "../..";
export interface IBoardItemProps {
  isDragging: boolean;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps;
  editItemDialog?: JSX.Element;
  t: TTranslations;
  item: IPreparedBoardItem;
  boardItemCardLayout: IBoardItemCardLayout;
  users: TUsers;
}
/**
 * The badges to display for a Board item. Currently only the attachments badge is supported.
 * @public
 */
export interface IBoardItemBadges {
  /**
   * If a Board item has attachments, it can be badged with a paperclip icon and the number
   * of attachments.
   */
  attachments?: number;
}
/**
 * An item in a Board component.
 * @public
 */
export interface IBoardItem {
  /**
   * The key of the lane where the item should be displayed.
   */
  lane: string;
  /**
   * A number which indicates where in the lane the item should be rendered. Items are sorted from
   * lowest value to highest value. Items in the same lane do not need unique values for this
   * property, however when unique values are not supplied a specific order is not guaranteed.
   */
  order: number;
  /**
   * The item’s title.
   */
  title: TTextObject;
  /**
   * The item’s subtitle.
   */
  subtitle?: TTextObject;
  /**
   * The item’s body text, or description. If this is provided as an array of text objects, each one
   * becomes a paragraph with some spacing between.
   */
  body?: TTextObject | TTextObject[];
  /**
   * An array of keys for users tagged in the item.
   */
  users?: string[];
  /**
   * A collection of badges for enumerating specific associations on the item.
   */
  badges?: IBoardItemBadges;
  /**
   * A URL to an image representing the item.
   */
  preview?: string;
}
/**
 * The collection of a Board’s items, keyed by the items’ unique ID.
 * @public
 */
export declare type TBoardItems = {
  [itemKey: string]: IBoardItem;
};
/**
 * A prepared Board item places the item’s unique key within itself so the item can be handled on
 * its own.
 * @public
 */
export interface IPreparedBoardItem extends IBoardItem {
  itemKey: string;
}
/**
 * Prepared Board items are arranged in an object of arrays keyed by the lane’s unique ID.
 * The items in the arrays are in the order in which they appear to the user (after any interactions
 * the user may have triggered).
 * @internal
 */
export interface IPreparedBoardItems {
  [laneKey: string]: IPreparedBoardItem[];
}
/**
 * The way a Board item’s content is mapped to the adaptive card used to represent the item.
 * @public
 */
export interface IBoardItemCardLayout {
  /**
   * Whether the image thumbnail for the item, when there is one, should be displayed at the top of
   * the card, or below the header for the card.
   */
  previewPosition: "top" | "afterHeader";
  /**
   * Whether the overflow menu’s trigger, a ‘…’ button, should appear:
   * - in the card’s preview, when there is one, or the header when there is no preview
   * - in the card’s header at all times
   * - in the card’s footer at all times (this causes all items to have a footer)
   */
  overflowPosition: "preview" | "header" | "footer";
}
export declare const BoardItem: React.MemoExoticComponent<(
  props: IBoardItemProps
) => JSX.Element>;
//# sourceMappingURL=BoardItem.d.ts.map
