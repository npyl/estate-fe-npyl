const drawRectangle = (
    nelat: number,
    nelng: number,
    swlat: number,
    swlng: number,
    map: google.maps.Map,
    changeable: boolean
) => {
    const rectangleBounds = {
        north: nelat,
        south: swlat,
        east: nelng,
        west: swlng,
    };

    const rectangleConfig = {
        map,
        clickable: true,
        editable: changeable,
        draggable: changeable,
        bounds: rectangleBounds,
        fillColor: "cyan",
        fillOpacity: 0.15,
        strokeWeight: 1,
        zIndex: 1,
    };

    return new google.maps.Rectangle({ ...rectangleConfig, map });
};

export default drawRectangle;
