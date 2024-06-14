const toLocalDate = (s: string) => new Date(s).toISOString().split("T")[0];
export default toLocalDate;
