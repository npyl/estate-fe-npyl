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

// Configuration: [start, end, step]
const GENERATOR = () => {
    const numbers: number[] = [];

    const ranges = [
        [TWENTY, TWO_HUNDRED, STEP_FIVE],
        [TWO_HUNDRED + STEP_TEN, FIVE_HUNDRED, STEP_TEN],
        [FIVE_HUNDRED + STEP_FIFTY, ONE_K, STEP_FIFTY],
        [ONE_K + STEP_HUNDRED, TEN_K, STEP_HUNDRED],
        [TEN_K + STEP_ONE_K, FIFTY_K, STEP_ONE_K],
        [FIFTY_K + STEP_TEN_K, TWO_HUNDRED_K, STEP_TEN_K],
    ];

    ranges.forEach(([start, end, step]) => {
        for (let i = start; i <= end; i += step) {
            numbers.push(i);
        }
    });

    return numbers;
};

// ---------------------------------------------------------------------------------------------

// INFO: (performance) make sure when areaRangeGenerator is called it returns a pre-generated constant array
const NUMBERS = GENERATOR();

// ---------------------------------------------------------------------------------------------

const areaRangeGenerator = () => NUMBERS;

export default areaRangeGenerator;
