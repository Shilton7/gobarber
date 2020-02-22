import UserModel from '../models/User';
import FileModel from '../models/File';

class ProviderController {
  async index(req, res) {
    const providers = await UserModel.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'], //campos retorno json
      include: [
        {
          model: FileModel, //Model do relacionamentos fk,
          as: 'avatar', //Alias - Apelido da tabela fk
          attributes: ['id', 'name', 'path', 'url'], //campos retorno json
        },
      ],
    });
    return res.json(providers);
  }
}
export default new ProviderController();
