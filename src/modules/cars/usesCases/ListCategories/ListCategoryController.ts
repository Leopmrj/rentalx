import { Request, Response } from "express";

import { ListCategoryUseCase } from "./ListCategoriesUseCase";

class ListCategoryController {
	constructor(private listCategoryUseCase: ListCategoryUseCase) {}

	handle(request: Request, response: Response): Response {
		const allCategories = this.listCategoryUseCase.execute();
		return response.status(200).json(allCategories);
	}
}

export { ListCategoryController };
