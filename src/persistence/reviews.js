const sql = require('sql-template-strings');
const {v4: uuidv4} = require('uuid');
const db = require('./db');

module.exports = {
  async create( restaurant_id, userId, description, courses, meals, rating, date, urls) {
    const id = uuidv4();
    try {
      const {rows} = await db.query(sql`
      INSERT INTO reviews (id, restaurant_id, user_id, review, courses, meals, rating, date, images)
        VALUES (${id}, ${restaurant_id}, ${userId}, ${description}, ${courses}, ${meals}, ${rating}, to_date(${date}, 'YYYY-MM-DD'), ${urls})
        RETURNING id, restaurant_id;
      `);

      const [user] = rows;
   
      return user;
    } catch (error) {
        console.log(error);

      throw error;
    }
  },
  async totalReviews(){
    const query = sql`SELECT * FROM reviews`;
    const { rows } = await db.query(query);
    return rows
  },
  async listReview(page) 
  {
      const pageSize = 4;
      const offset = (page - 1)*pageSize;
      const query = sql`SELECT *, restaurants.name AS restaurantName FROM reviews LEFT JOIN restaurants ON reviews.restaurant_id = restaurants.id ORDER BY date ASC OFFSET ${offset} ROWS FETCH NEXT 4 ROWS ONLY`;
      const { rows } = await db.query(query);
      return rows;
  },
  async selectReview(name){
    const query = sql`SELECT *, restaurants.name AS restaurantName FROM reviews LEFT JOIN restaurants ON restaurants.id = reviews.restaurant_id WHERE ${name} = restaurants.name`;
    const { rows } = await db.query(query);
    return rows;
  },
  async deleteReview(id, userId) {

    const query = sql`DELETE FROM reviews WHERE id=${id}`;

    const output = await db.query(query)

    console.log(output)

    return output.rowCount;

  },
  async findRestaurantName()
  {
    const query = sql`SELECT name, (restaurants.id) FROM restaurants INNER JOIN reviews ON reviews.restaurant_id = restaurants.id`
    const { rows } = await db.query(query);
    return rows;
  }
};
