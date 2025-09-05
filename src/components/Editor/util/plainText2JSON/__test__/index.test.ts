import plainTextToJSON from "@/components/Editor/util/plainText2JSON";
import { TESTS } from "./constants";

const expectResult = (INPUT: string, RESULT: object) => {
    const result = JSON.parse(plainTextToJSON(INPUT));
    expect(result).toStrictEqual(RESULT);
};

describe("plainTextToJSON", () => {
    test.each(TESTS)("$description", ({ expected, input }) => {
        expectResult(input, expected);
    });
});
