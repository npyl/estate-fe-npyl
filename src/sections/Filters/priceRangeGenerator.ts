// ---------------------------------------------------------------------------------------------

const HUNDRED_K = 100 * 1000;
const HUNDRED = 100;
const TEN_M = 10 * 1000 * 1000;
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
    for (let i = TEN_K; i <= TEN_M; i += HUNDRED_K - TEN_K) {
        numbers.push(i);
    }
    return numbers;
};

const RENT_AND_SALE_GENERATOR = () => {
    const numbers = [...RENT_NUMBERS];
    for (let i = TEN_K; i <= TEN_M; i += HUNDRED_K - TEN_K) {
        numbers.push(i);
    }
    return numbers;
};

// ---------------------------------------------------------------------------------------------

const RENT_NUMBERS = RENT_GENERATOR();
const SALE_NUMBERS = SALE_GENERATOR();
const RENT_AND_SALE_NUMBERS = RENT_AND_SALE_GENERATOR();

// ---------------------------------------------------------------------------------------------

const generatePriceRange = (
    nothingSelected: boolean,
    isRent: boolean,
    isSale: boolean
) => {
    // Return the appropriate pre-generated array based on state
    if (nothingSelected) {
        return RENT_NUMBERS; // Default case uses same range as rent
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
