import { container } from "tsyringe";

import { ICategoryRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";

// ICategoryRepository
container.registerSingleton<ICategoryRepository>(
	"CategoriesRepository",
	CategoriesRepository
);
