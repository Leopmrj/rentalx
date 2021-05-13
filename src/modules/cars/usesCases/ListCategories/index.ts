import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoryUseCase } from "./ListCategoriesUseCase";
import { ListCategoryController } from "./ListCategoryController";

const categoriesRepository = CategoriesRepository.getInstance();
const listCategoryUseCase = new ListCategoryUseCase(categoriesRepository);
const listCategoryController = new ListCategoryController(listCategoryUseCase);

export { listCategoryController };
