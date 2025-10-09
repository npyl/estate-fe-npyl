// ---------------------------------------------------------------------------------------------

const HUNDRED = 100;
const TEN_K = 10 * 1000;

// ---------------------------------------------------------------------------------------------

const RENT_GENERATOR = () => {
    const numbers = [];
    for (let i = HUNDRED; i <= TEN_K; i += HUNDRED) {
        numbers.push(i);
    }
    return numbers;
};

const SALE_GENERATOR = () => {
    const numbers = [];

    // 10,000 - 1,000,000 with a step of 10,000
    for (let i = TEN_K; i <= 1 * 1000 * 1000; i += TEN_K) {
        numbers.push(i);
    }

    // 1,000,000 - 3,000,000 with a step of 200,000
    for (
        let i = 1 * 1000 * 1000 + 200 * 1000;
        i <= 3 * 1000 * 1000;
        i += 200 * 1000
    ) {
        numbers.push(i);
    }

    // 3,000,000 - 5,000,000 with a step of 500,000
    for (
        let i = 3 * 1000 * 1000 + 500 * 1000;
        i <= 5 * 1000 * 1000;
        i += 500 * 1000
    ) {
        numbers.push(i);
    }

    return numbers;
};

const RENT_AND_SALE_GENERATOR = () => {
    const sale = [...SALE_NUMBERS];
    sale.shift();
    return [...RENT_NUMBERS, ...sale];
};

// ---------------------------------------------------------------------------------------------

const RENT_NUMBERS = RENT_GENERATOR();
const SALE_NUMBERS = SALE_GENERATOR();
const RENT_AND_SALE_NUMBERS = RENT_AND_SALE_GENERATOR();

// ---------------------------------------------------------------------------------------------

// Return the appropriate pre-generated array based on state
const generatePriceRange = (
    isNothing: boolean,
    isRent: boolean,
    isSale: boolean
) => {
    if (isNothing) {
        return SALE_NUMBERS; // Default case uses same range as rent
    }

    if (isRent && isSale) {
        return RENT_AND_SALE_NUMBERS;
    }

    if (isRent) {
        return RENT_NUMBERS;
    }

    return SALE_NUMBERS; // Sale exclusively
};

export default generatePriceRange;
