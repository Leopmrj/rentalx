import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/usesCases/createCategory/CreateCategoryController";
import { importCategoryController } from "../modules/cars/usesCases/importCategory";
import listCategoryController from "../modules/cars/usesCases/ListCategories";

const categoriesRoutes = Router();
const upload = multer({
	dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", (request, response) => {
	return listCategoryController().handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
	return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
