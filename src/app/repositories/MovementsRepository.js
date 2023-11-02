const db = require('../../database');

class MovementsRepository {
  async findAll(accountId) {
    const rows = await db.query(
      'SELECT * FROM movements WHERE fk_accountId = $1;',
      [accountId]
    );
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM movements WHERE id = $1;', [
      id,
    ]);
    return row;
  }

  async create(movementType, movementDate, movementValue, accountId) {
    const [row] = await db.query(
      `
    INSERT INTO movements(movementType, movementDate, movementValue, fk_accountId)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
      [movementType, movementDate, movementValue, accountId]
    );

    return row;
  }

  async update(id, { movementType, movementDate, movementValue, accountId }) {
    const [row] = await db.query(
      `
      UPDATE movements
      SET movementType = $1, movementDate = $2, movementValue = $3, fk_accountId = $4
      WHERE id = $5
      RETURNING *;
      `,
      [movementType, movementDate, movementValue, accountId, id]
    );

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM movements WHERE id = $1;', [
      id,
    ]);
    return deleteOp;
  }
}

module.exports = new MovementsRepository();
