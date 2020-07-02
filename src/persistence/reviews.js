const sql = require('sql-template-strings');
const {v4: uuidv4} = require('uuid');
const db = require('./db');

module.exports = {
  async create( restaurant_id, userId, description, courses, meals, rating, urls ) {
    const id = uuidv4();
    try {
      const {rows} = await db.query(sql`
      INSERT INTO reviews (id, restaurant_id, user_id, review, courses, meals, rating, images)
        VALUES (${id}, ${restaurant_id}, ${userId}, ${description}, ${courses}, ${meals}, ${rating}, ${urls})
        RETURNING id, restaurant_id;
      `);

      const [user] = rows;
   
      return user;
    } catch (error) {
        console.log(error);

      throw error;
    }
  },
  async listReview(name) 
  {
      const query = name ? sql`SELECT * FROM reviews WHERE name ILIKE ${name}` : 'SELECT * FROM reviews'
      const { rows } = await db.query(query)
      return rows;
  }
};
