import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
	sub: string;
}

export async function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void> {
	const AuthHeader = request.headers.authorization;
	if (!AuthHeader) {
		throw new AppError("Token missing.", 401);
	}

	const [, token] = AuthHeader.split(" ");

	try {
		const { sub: user_id } = verify(
			token,
			"a7e071b3de48cec1dd24de6cbe6c7bf1"
		) as IPayload;

		const usersRepository = new UsersRepository();

		const user = await usersRepository.findById(user_id);

		if (!user) {
			throw new AppError("User does not exists!", 401);
		}

		// A propriedade user não existia nessa interface
		// Foi adicionada no arquivo @types\express\index.d.ts
		request.user = {
			id: user_id,
		};

		next();
	} catch (error) {
		throw new AppError("Invalid token.", 401);
	}
}
