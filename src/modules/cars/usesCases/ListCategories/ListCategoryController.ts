import { Request, Response } from "express";

import { ListCategoryUseCase } from "./ListCategoriesUseCase";

class ListCategoryController {
	constructor(private listCategoryUseCase: ListCategoryUseCase) {}

	async handle(request: Request, response: Response): Promise<Response> {
		const allCategories = await this.listCategoryUseCase.execute();
		return response.status(200).json(allCategories);
	}
}

export { ListCategoryController };
