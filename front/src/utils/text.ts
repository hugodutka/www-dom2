// https://stackoverflow.com/a/31733628
export const deepCopyString = (str: string): string => (" " + str).slice(1);

export const isPositiveInteger = (str: string): boolean => /^([1-9]\d*|0)$/.test(str);
