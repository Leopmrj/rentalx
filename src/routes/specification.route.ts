import { Router } from "express";

import { createSpecificationController } from "../modules/cars/usesCases/createSpecification";
import { listSpecificationController } from "../modules/cars/usesCases/ListSpecifications";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (request, response) => {
	return createSpecificationController.handle(request, response);
});

specificationsRoutes.get("/", (request, response) => {
	return listSpecificationController.handle(request, response);
});

export { specificationsRoutes };
