const sqliteConnection = require('../../sqlite'); 
const createUsers = require('./createUsers');
const createNotes  = require('./createNotes');
const createTags = require('./createTags');
const createLinks = require('./createLinks');

async function migrationsRun() {
  const database = await sqliteConnection();
  
  try {
    await database.exec(createUsers);
    await database.exec(createNotes);
    await database.exec(createTags);
    await database.exec(createLinks);
  } catch(err) {
    console.log(err)
  }
}

module.exports = migrationsRun;