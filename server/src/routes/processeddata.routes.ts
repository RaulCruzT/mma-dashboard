import express from "express";
import * as ProcessedDataController from "../controllers/processeddata.controller";

const router = express.Router();

// router.post("/", ProcessedDataController.CreateAssembly);
router.get("/:id", ProcessedDataController.GetAssemblyById);
router.get("/",  ProcessedDataController.GetAssemblyPagination);
// router.patch("/:id", ProcessedDataController.EditAssembly);
// router.delete("/:id", ProcessedDataController.DeleteAssembly);

export default router;