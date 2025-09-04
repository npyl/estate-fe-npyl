import { renderHook as _renderHook, act } from "@testing-library/react";
import useIntervalControl from "@/_private/useNetworkAccess/useIntervalControl";

// Mock timers - this must be done before any timer functions are used
jest.useFakeTimers();

const actWrap = <T extends (...args: any[]) => any>(fn: T): T =>
    ((...args: Parameters<T>) => act(() => fn(...args))) as T;

const renderHook = (...args: Parameters<typeof useIntervalControl>) => {
    const { result, ...other } = _renderHook(() => useIntervalControl(...args));

    const {
        start: _start,
        stop: _stop,
        reset: _reset,
        ...rest
    } = result.current;

    const start = actWrap(_start);
    const stop = actWrap(_stop);

    // INFO: Don't wrap reset with actWrap since it internally calls start/stop which are already wrapped
    const reset = _reset;

    return { start, stop, reset, ...other, ...rest };
};

describe("useIntervalControl", () => {
    let callback: jest.Mock;

    beforeEach(() => {
        callback = jest.fn();
        jest.clearAllTimers();
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    describe("basics", () => {
        it("start interval (on mount)", () => {
            renderHook(1000, callback);

            // Verify that a timer was created
            expect(jest.getTimerCount()).toBe(1);
        });

        it("callback @ intervals", () => {
            renderHook(1000, callback);

            expect(callback).not.toHaveBeenCalled();

            // Fast-forward time by 1 second
            act(() => {
                jest.advanceTimersByTime(1000);
            });

            expect(callback).toHaveBeenCalledTimes(1);

            // Fast-forward another second
            act(() => {
                jest.advanceTimersByTime(1000);
            });

            expect(callback).toHaveBeenCalledTimes(2);
        });
    });

    describe("start", () => {
        it("manually", () => {
            const { start, stop } = renderHook(1000, callback);

            // Stop the auto-started interval first
            stop();
            jest.clearAllTimers();

            // Now manually start
            start();

            // Verify timer is running
            expect(jest.getTimerCount()).toBe(1);

            // Verify callback gets called
            act(() => {
                jest.advanceTimersByTime(1000);
            });
            expect(callback).toHaveBeenCalledTimes(1);
        });

        it("manually (multiple)", () => {
            const { start, stop } = renderHook(1000, callback);

            // Clear initial timer
            stop();
            jest.clearAllTimers();
            callback.mockClear();

            start();
            start(); // Second start should replace the first

            // Should still only have one timer
            expect(jest.getTimerCount()).toBe(1);

            // Advance time and verify only one callback per interval
            act(() => {
                jest.advanceTimersByTime(1000);
            });
            expect(callback).toHaveBeenCalledTimes(1);
        });

        it("should start if interval is 0", () => {
            const { start } = renderHook(0, callback);

            start();

            // Timer should be created even with 0 interval
            expect(jest.getTimerCount()).toBeGreaterThan(0);
        });
    });

    describe("stop", () => {
        it("manually", () => {
            const { stop } = renderHook(1000, callback);

            stop();

            // Verify no timers are running
            expect(jest.getTimerCount()).toBe(0);

            // Advance time and ensure callback is not called
            act(() => {
                jest.advanceTimersByTime(2000);
            });

            expect(callback).not.toHaveBeenCalled();
        });

        it("manually (multiple)", () => {
            const { stop } = renderHook(1000, callback);

            stop();
            stop(); // Second stop should not cause issues

            expect(jest.getTimerCount()).toBe(0);

            // Verify callback is not called
            act(() => {
                jest.advanceTimersByTime(1000);
            });
            expect(callback).not.toHaveBeenCalled();
        });
    });

    describe("reset", () => {
        it("should reset interval with original interval value when no parameter provided", () => {
            const { reset } = renderHook(1000, callback);

            // Clear any existing calls
            callback.mockClear();

            const returnValue = reset();

            expect(returnValue).toBe(1000);

            // Verify interval is running at 1000ms
            act(() => {
                jest.advanceTimersByTime(1000);
            });
            expect(callback).toHaveBeenCalledTimes(1);
        });

        it("should reset interval with new interval value when parameter provided", () => {
            const { reset } = renderHook(1000, callback);

            callback.mockClear();

            const returnValue = reset(2000);

            expect(returnValue).toBe(2000);

            // Should not call at 1000ms
            act(() => {
                jest.advanceTimersByTime(1000);
            });
            expect(callback).not.toHaveBeenCalled();

            // Should call at 2000ms
            act(() => {
                jest.advanceTimersByTime(1000);
            });
            expect(callback).toHaveBeenCalledTimes(1);
        });

        it("should return the interval value used", () => {
            const { reset } = renderHook(1500, callback);

            const returnValue1 = reset();
            const returnValue2 = reset(3000);

            expect(returnValue1).toBe(1500);
            expect(returnValue2).toBe(3000);
        });

        it("should stop and start with new interval immediately", () => {
            const { reset } = renderHook(1000, callback);

            // Let some time pass
            act(() => {
                jest.advanceTimersByTime(500);
            });

            callback.mockClear();

            // Reset with new interval
            reset(2000);

            // Should not call callback at 1000ms mark
            act(() => {
                jest.advanceTimersByTime(1000);
            });
            expect(callback).not.toHaveBeenCalled();

            // Should call callback at 2000ms mark from reset
            act(() => {
                jest.advanceTimersByTime(1000);
            });
            expect(callback).toHaveBeenCalledTimes(1);
        });
    });

    describe("cleanup on unmount", () => {
        it("should clear interval when component unmounts", () => {
            const { unmount } = renderHook(1000, callback);

            unmount();

            // Verify no timers remain
            expect(jest.getTimerCount()).toBe(0);
        });

        it("should not call callback after unmount", () => {
            const { unmount } = renderHook(1000, callback);

            unmount();

            act(() => {
                jest.advanceTimersByTime(2000);
            });

            expect(callback).not.toHaveBeenCalled();
        });
    });

    describe("callback dependency changes", () => {
        it("should restart interval when callback changes", () => {
            const callback1 = jest.fn();
            const callback2 = jest.fn();

            // Use a wrapper function to properly test rerender behavior
            let currentCallback = callback1;
            const { rerender } = _renderHook(() =>
                useIntervalControl(1000, currentCallback)
            );

            // Verify first callback is called
            act(() => {
                jest.advanceTimersByTime(1000);
            });
            expect(callback1).toHaveBeenCalledTimes(1);
            expect(callback2).not.toHaveBeenCalled();

            // Clear previous calls and change callback
            callback1.mockClear();
            currentCallback = callback2;

            // Trigger rerender with new callback
            act(() => {
                rerender();
            });

            // Verify new callback is called
            act(() => {
                jest.advanceTimersByTime(1000);
            });

            expect(callback1).not.toHaveBeenCalled();
            expect(callback2).toHaveBeenCalledTimes(1);
        });
    });
});
