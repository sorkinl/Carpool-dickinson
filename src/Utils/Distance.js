

export const getMaxAndMinLat = (radiusInKm, latitude ) => {
    var deltaLat = radiusInKm / 111.1;
    
    var minLat = latitude - deltaLat;
    var maxLat = latitude + deltaLat;
    console.log(minLat, maxLat)
    return {maxLat, minLat}
}

export const getMaxAndMinLong = (radiusInKm, longitude, latitude) => {
    var kmInLongitudeDegree = 111.320 * Math.cos(latitude/ 180.0 * Math.PI)
    console.log(latitude, longitude)
    var deltaLong = radiusInKm / kmInLongitudeDegree;
    console.log(deltaLong)
    var minLong = longitude - deltaLong;
    var maxLong = longitude + deltaLong;
    
    return {minLong, maxLong}
}

export const distance = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Earth's radius in Km
  return Math.acos(Math.sin(lat1)*Math.sin(lat2) + 
                  Math.cos(lat1)*Math.cos(lat2) *
                  Math.cos(lon2-lon1)) * R;
}






