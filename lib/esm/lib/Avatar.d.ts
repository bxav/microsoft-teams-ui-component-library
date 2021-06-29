/// <reference types="react" />
import { AvatarProps } from "@fluentui/react-northstar";
import { EAvatarVariant } from "../types/types";
export interface IAvatarProps
  extends Pick<
    AvatarProps,
    "image" | "styles" | "variables" | "size" | "getInitials"
  > {
  name: string;
  variant?: EAvatarVariant;
}
declare const Avatar: ({
  name,
  image,
  styles,
  variables,
  size,
  variant,
}: IAvatarProps) => JSX.Element;
export default Avatar;
//# sourceMappingURL=Avatar.d.ts.map
