describe("JSON.parseSafe", () => {
    let consoleSpy: jest.SpyInstance;

    beforeAll(async () => {
        await import("@/_private/JSON");
    });

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    describe("JSON", () => {
        it("should parse valid JSON string", () => {
            const validJson = '{"name": "John", "age": 30}';
            const result = JSON.parseSafe(validJson);

            expect(result).toEqual({ name: "John", age: 30 });
        });

        it("JSON (array)", () => {
            const validJson = '[1, 2, 3, "test"]';
            const result = JSON.parseSafe(validJson);

            expect(result).toEqual([1, 2, 3, "test"]);
        });

        it("primitives", () => {
            expect(JSON.parseSafe("42")).toBe(42);
            expect(JSON.parseSafe('"hello"')).toBe("hello");
            expect(JSON.parseSafe("true")).toBe(true);
            expect(JSON.parseSafe("false")).toBe(false);
            expect(JSON.parseSafe("null")).toBe(null);
        });
    });

    describe("null & undefined input", () => {
        it("null", () => {
            const result = JSON.parseSafe(null);
            expect(result).toBe(null);
        });

        it("undefined", () => {
            const result = JSON.parseSafe(undefined);
            expect(result).toBe(null);
        });

        it("empty string", () => {
            const result = JSON.parseSafe("");
            expect(result).toBe(null);
        });

        it("whitespace-only string", () => {
            const result = JSON.parseSafe("   ");
            expect(result).toBe(null);
        });
    });

    describe("error handling", () => {
        it("invalid JSON", () => {
            const invalidJson = '{"invalid": json}';
            const result = JSON.parseSafe(invalidJson);

            expect(result).toBe(null);
            expect(consoleSpy).toHaveBeenCalledTimes(1);
            expect(consoleSpy).toHaveBeenCalledWith(expect.any(SyntaxError));
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
                const result = JSON.parseSafe(invalidCase);
                expect(result).toBe(null);
            });

            expect(consoleSpy).toHaveBeenCalledTimes(malformedCases.length);
        });
    });
});
