import React, { ReactNode } from "react";
import {
  Popup,
  Button,
  MoreIcon,
  ComponentEventHandler,
  PopupProps,
  Menu,
  mergeThemes,
  ComponentVariablesInput,
  Provider as FluentUIThemeProvider,
  ThemePrepared,
  EyeSlashIcon,
} from "@fluentui/react-northstar";

export interface IWidgetActionKey {
  id: string;
  icon?: JSX.Element;
  title: string;
}

export interface IDashboardCallout {
  open: boolean;
  onOpenChange: ComponentEventHandler<PopupProps>;
  menuProps: any;
  globalTheme: ThemePrepared;
  widgetActionGroup?: IWidgetActionKey[];
}

const getLocalTheme = () => {
  return {
    componentVariables: {
      PopupContent: ({
        colorScheme,
        borderRadius,
        borderWidth,
        shadowLevel1,
        shadowLevel4,
        theme,
      }: ComponentVariablesInput) => {
        return {
          backgroundColor: colorScheme.grey.background,
          backgroundColorHover: colorScheme.grey.background,
          boxShadow: `${shadowLevel1}, ${shadowLevel4}`,
          borderRadius,
          borderSize: borderWidth,
          borderColor:
            theme === "teamsHighContrastTheme"
              ? colorScheme.grey.backgroundFocus
              : "transparent",
          borderColorHover:
            theme === "teamsHighContrastTheme"
              ? colorScheme.grey.backgroundFocus
              : "transparent",
        };
      },
    },
    componentStyles: {
      MenuDivider: {
        root: { margin: "0.25rem 0" },
      },
    },
  };
};

const hideWidgetAction = {
  id: "hide_widget",
  content: "Hide widget",
  icon: <EyeSlashIcon />,
};

export const DashboardCallout = ({
  open,
  onOpenChange,
  menuProps,
  globalTheme,
  widgetActionGroup,
}: IDashboardCallout) => {
  const theme = mergeThemes(globalTheme, getLocalTheme());
  return (
    <FluentUIThemeProvider theme={theme}>
      <Popup
        {...menuProps}
        open={open}
        onOpenChange={onOpenChange}
        trigger={
          <Button
            text
            iconOnly
            aria-label="More actions"
            icon={<MoreIcon />}
            styles={{
              margin: "0 -0.35rem",
            }}
          />
        }
        content={{
          styles: { width: "12.5rem" },
          content: (
            <Menu
              items={
                widgetActionGroup
                  ? [
                      ...widgetActionGroup.map(
                        ({ id, icon, title }: IWidgetActionKey) => {
                          return {
                            key: id,
                            icon,
                            content: title,
                          };
                        }
                      ),
                      { kind: "divider" },
                      hideWidgetAction,
                    ]
                  : [hideWidgetAction]
              }
              style={{
                width: "12rem",
                margin: "-0.625rem -0.69rem",
                border: "none",
              }}
              vertical
            />
          ),
        }}
        trapFocus={{
          firstFocusableSelector:
            ".extended-toolbar__filters-menu__tree [data-is-focusable=true]",
        }}
      />
    </FluentUIThemeProvider>
  );
};