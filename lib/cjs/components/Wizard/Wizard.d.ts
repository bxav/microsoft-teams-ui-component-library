/// <reference types="react" />
import { IFormWizardStepProps, TFormInteraction } from "../Form/Form";
import { TTextObject } from "../../translations";
/**
 * An interaction payload triggered when the user clicks on a step in the sidebar. The subject will
 * be in the form of `wizard-step__{step_index}`, where `step_index` is the index of the
 * target step.
 * @public
 */
export interface IWizardSidebarInteraction {
  event: "click";
  target: "wizard-sidebar";
  subject: string;
}
/**
 * An interaction event emitted by the Wizard component. The payload is either proxied from the Form
 * component rendered in the primary area as the active step, or is triggered when the user
 * interacts with any step listed in the sidebar.
 * @public
 */
export declare type TWizardInteraction =
  | TFormInteraction
  | IWizardSidebarInteraction;
/**
 * The Wizard component can be used to render a series of Forms. Designs for this component are
 * available in the [Wizard page of the Microsoft Teams UI Kit](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A4233).
 * @public
 */
export interface IWizardProps {
  /**
   * The titles of the Wizard’s steps in order.
   */
  stepTitles: TTextObject[];
  /**
   * The zero-based index of the active step.
   */
  activeStepIndex: number;
  /**
   * The content of the active step.
   */
  activeStep: IFormWizardStepProps;
  /**
   * An interaction handler for the Wizard. Interactions are triggered when the user clicks on a
   * step in the Wizard’s sidebar, or if the user interacts with the Form.
   */
  onInteraction?: (interaction: TWizardInteraction) => void;
}
/**
 * @internal
 */
export interface IWizardDialogProps extends IWizardProps {
  trigger: JSX.Element;
}
/**
 * @public
 */
export declare const Wizard: ({
  stepTitles,
  activeStepIndex,
  activeStep,
  onInteraction,
}: IWizardProps) => JSX.Element;
export declare const WizardDialog: ({
  activeStep: formProps,
  ...props
}: IWizardDialogProps) => JSX.Element;
//# sourceMappingURL=Wizard.d.ts.map
