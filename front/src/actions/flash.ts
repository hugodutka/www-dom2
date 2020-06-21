var flashId = 0;

export enum FlashVariant {
  Danger = "danger",
  Warning = "warning",
  Info = "info",
}

export const PUT_FLASH = "PUT_FLASH";
export const putFlash = (variant: FlashVariant, text: string) => ({
  type: PUT_FLASH,
  variant,
  text,
  id: flashId++,
});

export const REMOVE_FLASH = "REMOVE_FLASH";
export const removeFlash = (id: number) => ({ type: REMOVE_FLASH, id });
