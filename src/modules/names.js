async function getNames (names) {
    const uniqueNames = new Set(names);
    const namesRestaurants = Array.from(uniqueNames).map((name) => {
        if(name) {
            return { name: name, key: name.toLowerCase() }
        }
        else {
            return { name: name, key: name }
        }
    })

    return namesRestaurants;
}

module.exports={
    getNames
}