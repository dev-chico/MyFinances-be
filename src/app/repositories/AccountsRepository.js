const db = require('../../database');

class AccountsRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM accounts;');
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM accounts WHERE id = $1;', [id]);
    return row;
  }

  async findByUserId(id) {
    const [row] = await db.query('SELECT * FROM accounts WHERE fk_userId = $1;', [id]);
    return row;
  }

  async create({ number, balance, userId, investmentId }) {
    const [row] = await db.query(
      `
    INSERT INTO accounts(numero, saldo, fk_userId, fk_investmentId)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
      [number, balance, userId, investmentId]
    );

    return row;
  }

  async update(id, { number, balance, userId, investmentId }) {
    const [row] = await db.query(
      `
      UPDATE accounts
      SET numero = $1, saldo = $2, fk_userId = $3, fk_investmentId = $4
      WHERE id = $5
      RETURNING *;
      `,
      [number, balance, userId, investmentId, id]
    );

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM accounts WHERE id = $1;', [
      id,
    ]);
    return deleteOp;
  }

  async balanceMovement(accountId, value) {
    const [row] = await db.query(
      `
      UPDATE accounts
      SET saldo = $1
      WHERE id = $2
      RETURNING *;
      `,
      [value, accountId]
    );

    return row;
  }
}

module.exports = new AccountsRepository();
