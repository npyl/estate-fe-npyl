export function resolveSubCategory(rowLiteral: string) {
    switch (rowLiteral) {
        case "Apartment":
            return 0;

        case "Studio":
            return 1;

        case "Maisonette":
            return 2;

        case "Detached house":
            return 3;

        case "Villa":
            return 4;

        case "Loft":
            return 5;

        case "Bungalow":
            return 6;

        case "Building":
            return 7;

        case "Apartment complex":
            return 8;

        case "Farm":
            return 9;

        case "Houseboat":
            return 10;

        case "Other categories":
            return 11;

        case "Office":
            return 12;

        case "Store":
            return 13;

        case "Warehouse":
            return 14;

        case "Industrial space":
            return 15;

        case "Craft space":
            return 16;

        case "Hotel":
            return 17;

        case "Business building":
            return 18;

        case "Hall":
            return 19;

        case "Showroom":
            return 20;

        case "Other Commercial categories":
            return 21;

        case "Land plot":
            return 22;

        case "Parcels":
            return 23;

        case "Island":
            return 24;

        case "Other Land categories":
            return 25;

        case "Parking":
            return 26;

        case "Business":
            return 27;

        case "Prefabricated":
            return 28;

        case "Detachable":
            return 29;

        case "Air":
            return 30;

        case "Other":
            return 31;
    }
}

export function resolveCategory(
    row: string,
    category1: string[],
    category2: string[],
    category3: string[],
    category4: string[]
) {
    switch (row) {
        case "Residential":
            return category1;
        case "Commercial":
            return category2;
        case "Land":
            return category3;
        case "Other":
            return category4;
    }
}
