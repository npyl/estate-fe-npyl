const drawCircle = (
    lat: number,
    lng: number,
    radius: number,
    map: google.maps.Map,
    changeable: boolean
) => {
    const circleConfig: google.maps.CircleOptions = {
        map,
        clickable: true,
        editable: changeable,
        draggable: changeable,
        center: { lat, lng }, // Center of the circle
        radius: radius, // Radius (in meters)
        fillColor: "cyan",
        fillOpacity: 0.15,
        strokeWeight: 1,
        zIndex: 1,
    };

    return new google.maps.Circle(circleConfig);
};

export default drawCircle;
