import express from "express";
import * as MyActinobacteriaController from "../controllers/myactinobacteria.controller";

const router = express.Router();

router.post("/", MyActinobacteriaController.CreateMyActinobacteria);
router.get("/:id", MyActinobacteriaController.GetMyActinobacteriaById);
router.get("/",  MyActinobacteriaController.GetMyActinobacteriaPagination);
router.patch("/:id", MyActinobacteriaController.EditMyActinobacteria);
router.delete("/:id", MyActinobacteriaController.DeleteMyActinobacteria);

export default router;