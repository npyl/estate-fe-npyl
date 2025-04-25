const getEndDateForDuration = (startDate: string, h: number) => {
    // Convert h (pixel height) to hours
    const hoursDelta = h / 60;

    // Parse the startDate ISO string to a Date object
    const start = new Date(startDate);

    // Create a new Date for endDate by adding the calculated hours
    const end = new Date(start.getTime() + hoursDelta * 60 * 60 * 1000);

    // Convert endDate back to ISO string format
    return end.toISOString();
};

export default getEndDateForDuration;
