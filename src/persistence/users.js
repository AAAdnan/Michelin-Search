const sql = require('sql-template-strings');
const {v4: uuidv4} = require('uuid');
const db = require('./db');

module.exports = {
  async create(email, password) {
    try {
      const {rows} = await db.query(sql`
      INSERT INTO users (id, email, password)
        VALUES (${uuidv4()}, ${email}, ${password})
        RETURNING id, email;
      `);


      const [user] = rows;
   
      return user;
    } catch (error) {
      if (error.constraint === 'users_email_key') {
        return null;
      }

      throw error;
    }
  },
  async find(email) {
    const {rows} = await db.query(sql`
    SELECT * FROM users WHERE email=${email} LIMIT 1;
    `);
    return rows[0];
  },
  
  async list() {
    const {rows} = await db.query('SELECT * FROM users')
    return rows;
}
};
