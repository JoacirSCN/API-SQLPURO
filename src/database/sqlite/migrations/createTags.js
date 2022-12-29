const createTags = `CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR,

  note_id INTEGER REFERENCES notes(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id)
)`;

module.exports = createTags;