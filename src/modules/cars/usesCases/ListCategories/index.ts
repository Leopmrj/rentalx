import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoryUseCase } from "./ListCategoriesUseCase";
import { ListCategoryController } from "./ListCategoryController";

export default (): ListCategoryController => {
	const categoriesRepository = new CategoriesRepository();
	const listCategoryUseCase = new ListCategoryUseCase(categoriesRepository);
	const listCategoryController = new ListCategoryController(
		listCategoryUseCase
	);

	return listCategoryController;
};
