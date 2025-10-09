import { renderHook, act } from "@testing-library/react";
import useWaitForStop from "@/hooks/useWaitForStop"; // adjust path as needed

const STOP_DELAY = 300;

const LAST_VALUE = "value4";

const onChange = jest.fn((value: string) => value);
const onStopCallback = jest.fn();
const onStop = jest.fn((value: string) => {
    return () => onStopCallback(value);
});

describe("useWaitForStop", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it("should call onStop with the last value after stopping rapid calls", () => {
        const { result } = renderHook(() =>
            useWaitForStop(onChange, onStop, STOP_DELAY)
        );

        // Rapidly call onChange with different values
        act(() => {
            result.current("value1");
        });

        act(() => {
            result.current("value2");
        });

        act(() => {
            result.current("value3");
        });

        act(() => {
            result.current(LAST_VALUE);
        });

        expect(onStopCallback).not.toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledTimes(4);
        expect(onStop).toHaveBeenCalledTimes(4);
        expect(onStop).toHaveBeenLastCalledWith(LAST_VALUE);

        // Fast-forward time by STOP_DELAY
        act(() => {
            jest.advanceTimersByTime(STOP_DELAY);
        });

        // Now the callback returned by onStop should have been called once with the last value
        expect(onStopCallback).toHaveBeenCalledTimes(1);
        expect(onStopCallback).toHaveBeenCalledWith(LAST_VALUE);
    });
});
