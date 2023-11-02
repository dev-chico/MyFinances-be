const db = require('../../database');

class InvestmentsRepository {
  async findById(id) {
    const [row] = await db.query('SELECT * FROM investments WHERE id = $1;', [
      id,
    ]);
    return row;
  }

  async findAll() {
    const rows = await db.query('SELECT * FROM investments');
    return rows;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM investments WHERE id = $1;', [id]);
    return deleteOp;
  }
}

module.exports = new InvestmentsRepository();
