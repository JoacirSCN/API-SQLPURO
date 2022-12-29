const sqlite3 = require('sqlite3'); /* Esse é drive que vai estabelecer a conecção com a base de dados */
const sqlite = require('sqlite'); /* Esse é o driver responsável por CONECTAR */
const path = require('path');

async function sqliteConnection() {
  const database = await sqlite.open({
    filename: path.resolve(__dirname, '..', 'database.db'),/* onde o arquivo vai ficar salvo */
    driver: sqlite3.Database 
  })

  await database.run('PRAGMA foreign_keys = ON');


  return database;
}

module.exports = sqliteConnection; 

