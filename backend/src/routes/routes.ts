import { Router } from "express";
import { getSuggestion } from "../controller/suggestionController";

const router = Router();

router.post("/suggest", getSuggestion);




export default router;