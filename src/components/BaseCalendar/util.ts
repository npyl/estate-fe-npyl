const getStartOfWeek = (date: Date) => {
    const result = new Date(date);
    result.setDate(date.getDate() - date.getDay());
    result.setHours(0, 0, 0, 0);
    return result;
};

const getEndOfWeek = (date: Date) => {
    const result = new Date(date);
    result.setDate(date.getDate() - date.getDay() + 6);
    result.setHours(23, 59, 59, 999);
    return result;
};

export { getStartOfWeek, getEndOfWeek };
