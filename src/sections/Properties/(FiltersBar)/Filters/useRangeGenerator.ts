import { selectStates } from "@/slices/filters";
import { useCallback } from "react";
import { useSelector } from "react-redux";

const HUNDRED_K = 100 * 1000;
const HUNDRED = 100;
const TEN_M = 10 * 1000 * 1000;
const TEN_K = 10 * 1000;

const useRangeGenerator = () => {
    const states = useSelector(selectStates);

    const generateNumbers = useCallback(
        (type: "price" | "area") => {
            const numbers = [];

            if (type === "price") {
                // RENT & RENTED or (RENT or RENTED) or nothing -> 2, 1, 0 lengths, respectively
                const rentLength =
                    states.includes("RENT") && states.includes("RENTED")
                        ? 2
                        : states.includes("RENT") || states.includes("RENTED")
                        ? 1
                        : 0;

                const isRent = rentLength > 0;
                const isSale = states.length > rentLength;

                if (states.length === 0) {
                    // nothing selected
                    for (let i = HUNDRED; i <= TEN_K; i += HUNDRED) {
                        numbers.push(i);
                    }
                } else if (isRent) {
                    // RENT
                    for (let i = HUNDRED; i <= TEN_K; i += HUNDRED) {
                        numbers.push(i);
                    }

                    // w/ SALE
                    if (isSale) {
                        for (
                            let i = TEN_K;
                            i <= TEN_M;
                            i += HUNDRED_K - TEN_K
                        ) {
                            numbers.push(i);
                        }
                    }
                } else {
                    // SALE (exclusively)
                    for (let i = TEN_K; i <= TEN_M; i += HUNDRED_K - TEN_K) {
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
