import { INCREMENT_CALLBACK_KEY } from "./constants";

declare global {
    interface Window {
        callCount: number;
        [INCREMENT_CALLBACK_KEY]: VoidFunction;
    }
}
