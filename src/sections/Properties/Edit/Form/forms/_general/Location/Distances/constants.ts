import { TService } from "./types";

const SERVICES: TService[] = [
    { service: "hospital", RHFName: "distances.hospital" },
    { service: "transit_station", RHFName: "distances.publicTransport" },
    { service: "sea", RHFName: "distances.sea" },
    { service: "school", RHFName: "distances.schools" },
    { service: "supermarket", RHFName: "distances.supermarket" },
    { service: "restaurant", RHFName: "distances.cafeRestaurant" },
    { service: "airport", RHFName: "distances.airport" },
];

export { SERVICES };
