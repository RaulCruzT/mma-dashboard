import express from "express";
import * as ActinobacteriaController from "../controllers/actinobacteria.controller";

const router = express.Router();

router.get("/:id", ActinobacteriaController.GetActinobacteriaById);
router.get("/",  ActinobacteriaController.GetActinobacteriaPagination);

export default router;