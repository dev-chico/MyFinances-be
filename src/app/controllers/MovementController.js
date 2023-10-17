const AccountsRepository = require('../repositories/AccountsRepository');
const MovementsRepository = require('../repositories/MovementsRepository');

class UserController {
  async index(request, response) {
    const { accountId } = request.body;
    const movements = await MovementsRepository.findAll(accountId);

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
    const { accountId, value } = request.body;

    const account = await AccountsRepository.findById(accountId);
    const newBalance = Number(account.saldo) + value;

    await AccountsRepository.balanceMovement(accountId, newBalance);
    await MovementsRepository.create('deposit', new Date(), value, accountId);

    response.json({ message: 'Operação realizada com sucesso!' });
  }

  async withdrawal(request, response) {
    const { accountId, value } = request.body;

    const account = await AccountsRepository.findById(accountId);
    const newBalance = Number(account.saldo) - value;

    await AccountsRepository.balanceMovement(accountId, newBalance);
    await MovementsRepository.create('withdrawal', new Date(), value, accountId);

    response.json({ message: 'Operação realizada com sucesso!' });
  }
}

module.exports = new UserController();
