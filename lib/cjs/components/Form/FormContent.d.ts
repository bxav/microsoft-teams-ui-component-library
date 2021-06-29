import React, { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { TTextObject, TTranslations } from "../../translations";
import { IFormProps, IFormState } from "./Form";
/**
 * Properties for each option for Enumerable inputs (radio buttons, checkboxes, dropdowns).
 * @public
 */
export interface IEnumerableInputOption {
  /**
   * The option’s text content to display.
   */
  title: TTextObject;
  /**
   * The option’s value, which should be unique for the input in which it’s available.
   */
  value: string;
}
/**
 * Properties shared by all enumerable inputs (radio buttons, checkboxes, dropdowns).
 * @public
 */
export interface IEnumerableInputBase {
  /**
   * The input’s label.
   */
  title: TTextObject;
  /**
   * The input’s options.
   */
  options: IEnumerableInputOption[];
  /**
   * The input’s unique ID.
   */
  inputId: string;
}
/**
 * Properties shared by singleton enumerable inputs (radio buttons, single-select dropdowns).
 * @public
 */
export interface IEnumerableSingletonInputBase extends IEnumerableInputBase {
  /**
   * The input’s initial value.
   */
  initialValue?: string;
}
/**
 * Properties shared by enumerable inputs supporting multiple selections (checkboxes,
 * multiple-select dropdowns).
 * @public
 */
export interface IEnumerableMultipleInputBase extends IEnumerableInputBase {
  /**
   * The input’s initial values.
   */
  initialValues?: string[];
}
/**
 * Properties shared by text inputs (single- and multi-line).
 * @public
 */
export interface ITextInputBase {
  /**
   * The input’s label.
   */
  title: TTextObject;
  /**
   * The input’s unique ID
   */
  inputId: string;
  /**
   * The input’s placeholder content.
   */
  placeholder?: TTextObject;
  /**
   * The input’s initial value.
   */
  initialValue?: string;
}
/**
 * An inline input’s width.
 * @public
 */
export declare enum EInputWidth {
  /**
   * The input should share the width with the other inline inputs.
   */
  split = "split",
  /**
   * The input should occupy the full width of the Form
   */
  full = "full",
}
/**
 * The types of inline inputs.
 * @public
 */
export declare enum EInlineInputType {
  text = "text",
  dropdown = "dropdown",
}
/**
 * The types of input blocks.
 * @public
 */
export declare enum EInputBlockType {
  inlineInputs = "inline-inputs",
  dropdown = "dropdown",
  multilineText = "multiline-text",
  radioButtons = "radio-buttons",
  checkboxes = "checkboxes",
}
/**
 * A single-line text field.
 * @public
 */
export interface ITextField extends ITextInputBase {
  type: EInlineInputType.text;
  width?: EInputWidth;
}
/**
 * A multi-line text field.
 * @public
 */
export interface IMultilineTextInput extends ITextInputBase {
  type: EInputBlockType.multilineText;
}
/**
 * @public
 */
export declare type TInlineField =
  | IDropdownInput
  | IDropdownMultipleInput
  | ITextField;
/**
 * A block containing a set of one or more text inputs or dropdowns.
 * @public
 */
export interface IInlineInputsBlock {
  type: EInputBlockType.inlineInputs;
  fields: TInlineField[];
}
/**
 * A single-select dropdown.
 * @public
 */
export interface IDropdownInput extends IEnumerableSingletonInputBase {
  type: EInlineInputType.dropdown | EInputBlockType.dropdown;
  multiple?: false;
  width?: EInputWidth;
}
/**
 * A multiple-select dropdown.
 * @public
 */
export interface IDropdownMultipleInput extends IEnumerableMultipleInputBase {
  type: EInlineInputType.dropdown | EInputBlockType.dropdown;
  multiple: true;
  width?: EInputWidth;
}
/**
 * A set of radio buttons (from which only one can be selected).
 * @public
 */
export interface IRadioButtonsInput extends IEnumerableSingletonInputBase {
  type: EInputBlockType.radioButtons;
}
/**
 * A set of checkboxes.
 * @public
 */
export interface ICheckboxesInput extends IEnumerableMultipleInputBase {
  type: EInputBlockType.checkboxes;
}
/**
 * A block with a single input which occupies the full width of the form.
 * @public
 */
export declare type TInputBlock =
  | IMultilineTextInput
  | IDropdownInput
  | IDropdownMultipleInput
  | IRadioButtonsInput
  | ICheckboxesInput;
/**
 * @public
 */
export interface ISection {
  /**
   * The title of the section, rendered as an `h#` element.
   */
  title?: TTextObject;
  /**
   * Text content of the section rendered before the input groups as a `p` element.
   */
  preface?: TTextObject;
  /**
   * The input blocks to render in this section, which can either be a block with an individual
   * input, or a block with a set of inline inputs.
   */
  inputBlocks?: (TInputBlock | IInlineInputsBlock)[];
}
export declare const MaxWidth: ({
  children,
  styles,
  flush,
  align,
}: PropsWithChildren<any>) => JSX.Element;
interface IFormContentProps extends Omit<IFormProps, "submit"> {
  formState: IFormState;
  setFormState: Dispatch<SetStateAction<IFormState>>;
  t: TTranslations;
  flush?: boolean;
  align?: string;
  breakpointOffset?: number;
}
export declare const setInitialValue: (
  acc: IFormState,
  field:
    | TInlineField
    | IMultilineTextInput
    | IDropdownInput
    | IDropdownMultipleInput
    | IRadioButtonsInput
    | ICheckboxesInput
) => IFormState;
export declare const FormContent: React.MemoExoticComponent<({
  topError,
  flush,
  t,
  headerSection,
  sections,
  errors,
  formState,
  setFormState,
  align,
  breakpointOffset,
}: IFormContentProps) => JSX.Element>;
export {};
//# sourceMappingURL=FormContent.d.ts.map
