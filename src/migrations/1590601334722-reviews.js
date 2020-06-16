const db = require('../persistence/db');

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS reviews (  
    id uuid PRIMARY KEY,
    restaurant_id uuid references restaurants(id),
    user_id uuid references users(id) on delete cascade,
    review text,
    description text[],
    images text[]
  );
 
  `);

  await client.query(`
  CREATE INDEX reviews_user on reviews (user_id);

  CREATE INDEX reviews_restaurant on reviews (restaurant_id);

  `);

  await client.release(true);
  next();
};

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE reviews;
  `);

  await client.release(true);
  next();
};
