// ---------------------------------------------------->
// --------------------------------------------------------->
// -------------------------------------------------------------->

export const isNullOrUndefined = (input: unknown): boolean =>
  input === null || input === undefined;

// ---------------------------------------------------->
// --------------------------------------------------------->
// -------------------------------------------------------------->

export const isValidDigitString = (
  str: string,
  allowScientificNotation = false
): boolean => {
  if (str === "") return true;

  if (allowScientificNotation) {
    return /^-?\d*\.?\d*(?:[eE][+-]?\d+)?$/.test(str);
  } else {
    return /^-?\d*\.?\d*$/.test(str);
  }
};

// ---------------------------------------------------->
// --------------------------------------------------------->
// -------------------------------------------------------------->

export const isValidNumber = (num: number): boolean =>
  !Number.isNaN(num) && Number.isFinite(num);

// ---------------------------------------------------->
// --------------------------------------------------------->
// -------------------------------------------------------------->

export const normalizeScientificNotation = (input: string): string => {
  if (!/[eE]/.test(input)) return input;

  try {
    const num = Number(input);
    if (!isValidNumber(num)) return input;

    return num.toString().replace(/[eE][+-]?\d+/, (match) => {
      return "";
    });
  } catch {
    return input;
  }
};

// ---------------------------------------------------->
// --------------------------------------------------------->
// -------------------------------------------------------------->
