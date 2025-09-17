import {
    setupMocks,
    triggerShapeChange,
    triggerMouseUp,
    verifyMocksCalled,
} from "./mocks";
import setShapeEvents from "@/components/Map/util/draw/setShapeEvents";
import { DrawShape } from "@/components/Map/types";

// -----------------------------------------------------------------------

let mockOnChange: jest.Mock<any, any, any>;

const setupOnChange = () => (mockOnChange = jest.fn());

const expectOnChangeCalled = () =>
    expect(mockOnChange).toHaveBeenCalledTimes(1);
const expectOnChangeNOTCalled = () =>
    expect(mockOnChange).not.toHaveBeenCalled();

// -----------------------------------------------------------------------

describe("setShapeEvents", () => {
    let mockShape: DrawShape;

    beforeEach(() => {
        setupMocks();
        setupOnChange();
        mockShape = new google.maps.Circle();
    });

    describe("not both", () => {
        it("+ change, - mouseup", () => {
            setShapeEvents(mockShape, mockOnChange);
            triggerShapeChange();
            expectOnChangeNOTCalled();
        });

        it("- change, + mouseup", () => {
            setShapeEvents(mockShape, mockOnChange);
            triggerMouseUp();
            expectOnChangeNOTCalled();
        });
    });

    describe("both", () => {
        it("+ change, + mouseup", () => {
            setShapeEvents(mockShape, mockOnChange);
            verifyMocksCalled();
            triggerShapeChange();
            triggerMouseUp();
            expectOnChangeCalled();
        });

        it("+ change, + mouseup (different order)", () => {
            setShapeEvents(mockShape, mockOnChange);
            verifyMocksCalled();
            triggerMouseUp();
            triggerShapeChange();
            expectOnChangeCalled();
        });
    });
});
