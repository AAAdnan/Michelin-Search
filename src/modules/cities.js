async function getCities (locations) {
    const uniqueLocations = new Set(locations);
    const cities = Array.from(uniqueLocations).map((location) => {
        return { name: location, key: location.toLowerCase() }
    })

    return cities;
}

module.exports={
    getCities
}