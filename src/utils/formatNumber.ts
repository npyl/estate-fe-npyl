export function formatThousands(number: number) {
    // Convert the number to a string
    const numberString = number.toString();

    // Use a regular expression to add dots as thousand separators
    const formattedNumber = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return formattedNumber;
}

export function formatNumberWithCommas(number: number) {
    // Convert the number to a string and split it into parts
    const parts = number.toString().split(".");
    // Add commas as thousand separators to the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Join the parts back together with a dot as the decimal separator
    return parts.join(".");
}
