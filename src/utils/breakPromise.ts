type PromiseReturningFunc<T extends any[]> = (...args: T) => Promise<any>;
type VoidReturningFunc<T extends any[]> = (...args: T) => void;

/**
 * Takes a function that returns a Promise and returns a new function
 * that calls the original function but returns nothing (void).
 *
 * This is useful for situations where you need to pass a function that
 * returns a Promise to an API that expects a function returning void,
 * such as an event handler.
 *
 * @template T - The types of the arguments of the callback function.
 * @param {PromiseReturningFunc<T>} cb - The function to wrap. It must return a Promise.
 * @returns {VoidReturningFunc<T>} A new function that calls the original
 * callback but returns void.
 */
const breakPromise = <T extends any[]>(
    cb: PromiseReturningFunc<T>
): VoidReturningFunc<T> => {
    return (...args: T) => {
        cb(...args);
    };
};

export default breakPromise;
