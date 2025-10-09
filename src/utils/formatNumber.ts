function formatThousands(number?: number | string) {
    if (!number) return "";

    // Convert the number to a string
    const numberString =
        typeof number === "string" ? number : number.toString();

    // Use a regular expression to add dots as thousand separators
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatNumberWithCommas(number: number) {
    // Convert the number to a string and split it into parts
    const parts = number.toString().split(".");
    // Add commas as thousand separators to the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Join the parts back together with a dot as the decimal separator
    return parts.join(".");
}

export { formatThousands, formatNumberWithCommas };
