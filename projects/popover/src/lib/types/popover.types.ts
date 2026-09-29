export type PopoverPosition =
  | 'auto'
  | 'auto-bottom'
  | 'top'
  | 'top-bottom'
  | 'right'
  | 'right-top'
  | 'right-bottom'
  | 'left'
  | 'left-top'
  | 'left-bottom'
  | 'bottom';

export type PopoverSize = 'xs' | 'xxs';

export interface PopoverResponsiveWidth {
  default?: string | number;
  mobile?: string | number;
}

export type PopoverWidth = string | number | PopoverResponsiveWidth;

export type PopoverAnimation = 'fade' | 'zoom' | 'slide' | 'none';

export type PopoverStateMap = Record<string, boolean>;
