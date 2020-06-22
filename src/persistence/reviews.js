const sql = require('sql-template-strings');
const {v4: uuidv4} = require('uuid');
const db = require('./db');

module.exports = {
  async create( restaurant_id, description, courses, meals, rating, urls ) {
    const id = uuidv4();
    try {
      const {rows} = await db.query(sql`
      INSERT INTO reviews (id, restaurant_id, review, courses, meals, rating)
        VALUES (${id}, ${restaurant_id}, ${description}, ${courses}, ${meals}, ${rating}, ${urls})
        RETURNING id, restaurant_id;
      `);

      const [user] = rows;
   
      return user;
    } catch (error) {
        console.log(error);

      throw error;
    }
  }
};
