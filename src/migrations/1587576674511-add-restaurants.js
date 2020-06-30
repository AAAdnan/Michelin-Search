const db = require('../persistence/db');

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS restaurants (
    id uuid PRIMARY KEY,
    rating smallint,
    year text,
    img text,
    name text,
    link text,
    location text,
    type text,
    lat double precision, 
    lng double precision
  );
 
  `);

  await client.query(`
  CREATE INDEX restaurants_location on restaurants (location);

  CREATE INDEX restaurants_name on restaurants (name);

  CREATE INDEX restaurants_rating on restaurants (rating);

  `);

  await client.release(true);
  next();
};

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE restaurants;
  `);

  await client.release(true);
  next();
};
