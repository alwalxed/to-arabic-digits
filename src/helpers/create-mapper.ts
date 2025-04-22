export const createMapper = (
  customMapping: Record<string, string> = {}
): ((char: string) => string) => {
  const defaultMapping: Record<string, string> = {
    "0": "٠",
    "1": "١",
    "2": "٢",
    "3": "٣",
    "4": "٤",
    "5": "٥",
    "6": "٦",
    "7": "٧",
    "8": "٨",
    "9": "٩",
    "-": "-",
    ".": ".",
  };

  const finalMapping = { ...defaultMapping, ...customMapping };

  return (char: string): string => finalMapping[char] || char;
};
