async function getCities (locations) {
    const uniqueLocations = new Set(locations);
    const cities = Array.from(uniqueLocations).map((location) => {
        if(location) {
            return { name: location, key: location.toLowerCase() }
        }
        else {
            return { name: location, key: location }
        }
    })

    return cities;
}



module.exports={
    getCities
}