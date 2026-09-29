import {
  PopoverAnimation,
  PopoverPosition,
  PopoverSize,
  PopoverWidth,
} from '../types/popover.types';

export interface PopoverThemeConfig {
  panelBg?: string;
  panelBorder?: string;
  panelRadius?: string;
  panelShadow?: string;
  animationDuration?: string | number;
  animationTiming?: string;
  panelWidth?: string | number;
  panelMobileWidth?: string | number;
  panelMinWidth?: string | number;
  panelMaxWidth?: string | number;
  textColor?: string;
  accentColor?: string;
  iconColor?: string;
  iconHoverColor?: string;
  fontSize?: string;
  bodyMaxHeight?: string;
  zIndex?: number;
}

export interface PopoverLabelsConfig {
  ok?: string;
  closeAria?: string;
  dialogAria?: string;
}

export interface PopoverIconsConfig {
  help?: string;
  close?: string;
}

export interface PopoverConfig {
  position?: PopoverPosition;
  size?: PopoverSize;
  width?: PopoverWidth;
  minWidth?: string | number;
  maxWidth?: string | number;
  multi?: boolean;
  okClose?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  animation?: PopoverAnimation;
  labels?: PopoverLabelsConfig;
  icons?: PopoverIconsConfig;
  theme?: PopoverThemeConfig;
}
