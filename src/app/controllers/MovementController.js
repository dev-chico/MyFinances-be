/* eslint-disable no-unused-vars */
const AccountsRepository = require('../repositories/AccountsRepository');
const MovementsRepository = require('../repositories/MovementsRepository');
const UsersRepository = require('../repositories/UsersRepository');

class UserController {
  async index(request, response) {
    const { id } = request.params;
    const movements = await MovementsRepository.findAll(id);

    response.json(movements);
  }

  async show(request, response) {
    const { id } = request.params;
    const movement = await MovementsRepository.findById(id);

    if (!movement) {
      return response.status(404).json({ error: 'Movement not found' });
    }

    response.json(movement);
  }

  async deposit(request, response) {
    const { accountId, email, newBalance, value } = request.body;
    const account = await AccountsRepository.findById(accountId);

    await AccountsRepository.balanceMovement(accountId, newBalance);
    const movement = await MovementsRepository.create(
      'deposit',
      new Date().toLocaleDateString(),
      value,
      accountId
    );

    const user = await UsersRepository.findByEmail(email);

    const formatedResponse = {
      ...user,
      account: {
        ...account,
      },
    };

    delete formatedResponse.password;
    delete formatedResponse.account.fk_userid;
    delete formatedResponse.account.fk_investmentid;

    response.json({ movement, user: formatedResponse });
  }

  async withdrawal(request, response) {
    const { accountId, email, newBalance, value } = request.body;
    const account = await AccountsRepository.findById(accountId);

    await AccountsRepository.balanceMovement(accountId, newBalance);
    const movement = await MovementsRepository.create(
      'withdrawal',
      new Date().toLocaleDateString(),
      value,
      accountId
    );

    const user = await UsersRepository.findByEmail(email);

    const formatedResponse = {
      ...user,
      account: {
        ...account,
      },
    };

    delete formatedResponse.password;
    delete formatedResponse.account.fk_userid;
    delete formatedResponse.account.fk_investmentid;

    response.json({ movement, user: formatedResponse });
  }
}

module.exports = new UserController();
