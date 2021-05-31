import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: {
		name: string;
		email: string;
	};
	token: string;
}

@injectable()
class AuthenticateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}

	async execute({ email, password }: IRequest): Promise<IResponse> {
		// 1 - Usuário existe ?
		const user = await this.usersRepository.findByEmail(email);
		if (!user) {
			throw new Error("E-mail or password incorrect!");
		}

		// 2 - Senha está correta ?
		const passwordMatch = await compare(password, user.password);
		if (!passwordMatch) {
			throw new Error("E-mail or password incorrect!");
		}

		// 3 - Gera o jsonwebtoken.
		const token = sign({}, "a7e071b3de48cec1dd24de6cbe6c7bf1", {
			subject: user.id,
			expiresIn: "1d",
		});

		const tokenReturn: IResponse = {
			token,
			user: {
				name: user.name,
				email: user.email,
			},
		};

		return tokenReturn;
	}
}

export { AuthenticateUserUseCase };
