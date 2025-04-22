import { isValidDigitString } from "./utils";

export const mapString = (
  input: string,
  mapFn: (char: string) => string,
  strictMode: boolean
): string => {
  if (input.length < 1000) {
    const result = [];

    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      const mappedChar = mapFn(char);

      if (strictMode && mappedChar === char && !isValidDigitString(char)) {
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
            if (mappedChar === char && !isValidDigitString(char)) {
              throw new Error(`Unexpected character "${char}" in input.`);
            }
            return mappedChar;
          })
          .join("")
      : [...input].map(mapFn).join("");
  }
};
