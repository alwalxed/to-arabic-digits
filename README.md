# to-arabic-digits

A lightweight, type-safe utility for converting Western digits to Arabic digits with customizable options.

## Features

- 🔄 Convert Western digits to Arabic digits
- 🛡️ Type-safe with full TypeScript support
- 🧩 Pure functional implementation
- 🔧 Customizable mapping
- 🚫 Strict mode validation
- 🪶 Zero dependencies

## Installation

```bash
npm install to-arabic-digits

yarn add to-arabic-digits

pnpm add to-arabic-digits

bun add to-arabic-digits
```

## Usage

### Basic Usage

```typescript
import { toArabicDigits } from "to-arabic-digits";

toArabicDigits(123); // Returns "١٢٣"

toArabicDigits("456"); // Returns "٤٥٦"

toArabicDigits(7.89); // Returns "٧.٨٩"

toArabicDigits(-42); // Returns "-٤٢"
```

### With Options

```typescript
const userInput = getUserInput(); // Could be null in some cases
const formattedInput = toArabicDigits(userInput, {
  fallbackToOriginal: true,
}); // Safely handles null/undefined without throwing

const mixedText = "Order #123 was placed on 05/22";
const arabicMixedText = toArabicDigits(mixedText, {
  strictMode: false,
}); // Returns "Order #١٢٣ was placed on ٠٥/٢٢"

const price = 1299.99;
const formattedPrice = toArabicDigits(price, {
  customMapping: { ".": "٫" }, // Using Arabic decimal separator
}); // Returns "١٢٩٩٫٩٩"

const orderNumber = "ORD-2023-456";
const arabicOrderNumber = toArabicDigits(orderNumber, {
  fallbackToOriginal: true,
  strictMode: false,
  customMapping: { "-": "–" }, // Using en dash instead of hyphen
}); // Returns "ORD–٢٠٢٣–٤٥٦"

const largeNumber = "1".repeat(15000);
const arabicLargeNumber = toArabicDigits(largeNumber, {
  maxLength: 20000, // Increase the default limit of 10000
}); // Successfully converts the large number
```

## API

### Parameters

- `input` (number | string | null | undefined): The input to convert
- `options` (object, optional): Configuration options
  - `fallbackToOriginal` (boolean, default: false): Return the original input as a string if validation fails
  - `strictMode` (boolean, default: true): Throw errors for invalid inputs
  - `customMapping` (object, default: {}): Custom character mapping to override defaults
  - `maxLength` (number, default: 10000): Maximum allowed length for string inputs

### Returns

- `string`: The converted string with Arabic digits

### Throws

- `TypeError`: If input is invalid and `fallbackToOriginal` is false
- `Error`: If unexpected characters are encountered in strict mode

## Contributing

If you encounter any issues or have suggestions, please submit them via issues or PR

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/alwalxed/to-arabic-digists/blob/main/LICENSE) file for details.
