const AirQualityService = {
    mapValue(
        value: number,
        inMin: number,
        inMax: number,
        outMin: number,
        outMax: number
    ) {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    },
};

export default AirQualityService;
