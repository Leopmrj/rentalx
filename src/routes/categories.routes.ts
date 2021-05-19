import { Router } from "express";
import multer from "multer";

import createCategoryController from "../modules/cars/usesCases/createCategory";
import { importCategoryController } from "../modules/cars/usesCases/importCategory";
import { listCategoryController } from "../modules/cars/usesCases/ListCategories";

const categoriesRoutes = Router();
const upload = multer({
	dest: "./tmp",
});

categoriesRoutes.post("/", (request, response) => {
	return createCategoryController().handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
	return listCategoryController.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
	return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
