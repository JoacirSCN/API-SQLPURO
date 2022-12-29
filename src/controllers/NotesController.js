const AppError = require('../utils/AppError');
const sqliteConnection = require('../database/sqlite'); // É a conecção com o banco de dados

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const { user_id } = request.params;
    const db = await sqliteConnection();

    const note_id = await db.run(`
      INSERT INTO notes (
        title,
        description,
        user_id
      ) VALUES (?,?,?)`,
      [title, description, user_id]
    );

    tags.forEach(async (tag) => {
      await db.run(
        "INSERT INTO tags (note_id, user_id, name) VALUES (?,?,?)",
        [note_id.lastID, user_id, tag]
      );
    });

    links.forEach(async (link) => {
      await db.run("INSERT INTO links (url, note_id) VALUES (?,?)", [
        link,
        note_id.lastID,
      ]);
    });

    response.status(201).json();
  }

  async show(request, response) {
    const { id } = request.params;

    const db = await sqliteConnection();

    const note = await db.get("SELECT * FROM notes WHERE id = (?)", [id]);
    const tags = await db.all("SELECT * FROM tags ORDER BY name");
    const links = await db.all("SELECT * FROM links ORDER BY created_at");
    
    return response.json({
      ...note,
      tags,
      links
    });
  }

  async delete(request, response) {
    const { id } = request.params;
    const db = sqliteConnection();

    await (await db).run('DELETE FROM notes WHERE id = (?)', [id])

    return response.json()
  };

  async index(request, response) {
    const { title, user_id, tags } = request.query;
    const db = await sqliteConnection();
    let notes;

    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim());
      
      notes = await db.all(`SELECT * FROM tags WHERE name IN ('${filterTags}')`)
    } else {
      notes = await db.all(
        `SELECT * FROM notes WHERE user_id = '${user_id}' 
          INTERSECT
        SELECT * FROM notes WHERE title LIKE '%${title}%'
        ORDER BY title`
      );
    }

    

    return response.json(notes)
  }
}

module.exports = NotesController;