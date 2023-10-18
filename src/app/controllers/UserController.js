const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsersRepository = require('../repositories/UsersRepository');
const AccountsRepository = require('../repositories/AccountsRepository');
const generateAccountNumber = require('../utils/generateAccountNumber');

class UserController {
  async index(request, response) {
    const users = await UsersRepository.findAll();
    response.json(users);
  }

  async show(request, response) {
    const { id } = request.params;
    const user = await UsersRepository.findById(id);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(user);
  }

  async store(request, response) {
    const { name, document, email, password, investmentId } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const userExists = await UsersRepository.findByEmail(email);

    if (userExists) {
      return response
        .status(400)
        .json({ error: 'This e-mail is already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UsersRepository.create({
      name,
      document,
      email,
      password: hashedPassword,
    });

    const account = await AccountsRepository.create({
      number: generateAccountNumber(),
      balance: 0,
      investmentId,
      userId: user.id,
    });

    const formatedUser = {
      ...user,
      account: {
        ...account,
      },
    };

    delete formatedUser.password;
    delete formatedUser.account.fk_userid;
    delete formatedUser.account.fk_investmentid;

    response.json(formatedUser);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, document, email, password } = request.body;
    const userExists = await UsersRepository.findById(id);

    if (!userExists) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const userByEmail = await UsersRepository.findByEmail(email);

    if (userByEmail && userByEmail.id !== id) {
      return response
        .status(400)
        .json({ error: 'This e-mail is already in use.' });
    }

    const contact = await UsersRepository.update(id, {
      name,
      document,
      email,
      password,
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;
    await UsersRepository.delete(id);
    response.sendStatus(204);
  }

  async login(request, response) {
    const { email, password } = request.body;

    try {
      const user = await UsersRepository.findByEmail(email);

      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user.id }, 'A$Jg3Lp@9F!k2zTq#oP5s^W8c', { expiresIn: '1h' });
        response.json({ token });
      } else {
        response.status(401).json({ error: 'Credenciais inválidas' });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Erro na autenticação' });
    }
  }
}

module.exports = new UserController();
