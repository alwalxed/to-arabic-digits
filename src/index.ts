import { createMapper } from "./helpers/create-mapper";
import { handleInvalidInput } from "./helpers/handle-invalid-input";
import { mapString } from "./helpers/map-string";
import {
  isNullOrUndefined,
  isValidDigitString,
  isValidNumber,
  normalizeScientificNotation,
} from "./helpers/utils";

/**
 * Converts Western digits to Arabic digits
 * @param input - The input number or string
 * @param options - Configuration options
 * @returns The converted string with Arabic digits
 */
export const toArabicDigits = (
  input: number | string | null | undefined,
  options: {
    fallbackToOriginal?: boolean;
    strictMode?: boolean;
    customMapping?: Record<string, string>;
    maxLength?: number;
    handleScientificNotation?: boolean;
  } = {}
): string => {
  const {
    fallbackToOriginal = false,
    strictMode = true,
    customMapping = {},
    maxLength = 10000,
    handleScientificNotation = true,
  } = options;

  if (typeof input === "string" && input.length > maxLength) {
    return handleInvalidInput(
      input,
      fallbackToOriginal,
      `Input exceeds maximum length of ${maxLength} characters.`
    );
  }

  if (isNullOrUndefined(input)) {
    return handleInvalidInput(
      input,
      fallbackToOriginal,
      "Input cannot be null or undefined."
    );
  }

  if (typeof input === "number") {
    if (!isValidNumber(input)) {
      return handleInvalidInput(
        input,
        fallbackToOriginal,
        `Input must be a finite number, received: ${input}.`
      );
    }
    input = String(input);
  } else {
    input = String(input);
  }

  const hasScientificNotation = /[eE]/.test(input);

  if (hasScientificNotation && !handleScientificNotation && strictMode) {
    return handleInvalidInput(
      input,
      fallbackToOriginal,
      "Scientific notation is not allowed when handleScientificNotation is false."
    );
  }

  if (handleScientificNotation && hasScientificNotation) {
    input = normalizeScientificNotation(input);
  }

  const isValid = handleScientificNotation
    ? isValidDigitString(input, true) // Allow scientific notation
    : isValidDigitString(input, false); // Don't allow scientific notation

  if (strictMode && !isValid) {
    return handleInvalidInput(
      input,
      fallbackToOriginal,
      handleScientificNotation
        ? "Invalid string input. Must contain only digits, dots, hyphens, or scientific notation."
        : "Invalid string input. Must contain only digits, dots, or hyphens."
    );
  }

  const mapper = createMapper(customMapping);

  return mapString(input, mapper, strictMode);
};
