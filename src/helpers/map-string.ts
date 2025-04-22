import { isValidDigitString } from "./utils";

export const mapString = (
  input: string,
  mapFn: (char: string) => string,
  strictMode: boolean,
  allowScientificNotation = true
): string => {
  const isValidChar = (char: string): boolean => {
    if (allowScientificNotation) {
      return (
        isValidDigitString(char, true) ||
        char === "e" ||
        char === "E" ||
        char === "+" ||
        char === "-"
      );
    } else {
      return isValidDigitString(char, false);
    }
  };

  if (input.length < 1000) {
    const result = [];

    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      const mappedChar = mapFn(char);

      if (strictMode && mappedChar === char && !isValidChar(char)) {
        throw new Error(`Unexpected character "${char}" in input.`);
      }

      result.push(mappedChar);
    }

    return result.join("");
  } else {
    return strictMode
      ? [...input]
          .map((char) => {
            const mappedChar = mapFn(char);
            if (mappedChar === char && !isValidChar(char)) {
              throw new Error(`Unexpected character "${char}" in input.`);
            }
            return mappedChar;
          })
          .join("")
      : [...input].map(mapFn).join("");
  }
};
