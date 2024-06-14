import { Router } from "express";
import { createTodo, getAll, getAllCombine, moveProgressToDone, moveTodoToProgress } from "../controller/todoController";

const router: Router = Router();

router.route("/api/create").post(createTodo);
router.route("/api/progress/:Id").patch(moveTodoToProgress)
router.route("/api/done/:Id").patch(moveProgressToDone);
router.route("/api/get").get(getAllCombine);
router.route("/api/get-all").get(getAll);
export default router;
