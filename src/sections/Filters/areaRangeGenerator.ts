// Range boundaries
const TWENTY = 20;
const TWO_HUNDRED = 200;
const FIVE_HUNDRED = 500;
const ONE_K = 1000;
const TEN_K = 10000;
const FIFTY_K = 50000;
const TWO_HUNDRED_K = 200000;

// Steps
const STEP_FIVE = 5;
const STEP_TEN = 10;
const STEP_FIFTY = 50;
const STEP_HUNDRED = 100;
const STEP_ONE_K = 1000;
const STEP_TEN_K = 10000;

// ---------------------------------------------------------------------------------------------

const GENERATOR = () => {
    const numbers = [];

    // 20 - 200 με βήμα 5
    for (let i = TWENTY; i <= TWO_HUNDRED; i += STEP_FIVE) {
        numbers.push(i);
    }

    // 200 - 500 με βήμα 10
    for (let i = TWO_HUNDRED; i <= FIVE_HUNDRED; i += STEP_TEN) {
        if (!numbers.includes(i)) {
            numbers.push(i);
        }
    }

    // 500 - 1.000 με βημα 50
    for (let i = FIVE_HUNDRED; i <= ONE_K; i += STEP_FIFTY) {
        if (!numbers.includes(i)) {
            numbers.push(i);
        }
    }

    // 1.000 - 10.000 με βήμα 100
    for (let i = ONE_K; i <= TEN_K; i += STEP_HUNDRED) {
        if (!numbers.includes(i)) {
            numbers.push(i);
        }
    }

    // 10.000 - 50.000 με βήμα 1.000
    for (let i = TEN_K; i <= FIFTY_K; i += STEP_ONE_K) {
        if (!numbers.includes(i)) {
            numbers.push(i);
        }
    }

    // 50.000 - 200.000 με βήμα 10.000
    for (let i = FIFTY_K; i <= TWO_HUNDRED_K; i += STEP_TEN_K) {
        if (!numbers.includes(i)) {
            numbers.push(i);
        }
    }

    return numbers;
};

// ---------------------------------------------------------------------------------------------

// INFO: (performance) make sure when areaRangeGenerator is called it returns a pre-generated constant array
const NUMBERS = GENERATOR();

// ---------------------------------------------------------------------------------------------

const areaRangeGenerator = () => NUMBERS;

export default areaRangeGenerator;
