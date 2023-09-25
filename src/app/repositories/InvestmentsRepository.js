const db = require('../../database');

class InvestmentsRepository {
  async findById(id) {
    const [row] = await db.query('SELECT * FROM investments WHERE id = $1;', [id]);
    return row;
  }
}

module.exports = new InvestmentsRepository();
