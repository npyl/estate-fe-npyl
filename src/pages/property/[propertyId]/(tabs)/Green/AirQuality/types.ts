export interface Index {
    code: string;
    displayName: string;
    aqi: number;
    category: string;
    dominantPollutant: string;
    color: string;
}

export interface Pollutant {
    code: string;
    displayName: string;
    fullName: string;
    concentration: {
        value: number;
        units: string;
    };
    additionalInfo: {
        sources: string;
        effects: string;
    };
}
