const sqliteConnection = require('../../sqlite'); 
const createUsers = require('./createUsers');

async function migrationsRun() {
  // Schemas vai receber todas as migrations e vai juntar elas
  const schemas = [
    createUsers
  ].join('');

  sqliteConnection()
    .then( (db) => {db.exec(schemas)})
    .catch( (error) => console.error(error) );
}

module.exports = migrationsRun;