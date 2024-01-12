import numeral from "numeral";

// ----------------------------------------------------------------------

type InputValue = string | number | null;

export function fNumber(number: InputValue) {
    return numeral(number).format();
}

export function fCurrency(number: InputValue) {
    const format = number ? numeral(number).format("$0,0.00") : "";

    return result(format, ".00");
}

export function fPercent(number: InputValue) {
    const format = number ? numeral(Number(number) / 100).format("0.0%") : "";

    return result(format, ".0");
}

export function fShortenNumber(number: InputValue) {
    const format = number ? numeral(number).format("0.00a") : "";

    return result(format, ".00");
}

export function fData(number: InputValue) {
    const format = number ? numeral(number).format("0.0 b") : "";

    return result(format, ".0");
}

function result(format: string, key = ".00") {
    const isInteger = format.includes(key);

    return isInteger ? format.replace(key, "") : format;
}

export function formatNumberWithCommas(number: number) {
    // Convert the number to a string and split it into parts
    const parts = number.toString().split(".");
    // Add commas as thousand separators to the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Join the parts back together with a dot as the decimal separator
    return parts.join(".");
}
