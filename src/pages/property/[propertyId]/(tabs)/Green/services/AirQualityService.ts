const AirQualityService = {
    fetchAirQualityData(location: any) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(
                    `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${process.env.NEXT_PUBLIC_MAP_API_KEY}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            universalAqi: true,
                            location: location,
                            extraComputations: [
                                "HEALTH_RECOMMENDATIONS",
                                "DOMINANT_POLLUTANT_CONCENTRATION",
                                "POLLUTANT_CONCENTRATION",
                                "LOCAL_AQI",
                                "POLLUTANT_ADDITIONAL_INFO",
                            ],
                            languageCode: "en",
                        }),
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch air quality data");
                }

                const data = await response.json();
                resolve(data);
            } catch (error) {
                reject(error);
                console.error("Error fetching air quality data:", error);
            }
        });
    },
    mapValue(
        value: number,
        inMin: number,
        inMax: number,
        outMin: number,
        outMax: number
    ) {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    },
    valueToAngle(value: any) {
        // Map the value from the range 0-100 to the range 0-180
        return this.mapValue(value, 0, 100, 0, 180);
    },
};

export default AirQualityService;
