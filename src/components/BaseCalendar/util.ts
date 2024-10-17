const getStartOfWeek = (date: Date) => {
    const result = new Date(date);
    result.setDate(date.getDate() - date.getDay());
    return result;
};

const getEndOfWeek = (date: Date) => {
    const result = new Date(date);
    result.setDate(date.getDate() - date.getDay() + 6);
    return result;
};

export { getStartOfWeek, getEndOfWeek };
