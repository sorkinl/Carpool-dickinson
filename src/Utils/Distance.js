

export const getMaxAndMinLat = (radiusInKm, latitude ) => {
    var deltaLat = radiusInKm / 111.1;
    
    var minLat = latitude - deltaLat;
    var maxLat = latitude + deltaLat;

    return {maxLat, minLat}
}

export const getMaxAndMinLong = (radiusInKm, longitude, latitude) => {
    var kmInLongitudeDegree = 111.320 * Math.cos(latitude/ 180.0 * Math.PI)

    var deltaLong = radiusInKm / kmInLongitudeDegree;

    var minLong = longitude - deltaLong;
    var maxLong = longitude + deltaLong;

    return {minLong, maxLong}
}






