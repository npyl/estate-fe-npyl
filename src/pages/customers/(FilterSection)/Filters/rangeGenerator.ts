function generateNumbers(type: string) {
    const numbers = [];

    const TEN_M = 10 * 1000 * 1000;
    const HUNDRED_K = 100 * 1000;

    if (type === "price") {
        for (let i = 0; i <= TEN_M; i += HUNDRED_K) {
            numbers.push(i);
        }
    } else {
        for (let i = 10; i <= 1000; i += 10) {
            numbers.push(i);
        }
    }

    return numbers;
}

export default generateNumbers;
