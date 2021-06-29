/// <reference types="react" />
import { TTextObject } from "../../translations";
import { ISection } from "./FormContent";
/**
 * A collection of input values, keyed by input ID. If the input is a block of checkboxes or a
 * dropdown with multiple selection, the value will be an array of option IDs.
 * @public
 */
export interface IFormState {
  [inputId: string]: string | string[];
}
/**
 * A collection of error messages associated with inputs, keyed by input ID.
 * @public
 */
export declare type TFormErrors = {
  [inputId: string]: TTextObject;
};
/**
 * An interaction event emitted by the Form component. The payload always contains the Form’s state,
 * which contains the values of all the Form’s inputs.
 * @public
 */
export declare type TFormInteraction = {
  event: "submit" | "cancel" | "back";
  target: "form";
  formState: IFormState;
};
/**
 * The Form component can be used to render an interactive Form. Designs for this component are
 * available in the [Forms page of the Microsoft Teams UI Kit](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=5271%3A221958).
 * @public
 */
export interface IFormProps {
  /**
   * A section rendered at the top of the Form, which uses an `h1` for the section’s title. Any
   * input groups are ignored.
   */
  headerSection?: ISection;
  /**
   * Form section, each of which can have a title (rendered as an `h2`) and a preface for any
   * descriptions or coaching text, which is rendered before any inputs or input groups.
   */
  sections: ISection[];
  /**
   * A collection of error messages associated with inputs, keyed by input ID.
   */
  errors?: TFormErrors;
  /**
   * An error to render at the top of the Form, in case it isn’t relevant to a specific input.
   */
  topError?: TTextObject;
  /**
   * The text content of the submit button.
   */
  submit: TTextObject;
  /**
   * The text content of the cancel button, if relevant. The button is not rendered if this is
   * absent.
   */
  cancel?: TTextObject;
  /**
   * An interaction handler for the Form. Interactions are triggered when the user clicks 'submit',
   * 'cancel', or 'back' (only in Wizard components).
   */
  onInteraction?: (interaction: TFormInteraction) => void;
}
export interface IFormDialogProps extends IFormProps {
  /**
   * A trigger element for a form dialog.
   * @internal
   */
  trigger: JSX.Element;
}
/**
 * A Form which is a step in a Wizard has the same inputs as Form with an additional option to
 * override the text of the Wizard’s back button for the current step.
 * @public
 */
export interface IFormWizardStepProps extends IFormProps {
  back?: TTextObject;
}
/**
 * @internal
 */
export interface IFormWizardStepDialogProps extends IFormWizardStepProps {
  trigger: JSX.Element;
}
/**
 * @public
 */
export declare const Form: ({
  cancel,
  errors,
  headerSection,
  sections,
  submit,
  topError,
  onInteraction,
}: IFormProps) => JSX.Element;
/**
 * @internal
 */
export declare const FormDialog: ({
  cancel,
  errors,
  headerSection,
  sections,
  submit,
  topError,
  trigger,
  onInteraction,
}: IFormDialogProps) => JSX.Element;
export declare const FormWizardStep: ({
  headerSection,
  sections,
  topError,
  errors,
  cancel,
  submit,
  back,
  onInteraction,
}: IFormWizardStepProps) => JSX.Element;
export declare const FormWizardStepDialog: ({
  cancel,
  back,
  errors,
  headerSection,
  sections,
  submit,
  topError,
  trigger,
  onInteraction,
}: IFormWizardStepDialogProps) => JSX.Element;
//# sourceMappingURL=Form.d.ts.map
