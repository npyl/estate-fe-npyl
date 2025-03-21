const isPositionValid = (position: any) => {
    if (!(typeof position === "object")) return false;
    if (!("lat" in position && "lng" in position)) return false;
    const { lat, lng } = position;
    if (!(typeof lat === "number" && typeof lng === "number")) return false;
    return true;
};

export default isPositionValid;
