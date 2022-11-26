import { Router } from "express"
import DepartmentController from "../controllers/DepartmentController"

const routes = Router()

routes.post('/create', DepartmentController.create)

export default routes