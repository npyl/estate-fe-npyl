import { selectStates } from "@/slices/filters";
import { useCallback } from "react";
import { useSelector } from "react-redux";

const useRangeGenerator = () => {
    const states = useSelector(selectStates);

    const generateNumbers = useCallback(
        (type: "price" | "area") => {
            const numbers = [];

            const HUNDRED_K = 100 * 1000;
            const HUNDRED = 100;
            const TEN_M = 10 * 1000 * 1000;
            const TEN_K = 10 * 1000;

            if (type === "price") {
                if (states.includes("Sale")) {
                    for (let i = TEN_K; i <= TEN_M; i += HUNDRED_K - TEN_K) {
                        numbers.push(i);
                    }
                } else {
                    for (let i = HUNDRED; i <= TEN_K; i += HUNDRED) {
                        numbers.push(i);
                    }
                }
            } else {
                for (let i = 10; i <= 1000; i += 10) {
                    numbers.push(i);
                }
            }

            return numbers;
        },
        [states]
    );

    return { generateNumbers };
};

export default useRangeGenerator;
