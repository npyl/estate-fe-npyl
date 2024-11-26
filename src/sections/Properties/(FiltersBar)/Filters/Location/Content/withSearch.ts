import { IGeoLocation } from "@/types/geolocation";

const withSearch =
    (search: string) =>
    ({ nameEN, nameGR }: IGeoLocation) => {
        const lNameEN = nameEN.toLowerCase();
        const lNameGR = nameGR.toLowerCase();
        return lNameEN.includes(search) || lNameGR.includes(search);
    };

export default withSearch;
