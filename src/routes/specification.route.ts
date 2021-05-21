import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/usesCases/createSpecification/CreateSpecificationController";
import { ListSpecificationController } from "../modules/cars/usesCases/ListSpecifications/ListSpecificationController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationsRoutes.post("/", createSpecificationController.handle);

specificationsRoutes.get("/", listSpecificationController.handle);

export { specificationsRoutes };
