const cities = [ { name: 'London', key: 'ldn' }, { name: 'New York', key: 'ny'}]

async function getCities () {
    return cities;
}

module.exports={
    getCities
}