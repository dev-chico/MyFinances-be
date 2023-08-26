const db = require('../../database');

class UsersRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM users ORDER BY name;');
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM users WHERE id = $1;', [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM users WHERE email = $1;', [
      email,
    ]);
    return row;
  }

  async create({ name, document, email, password }) {
    const [row] = await db.query(
      `
    INSERT INTO users(name, document, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
      [name, document, email, password]
    );

    return row;
  }

  async update(id, { name, document, email, password }) {
    const [row] = await db.query(
      `
      UPDATE users
      SET name = $1, document = $2, email = $3, password = $4
      WHERE id = $5
      RETURNING *;
      `,
      [name, document, email, password, id]
    );

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM users WHERE id = $1;', [id]);
    return deleteOp;
  }
}

module.exports = new UsersRepository();
