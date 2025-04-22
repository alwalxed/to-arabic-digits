import { createMapper } from "./helpers/create-mapper";
import { handleInvalidInput } from "./helpers/handle-invalid-input";
import { mapString } from "./helpers/map-string";
import {
  isNullOrUndefined,
  isValidDigitString,
  isValidNumber,
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
  } = {}
): string => {
  const {
    fallbackToOriginal = false,
    strictMode = true,
    customMapping = {},
    maxLength = 10000,
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

    if (strictMode && !isValidDigitString(input)) {
      return handleInvalidInput(
        input,
        fallbackToOriginal,
        "Invalid string input. Must contain only digits, dots, or hyphens."
      );
    }
  }

  const mapper = createMapper(customMapping);

  return mapString(input, mapper, strictMode);
};
