// [ OK ] 1 - Adicionar coluna Avatar na tabela Users
// [ ok ] 2 - Refatorar o usu�rio adicionando a coluna Avatar
/// Configurar o multer
/// Criar regra de neg�cio do upload
/// Criar o controller

import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
	user_id: string;
	avatar_file: string;
}

@injectable()
class UpdateUserAvatarUserCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}

	async execute({ user_id, avatar_file }: IRequest): Promise<void> {
		const user = await this.usersRepository.findById(user_id);

		if (user.avatar) {
			await deleteFile(`./tmp/avatar/${user.avatar}`);
		}
		user.avatar = avatar_file;

		await this.usersRepository.create(user);
	}
}

export { UpdateUserAvatarUserCase };
