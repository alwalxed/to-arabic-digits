import { describe, expect, it } from "vitest";
import { toArabicDigits } from "../src";

describe("toArabicDigits", () => {
  // Basic functionality tests
  describe("basic conversion", () => {
    it("should convert basic digits correctly", () => {
      expect(toArabicDigits("123")).toBe("١٢٣");
      expect(toArabicDigits(456)).toBe("٤٥٦");
      expect(toArabicDigits("7890")).toBe("٧٨٩٠");
    });

    it("should handle decimal numbers correctly", () => {
      expect(toArabicDigits("123.45")).toBe("١٢٣.٤٥");
      expect(toArabicDigits(67.89)).toBe("٦٧.٨٩");
    });

    it("should handle negative numbers correctly", () => {
      expect(toArabicDigits("-123")).toBe("-١٢٣");
      expect(toArabicDigits(-456)).toBe("-٤٥٦");
      expect(toArabicDigits("-78.90")).toBe("-٧٨.٩٠");
    });

    it("should preserve non-digit characters in non-strict mode", () => {
      expect(toArabicDigits("abc123", { strictMode: false })).toBe("abc١٢٣");
      expect(toArabicDigits("123 456", { strictMode: false })).toBe("١٢٣ ٤٥٦");
    });
  });

  // Input type tests
  describe("input types", () => {
    it("should handle number inputs", () => {
      expect(toArabicDigits(0)).toBe("٠");
      expect(toArabicDigits(12345)).toBe("١٢٣٤٥");
    });

    it("should handle string inputs", () => {
      expect(toArabicDigits("0")).toBe("٠");
      expect(toArabicDigits("12345")).toBe("١٢٣٤٥");
    });

    it("should handle empty string", () => {
      expect(toArabicDigits("")).toBe("");
    });

    it("should throw for null by default", () => {
      expect(() => toArabicDigits(null)).toThrow();
    });

    it("should throw for undefined by default", () => {
      expect(() => toArabicDigits(undefined)).toThrow();
    });

    it("should return original value for null when fallbackToOriginal is true", () => {
      expect(toArabicDigits(null, { fallbackToOriginal: true })).toBe("null");
    });

    it("should return original value for undefined when fallbackToOriginal is true", () => {
      expect(toArabicDigits(undefined, { fallbackToOriginal: true })).toBe(
        "undefined"
      );
    });
  });

  // Options tests
  describe("options", () => {
    describe("strictMode", () => {
      it("should throw in strict mode for invalid characters", () => {
        expect(() => toArabicDigits("123abc")).toThrow();
        expect(() => toArabicDigits("abc123")).toThrow();
      });

      it("should not throw in non-strict mode for invalid characters", () => {
        expect(toArabicDigits("123abc", { strictMode: false })).toBe("١٢٣abc");
        expect(toArabicDigits("abc123", { strictMode: false })).toBe("abc١٢٣");
      });
    });

    describe("customMapping", () => {
      it("should use custom mapping when provided", () => {
        const customMapping = {
          "1": "A",
          "2": "B",
          "3": "C",
        };
        expect(toArabicDigits("123", { customMapping })).toBe("ABC");
        expect(toArabicDigits(456, { customMapping })).toBe("٤٥٦");
      });

      it("should override default mapping with custom mapping", () => {
        const customMapping = {
          "1": "X",
          "2": "٢", // Same as default
          "3": "Z",
        };
        expect(toArabicDigits("123", { customMapping })).toBe("X٢Z");
      });
    });

    describe("maxLength", () => {
      it("should throw when input exceeds maxLength", () => {
        const longInput = "1".repeat(101);
        expect(() => toArabicDigits(longInput, { maxLength: 100 })).toThrow();
      });

      it("should not throw when input is exactly maxLength", () => {
        const input = "1".repeat(100);
        expect(() => toArabicDigits(input, { maxLength: 100 })).not.toThrow();
      });

      it("should return original when fallbackToOriginal is true and input exceeds maxLength", () => {
        const longInput = "1".repeat(101);
        expect(
          toArabicDigits(longInput, {
            maxLength: 100,
            fallbackToOriginal: true,
          })
        ).toBe(longInput);
      });
    });

    describe("fallbackToOriginal", () => {
      it("should return original value when input is invalid and fallbackToOriginal is true", () => {
        expect(toArabicDigits("abc", { fallbackToOriginal: true })).toBe("abc");
        expect(toArabicDigits(NaN, { fallbackToOriginal: true })).toBe("NaN");
      });
    });
  });

  // Edge cases
  describe("edge cases", () => {
    it("should handle very large numbers", () => {
      const largeNumber = "9".repeat(1000);
      const expected = "٩".repeat(1000);
      expect(toArabicDigits(largeNumber)).toBe(expected);
    });

    it("should handle scientific notation as a string", () => {
      expect(() => toArabicDigits("1e10")).toThrow(); // In strict mode
      expect(toArabicDigits("1e10", { strictMode: false })).toBe("١e١٠");
    });

    it("should handle scientific notation as a number", () => {
      const num = 1e10;
      expect(toArabicDigits(num)).toBe("١٠٠٠٠٠٠٠٠٠٠");
    });

    it("should handle Infinity", () => {
      expect(() => toArabicDigits(Infinity)).toThrow();
      expect(toArabicDigits(Infinity, { fallbackToOriginal: true })).toBe(
        "Infinity"
      );
    });

    it("should handle NaN", () => {
      expect(() => toArabicDigits(NaN)).toThrow();
      expect(toArabicDigits(NaN, { fallbackToOriginal: true })).toBe("NaN");
    });

    it("should handle multiple decimal points in non-strict mode", () => {
      expect(() => toArabicDigits("1.2.3")).toThrow(); // In strict mode
      expect(toArabicDigits("1.2.3", { strictMode: false })).toBe("١.٢.٣");
    });
  });

  // Performance optimization tests
  describe("performance optimizations", () => {
    it("should handle strings under 1000 characters", () => {
      const input = "1".repeat(999);
      const expected = "١".repeat(999);
      expect(toArabicDigits(input)).toBe(expected);
    });

    it("should handle strings over 1000 characters", () => {
      const input = "1".repeat(1001);
      const expected = "١".repeat(1001);
      expect(toArabicDigits(input)).toBe(expected);
    });
  });

  // Helper functions tests
  describe("helper functions", () => {
    // These tests would typically be in separate files, but we're including them here for completeness

    // We can't directly test private functions, but we can test their behavior through the main function
    it("should validate digit strings correctly", () => {
      // Valid digit strings
      expect(() => toArabicDigits("123")).not.toThrow();
      expect(() => toArabicDigits("-123")).not.toThrow();
      expect(() => toArabicDigits("123.45")).not.toThrow();

      // Invalid digit strings
      expect(() => toArabicDigits("123-45")).toThrow(); // Hyphen not at start
      expect(() => toArabicDigits("123a")).toThrow(); // Contains letter
      expect(() => toArabicDigits("--123")).toThrow(); // Multiple hyphens
    });
  });
});
