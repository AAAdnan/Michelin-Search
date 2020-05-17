const sql = require('sql-template-strings');
const {v4: uuidv4} = require('uuid' );
const db = require('./db');

module.exports = {
    async bulkCreate(restaurants) {
      try {

        const query = sql`
        INSERT INTO restaurants(id, rating, year, img, name, link, location, type, lat, lng )
            VALUES 
        `
        restaurants.forEach(( { rating, year, img, name, link, location, type, lat, lng}, index) => {
            if (index < restaurants.length -1 ) {
                 query.append(sql`(${uuidv4()}, ${rating}, ${year}, ${img}, ${name}, ${link}, ${location}, ${type}, ${lat}, ${lng}),`)
            }
            else {
                query.append(sql`(${uuidv4()}, ${rating}, ${year}, ${img}, ${name}, ${link}, ${location}, ${type}, ${lat}, ${lng})`)

            }

        } )

        query.append(sql`RETURNING id, name`)
        const {rows} = await db.query(query);

        return rows;
      } catch (error) {
  
        throw error;
      }
    },

    async list(city) {
      
        const query = city ? sql`SELECT * FROM restaurants WHERE location ILIKE ${city}` : 'SELECT * FROM restaurants'
        const { rows } = await db.query(query)
        return rows;
    }
}
  