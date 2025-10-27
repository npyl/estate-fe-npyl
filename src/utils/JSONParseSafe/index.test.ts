import JSONParseSafe from "@/utils/JSONParseSafe";

describe("JSONParseSafe", () => {
    beforeEach(() => {});
    afterEach(() => {});

    describe("JSON", () => {
        it("should parse valid JSON string", () => {
            const validJson = '{"name": "John", "age": 30}';
            const result = JSONParseSafe(validJson);
            expect(result).toEqual({ name: "John", age: 30 });
        });

        it("JSON (array)", () => {
            const validJson = '[1, 2, 3, "test"]';
            const result = JSONParseSafe(validJson);
            expect(result).toEqual([1, 2, 3, "test"]);
        });

        it("primitives", () => {
            expect(JSONParseSafe("42")).toBe(42);
            expect(JSONParseSafe('"hello"')).toBe("hello");
            expect(JSONParseSafe("true")).toBe(true);
            expect(JSONParseSafe("false")).toBe(false);
            expect(JSONParseSafe("null")).toBe(null);
        });
    });

    describe("null & undefined input", () => {
        it("null", () => {
            const result = JSONParseSafe(null);
            expect(result).toBe(null);
        });

        it("undefined", () => {
            const result = JSONParseSafe(undefined);
            expect(result).toBe(null);
        });

        it("empty string", () => {
            const result = JSONParseSafe("");
            expect(result).toBe(null);
        });

        it("whitespace-only string", () => {
            const result = JSONParseSafe("   ");
            expect(result).toBe(null);
        });
    });

    describe("error handling", () => {
        it("invalid JSON", () => {
            const invalidJson = '{"invalid": json}';
            const result = JSONParseSafe(invalidJson);
            expect(result).toBe(null);
        });

        it("malformed JSON", () => {
            const malformedCases = [
                "{invalid}",
                '{"unclosed": "string}',
                "{trailing,}",
                "undefined",
                "function() {}",
                '{key: "value"}', // unquoted key
            ];

            malformedCases.forEach((invalidCase) => {
                const result = JSONParseSafe(invalidCase);
                expect(result).toBe(null);
            });
        });
    });
});
