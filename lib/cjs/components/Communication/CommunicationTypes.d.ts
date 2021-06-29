/// <reference types="react" />
import { TeamsTheme } from "../../themes";
import { TTextObject } from "../../translations";
/**
 * The illustration, text, and actions (if any) to use by default as the content of this component.
 * @public
 */
export declare enum CommunicationOptions {
  Default = "default",
  Welcome = "welcome",
  Hello = "hello",
  Empty = "empty",
  Error = "error",
  Thanks = "thanks",
}
/**
 * The interaction payload emitted by this component will only come from click interactions on any
 * action buttons specified in the props.
 * @public
 */
export declare type TCommunicationInteraction = {
  event: "click";
  target: string;
};
/**
 * The Communication component can be used to render empty state messages and other combinations of
 * illustration, coaching text, and actions. Designs for this component are available in the [Empty
 * state page of the Microsoft Teams UI Kit](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A4042).
 * @public
 */
export declare type TCommunicationProps =
  | {
      option?: CommunicationOptions;
      fields: TCommunicationFields;
      onInteraction?: (interaction: TCommunicationInteraction) => void;
    }
  | {
      option: CommunicationOptions;
      fields?: TCommunicationFields;
      onInteraction?: (interaction: TCommunicationInteraction) => void;
    };
/**
 * @public
 */
export declare type TCommunicationFields =
  | ICommunicationFields
  | ICommunicationFieldsWithThemedImage;
/**
 * The specific content to display in the component.
 * @public
 */
export interface ICommunicationFields {
  /**
   * The title, rendered as a header.
   */
  title?: TTextObject;
  /**
   * The body text, rendered as body text below any title.
   */
  desc?: TTextObject;
  /**
   * The image to use above the text content.
   */
  image?: ICommunicationImage;
  /**
   * The interactive buttons to render at the end of the content.
   */
  actions?: CommunicationActions;
}
/**
 * A variation of `ICommunicationFields` using a `themedImage` instead of `image`, which responds
 * to the user’s active theme (light, dark, or high-contrast).
 * @public
 */
export interface ICommunicationFieldsWithThemedImage
  extends Omit<ICommunicationFields, "image"> {
  themedImage?: ICommunicationThemedImage;
}
/**
 * The image to use at the beginning of a Communication component’s content. This does not respond
 * to the user’s active theme, so will remain the same across themes.
 * @public
 */
export interface ICommunicationImage {
  /**
   * A URL to the image asset.
   */
  src: string;
  /**
   * A label to use in place of the image for screen readers.
   */
  ariaLabel: string;
}
/**
 * An internal type for illustrations provided as part of this library.
 * @public
 */
export interface ICommunicationIllustration {
  [TeamsTheme.Default]: React.ReactNode;
  [TeamsTheme.Dark]: React.ReactNode;
  [TeamsTheme.HighContrast]: React.ReactNode;
}
/**
 * The image to use at the beginning of a Communication component’s content. The user’s active theme
 * determines which image to display.
 * @public
 */
export interface ICommunicationThemedImage
  extends Omit<ICommunicationImage, "src"> {
  /**
   * A URL for the image to display when the light palette is active.
   */
  [TeamsTheme.Default]: string;
  /**
   * A URL for the image to display when the dark palette is active.
   */
  [TeamsTheme.Dark]: string;
  /**
   * A URL for the image to display when the high contrast palette is active.
   */
  [TeamsTheme.HighContrast]: string;
}
/**
 * If actions are supplied, there must be at least one, and only one each of the possible styles:
 * - primary
 * - secondary
 * - tertiary
 * This means up to 3 actions can be rendered.
 * @public
 */
export declare type CommunicationActions =
  | {
      primary: ICommunicationAction;
      secondary?: ICommunicationAction;
      tertiary?: ICommunicationAction;
    }
  | {
      primary?: ICommunicationAction;
      secondary: ICommunicationAction;
      tertiary?: ICommunicationAction;
    }
  | {
      primary?: ICommunicationAction;
      secondary?: ICommunicationAction;
      tertiary: ICommunicationAction;
    };
/**
 * An action rendered at the end of the Communication component’s content.
 * @public
 */
export interface ICommunicationAction {
  /**
   * The text to display in the button for the action.
   */
  label: TTextObject;
  /**
   * The ID of the action to pass along to the interaction payload.
   */
  target: string;
}
//# sourceMappingURL=CommunicationTypes.d.ts.map
