export const handleInvalidInput = <T>(
  input: T,
  fallbackToOriginal: boolean,
  errorMessage: string
): string => {
  if (fallbackToOriginal) return String(input);
  throw new TypeError(
    `${errorMessage} Received: ${
      typeof input === "object" ? JSON.stringify(input) : String(input)
    }`
  );
};
