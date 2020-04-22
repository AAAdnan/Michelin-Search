const Scraper = require('../modules/scraper');
// const DBUploader = require('./dbUploader');


const getRestaurants = async () => {
  const scraper = new Scraper();

    for (let i = 0; i < 3; i++) {
        try {
            console.log('Scraping attempt:', i + 1);

        await scraper.run();
        console.log(`Found ${scraper.getRestaurants().length} restaurants`);
        console.log(scraper.getRestaurants())

        scraper.removeDuplicates();
        console.log(`Duplicates removed, ${scraper.getRestaurants().length} restaurants remained`);

        console.log('==========');
        break
        }
        catch (e) {
            console.log(e.stack);
        }
    }
  
  return scraper.getRestaurants();
}

getRestaurants();