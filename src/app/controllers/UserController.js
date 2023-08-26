const UsersRepository = require('../repositories/UsersRepository');

class UserController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await UsersRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await UsersRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(contact);
  }

  async store(request, response) {
    const { name, document, email, password } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactExists = await UsersRepository.findByEmail(email);

    if (contactExists) {
      return response
        .status(400)
        .json({ error: 'This e-mail is already in use.' });
    }

    const contact = await UsersRepository.create({
      name,
      document,
      email,
      password,
    });

    response.json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, document, email, password } = request.body;
    const contactExists = await UsersRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactByEmail = await UsersRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
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
}

module.exports = new UserController();
