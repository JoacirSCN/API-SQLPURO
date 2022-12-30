const AppError = require('../utils/AppError');
const sqliteConnection = require('../database/sqlite'); // É a conecção com o banco de dados


class TagsController {
  async index(request, response) {
    const { user_id } = request.params;
    const db = await sqliteConnection();

    const tags = await db.all(`SELECT * FROM tags WHERE user_id = ${user_id}`)

    return response.json(tags);
  }
}


module.exports = TagsController;