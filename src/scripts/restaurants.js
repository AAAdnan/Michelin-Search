const Scraper = require('../modules/scraper');
const Restaurants  = require('../persistence/restaurants');

const getRestaurants = async () => {
  const scraper = new Scraper();

    for (let i = 0; i < 3; i++) {
        try {
            console.log('Scraping attempt:', i + 1);

        await scraper.run();

        scraper.removeDuplicates();
        console.log(`Duplicates removed, ${scraper.getRestaurants().length} restaurants remained`);

        console.log('==========');
        break
        }
        catch (e) {
            console.log(e.stack);
        }
    }
  
    return scraper.getRestaurants()

}

const main = async () => {

  try{
    const restaurants = await getRestaurants();

    const insertedRestaurants = await Restaurants.bulkCreate(restaurants);
  
    console.log(`Inserted Restaurants ${insertedRestaurants.length}  `);
  }
  catch(error){
    console.log(error.stack)
    process.exit(1)
  }

}

main()



